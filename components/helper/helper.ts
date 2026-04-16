import {
  AssetHistory,
  ChartData,
  FinancialRecord,
  Quarter,
} from "../types/types";

function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0; // avoid division by zero

  const change = ((current - previous) / previous) * 100;
  return Number(change.toFixed(1)); // round to 1 decimal
}

export function formatAssetsData(
  value: Record<string, any> | null,
  key: string,
): { value: string; chnageInPercentage: number } {
  if (value === null) {
    return { value: "", chnageInPercentage: 0 };
  }
  console.log(value[key]);
  if (!value[key]) {
    return { value: "", chnageInPercentage: 0 };
  }
  const financialReport = value[key].units.USD;
  console.log(financialReport);
  const currentYearData = financialReport.find((val: any) => {
    if (val.fy === 2025 && val.fp === "FY") {
      return val;
    }
  });
  const previousYearData = financialReport.find((val: any) => {
    if (val.fy === 2024 && val.fp === "FY") {
      return val;
    }
  });

  if (!currentYearData) {
    return { value: "", chnageInPercentage: 0 };
  }
  const chnageInPercentage = calculatePercentageChange(
    currentYearData.val,
    previousYearData.val,
  );
  console.log(currentYearData, previousYearData);
  return {
    value: currentYearData.val,
    chnageInPercentage: chnageInPercentage,
  };
}

export function formatlibalities(
  value: Record<string, any> | null,
  key: string,
): { value: string; chnageInPercentage: number } {
  if (value === null || key !== "Liabilities") {
    return { value: "", chnageInPercentage: 0 };
  }
  if (!value[key]) {
    return { value: "", chnageInPercentage: 0 };
  }
  const financialReport = value[key].units.USD;
  const currentYearData = financialReport.find((val: any) => {
    if (val.fy === 2025 && val.fp === "FY") {
      return val;
    }
  });
  const previousYearData = financialReport.find((val: any) => {
    if (val.fy === 2024 && val.fp === "FY") {
      return val;
    }
  });

  if (!currentYearData) {
    return { value: "", chnageInPercentage: 0 };
  }
  const chnageInPercentage = calculatePercentageChange(
    currentYearData.val,
    previousYearData.val,
  );
  console.log(currentYearData, previousYearData);
  return {
    value: currentYearData.val,
    chnageInPercentage: chnageInPercentage,
  };
}

export function formatProfit(
  value: Record<string, any> | null,
  key: string,
): { value: string; chnageInPercentage: number } {
  if (value === null || key !== "GrossProfit") {
    return { value: "", chnageInPercentage: 0 };
  }
  console.log(value);
  if (!value[key]) {
    return { value: "", chnageInPercentage: 0 };
  }
  const financialReport = value[key].units.USD;
  console.log(financialReport);
  const currentYearData = financialReport.find((val: any) => {
    if (val.fy === 2025 && val.fp === "FY") {
      return val;
    }
  });
  const previousYearData = financialReport.find((val: any) => {
    if (val.fy === 2024 && val.fp === "FY") {
      return val;
    }
  });

  if (!currentYearData) {
    return { value: "", chnageInPercentage: 0 };
  }
  const chnageInPercentage = calculatePercentageChange(
    currentYearData.val,
    previousYearData.val,
  );
  console.log(currentYearData, previousYearData);
  return {
    value: currentYearData.val,
    chnageInPercentage: chnageInPercentage,
  };
  return { value: "", chnageInPercentage: 10 };
}

export function formatRevnue(
  value: Record<string, any> | null,
  key: string,
): { value: string; chnageInPercentage: number } {
  if (value === null) {
    return { value: "", chnageInPercentage: 0 };
  }
  if (!value[key]) {
    return { value: "", chnageInPercentage: 0 };
  }
  const financialReport = value[key].units.USD;
  console.log(financialReport);
  console.log(financialReport);
  const currentYearData = financialReport.find((val: any) => {
    if (val.frame === "CY2025") {
      return val;
    }
  });
  const previousYearData = financialReport.find((val: any) => {
    if (val.frame === "CY2024") {
      return val;
    }
  });

  console.log(currentYearData, previousYearData);

  if (!currentYearData) {
    return { value: "", chnageInPercentage: 0 };
  }
  const chnageInPercentage = calculatePercentageChange(
    currentYearData.val,
    previousYearData.val,
  );
  console.log(currentYearData, previousYearData);
  return {
    value: currentYearData.val,
    chnageInPercentage: chnageInPercentage,
  };
  return { value: "", chnageInPercentage: 10 };
}

export function trackingassets(
  value: Record<string, any> | null,
): AssetHistory[] | null {
  if (value === null) {
    return null;
  }
  console.log(value["Assets"]);
  if (!value["Assets"]) {
    return null;
  }
  const financialReport = value["Assets"].units.USD;
  console.log(financialReport);
  const year = [2025, 2024, 2023, 2022];
  const yeardata = [];
  for (const val of year) {
    const value = financialReport.find((data: any) => {
      if (data.fy === val && data.fp === "FY") {
        return data;
      }
    });
    yeardata.push(value);
  }
  return yeardata;
}

export function buildChartData(
  data: FinancialRecord[],
  latestYear: number = 2025,
): ChartData {
  const years = [latestYear, latestYear - 1, latestYear - 2, latestYear - 3];

  const hasLatestYear = data.some((d) => d.fy === latestYear);
  if (!hasLatestYear) return null;

  const quarters: Quarter[] = ["Q1", "Q2", "Q3", "Q4"];

  const safeSum = (records: FinancialRecord[]): number =>
    records.reduce((sum, d) => sum + (d.val ?? 0), 0);

  const year = {
    labels: years.map(String),
    series: [
      {
        name: "Profit",
        data: years.map((y) => safeSum(data.filter((d) => d.fy === y))),
      },
    ],
  };

  // 👉 QUARTER DATA (latest year)
  const quarter = {
    labels: quarters,
    series: [
      {
        name: String(latestYear),
        data: quarters.map((q) =>
          safeSum(data.filter((d) => d.fy === latestYear && d.fp === q)),
        ),
      },
    ],
  };

  // 👉 COMPARE DATA (multi-year)
  const compare = {
    labels: quarters,
    series: years.map((y) => ({
      name: String(y),
      data: quarters.map((q) =>
        safeSum(data.filter((d) => d.fy === y && d.fp === q)),
      ),
    })),
  };

  return { year, quarter, compare };
}

export function formatNumber(value: number) {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
  return value.toString();
}
