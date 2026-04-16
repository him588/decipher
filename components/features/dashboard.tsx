"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./header";
import SearchBar from "./search-bar";
import PreviousHistory from "./previous-history";
import StatsCard from "./stats-card";
import {
  ChartCandlestick,
  RussianRuble,
  SquareLibrary,
  SquaresExclude,
} from "lucide-react";
import { useBaseContext } from "../context/base-context";
import AssetsHistory from "./assets-history";
import CompareProfit from "./compare-profit";
import { Skeleton } from "./skeleton";

function Dashboard() {
  const { setFinancialData, companyDetails } = useBaseContext();
  const [loading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  useEffect(() => {
    async function fetchApiData() {
      setIsLoading(true);
      try {
        const cik = companyDetails.cik.toString().padStart(10, "0");
        const res = await axios.get(`/api/detail/${cik}`);
        const usGaap = res.data.facts["us-gaap"];
        const dei = res.data.facts.dei;
        const allKeys = [...Object.keys(usGaap), ...Object.keys(dei)];
        const matchedKeys = allKeys.filter((key) =>
          [
            "Revenues",
            "NetIncomeLoss",
            "GrossProfit",
            "OperatingIncomeLoss",
            "Assets",
            "Liabilities",
            "CashAndCashEquivalentsAtCarryingValue",
            "LongTermDebt",
            "EarningsPerShareBasic",
            "NetCashProvidedByUsedInOperatingActivities",
            "EntityCommonStockSharesOutstanding",
            "CommonStockSharesIssued",
          ].includes(key),
        );

        const obj: Record<string, object> = {};
        matchedKeys.forEach((item) => {
          obj[item] = usGaap[item] || dei[item];
        });

        console.log("finding data", obj);
        setFinancialData(obj);
        setIsLoading(false);
      } catch (error) {
        console.log("Error while fetching company data", error);
        setIsLoading(false);
        setIsError(true);
      }
    }
    fetchApiData();
  }, [setFinancialData, companyDetails.cik]);

  const stats = [
    {
      color: "#FFF8C5",
      icon: <ChartCandlestick color="#FFE100" />,
      title: "Assets",
      value: "500000",
      chnageInPercentage: -10,
      year: "FY2025",
      key: "Assets",
    },
    {
      color: "#C7E9F9",
      icon: <SquareLibrary color="#00ADFF" />,
      title: "liabilities",
      value: "300000",
      chnageInPercentage: -10,
      year: "FY2025",
      key: "Liabilities",
    },
    {
      color: "#CFF3AF",
      icon: <RussianRuble color="#72D021" />,
      title: "Profit",
      value: "478900.00",
      chnageInPercentage: 20,
      year: "FY2025",
      key: "GrossProfit",
    },
    {
      color: "#FFD9D9",
      icon: <SquaresExclude color="#FF4444" />,
      title: "Revenues",
      value: "300000",
      chnageInPercentage: 90,
      year: "FY2025",
      key: "Revenues",
    },
  ];

  return (
    <section className="h-full w-full flex flex-col px-2 sm:px-4 md:px-6 lg:pl-4">
      <Header />

      <div className="flex flex-col gap-4 mt-4 lg:grid lg:grid-cols-4 lg:auto-rows-[5px] lg:gap-4">
        <div className="lg:row-span-3 lg:col-span-2">
          <SearchBar />
        </div>

        <div className="card min-h-[300px] lg:min-h-0 lg:row-span-19 lg:col-span-1">
          {loading ? <Skeleton className="h-full w-full" /> : <AssetsHistory />}
        </div>

        <div className="card min-h-[300px] lg:min-h-0 lg:row-span-19 overflow-hidden">
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <PreviousHistory />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:contents">
          {stats.map((c) => (
            <div
              key={c.color}
              className="card min-h-[120px] overflow-hidden lg:row-span-8"
            >
              {loading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <StatsCard
                  color={c.color}
                  icon={c.icon}
                  year={c.year}
                  title={c.title}
                  keyVal={c.key}
                />
              )}
            </div>
          ))}
        </div>

        <div className="card min-h-[400px] lg:min-h-0 lg:row-span-18 lg:col-span-4">
          {loading ? <Skeleton className="h-full w-full" /> : <CompareProfit />}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
