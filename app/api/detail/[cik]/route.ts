export async function GET(
  req: Request,
  { params }: { params: Promise<{ cik: string }> },
) {
  const { cik } = await params;
  console.log("cik value", cik);

  const res = await fetch(
    `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`,
    {
      headers: {
        "User-Agent": "hello hk9393121@gmail.com",
      },
    },
  );

  console.log(res);

  const data = await res.json();
  console.log(data);
  return Response.json(data);
}
