/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useBaseContext } from "../context/base-context";
import {
  formatAssetsData,
  formatlibalities,
  formatProfit,
  formatRevnue,
} from "../helper/helper";

function StatsCard({
  color,
  icon,
  title,
  year,
  keyVal,
}: {
  color: string;
  icon: React.ReactNode;
  title: string;
  year: string;
  keyVal: string;
}) {
  const [hover, setHover] = useState(false);
  const { financialData } = useBaseContext();

  const [stats, setStats] = useState({ value: "", chnageInPercentage: 0 });

  const isPositive = stats.chnageInPercentage >= 0;
  useEffect(() => {
    if (keyVal === "Assets") {
      setStats(formatAssetsData(financialData, keyVal));
    }
    if (keyVal === "Liabilities") {
      setStats(formatlibalities(financialData, keyVal));
    }
    if (keyVal === "GrossProfit") {
      setStats(formatProfit(financialData, keyVal));
    }
    if (keyVal === "Revenues") {
      setStats(formatRevnue(financialData, keyVal));
    }
  }, [financialData, keyVal]);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="h-full w-full relative overflow-hidden cursor-pointer rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      {/* 🔵 Background blob */}
      <div
        style={{ backgroundColor: color }}
        className={`absolute transition-all rounded-full duration-500 ${
          hover
            ? "h-[150%] -top-[20%] -right-[20%] opacity-40 w-[150%]"
            : "h-[140px] -top-[70px] -right-[70px] w-[140px]"
        }`}
      />

      {/* 🔝 Top Row (Title + Icon) */}
      <div className="relative z-40 flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="text-xl">{icon}</div>
      </div>

      {/* 📊 Content */}
      <div className="relative z-40 mt-6 flex flex-col gap-1">
        {stats.value ? (
          <>
            {/* Value */}
            <h2 className="text-2xl font-semibold text-gray-800">
              {stats.value}
            </h2>

            {/* Change % */}
            <div
              className={`text-[12px] font-medium ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? "↑" : "↓"} {Math.abs(stats.chnageInPercentage)}%
              <span className="text-gray-400 text-[12px] ml-1">vs FY2024</span>
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-400 italic">
            No data available for {year}
          </div>
        )}

        {/* Year */}
        <p className="text-xs text-gray-400">{year}</p>
      </div>
    </div>
  );
}

export default StatsCard;
