type Params = {
  query: string;
};

type FinnhubSearchResult = {
  description: string;
  symbol: string;
};

type FinnhubSearchResponse = {
  result: FinnhubSearchResult[];
};

let cachedTickers: any[] | null = null;

async function getCIK(symbol: string): Promise<number | null> {
  if (!cachedTickers) {
    const res = await fetch("https://www.sec.gov/files/company_tickers.json", {
      headers: {
        "User-Agent": "your_email@example.com",
      },
    });

    const data: Record<string, any> = await res.json();
    cachedTickers = Object.values(data);
  }

  const company = cachedTickers.find((item) => item.ticker === symbol);

  return company?.cik_str ?? null;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ query: string }> },
) {
  const { query } = await params;

  // 1️⃣ Search companies
  const searchRes = await fetch(
    `https://finnhub.io/api/v1/search?q=${query}&token=${process.env.FIN_KEY}`,
  );

  const searchData: FinnhubSearchResponse = await searchRes.json();

  if (!searchData.result || searchData.result.length === 0) {
    return Response.json({ companies: [] });
  }

  // 🔥 limit results (important for performance)
  const results = searchData.result.slice(0, 5);

  // 2️⃣ Fetch profile + CIK for each company
  const companies = await Promise.all(
    results.map(async (item) => {
      const profileRes = await fetch(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${item.symbol}&token=${process.env.FIN_KEY}`,
      );

      const profileData = await profileRes.json();

      const cik = await getCIK(item.symbol);

      return {
        symbol: item.symbol,
        name: profileData.name || item.description,
        exchange: profileData.exchange,
        industry: profileData.finnhubIndustry,
        logo: profileData.logo,
        website: profileData.weburl,
        cik,
      };
    }),
  );
  const filteredCompanies = companies.filter((company) => company.cik !== null);
  return Response.json({ companies: filteredCompanies });
}
