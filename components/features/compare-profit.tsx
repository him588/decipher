import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useBaseContext } from "../context/base-context";
import { formatNumber } from "../helper/helper";

type Mode = "year" | "quarter" | "compare";
type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

type ChartRow = {
  label: string;
  [key: string]: string | number;
};

const PALETTE = ["#6B5CE7", "#00ADFF", "#22C28A", "#F59E0B"];

const STROKE_DASH: Record<number, string> = {
  0: "0",
  1: "6 3",
  2: "2 4",
  3: "8 3",
};

const MODES: { key: Mode; label: string }[] = [
  { key: "year", label: "Yearly" },
  { key: "quarter", label: "Quarterly" },
  { key: "compare", label: "Compare" },
];

// ✅ FIXED: keep FY (needed for Q4)
function cleanData(data: any[]) {
  const map = new Map();

  data.forEach((item) => {
    if (!item?.fy || !item?.fp) return;

    const key = `${item.fy}-${item.fp}`;
    map.set(key, item);
  });

  return Array.from(map.values());
}

// ✅ NEW: correct Q4 calculation
function getQuarterValue(data: any[], year: number, quarter: string) {
  const get = (fp: string) =>
    data.find((d) => d.fy === year && d.fp === fp)?.val ?? 0;

  if (quarter === "Q4") {
    const fy = get("FY");
    const q1 = get("Q1");
    const q2 = get("Q2");
    const q3 = get("Q3");

    if (!fy) return 0;

    return fy - (q1 + q2 + q3);
  }

  return get(quarter);
}

// ✅ Build chart data
function buildChartData(
  rawData: any[],
  mode: Mode,
  latestYear: number = 2025,
): { data: ChartRow[]; series: { name: string }[] } {
  if (!Array.isArray(rawData) || rawData.length === 0) {
    return { data: [], series: [] };
  }

  const years = [latestYear, latestYear - 1, latestYear - 2, latestYear - 3];
  const quarters: Quarter[] = ["Q1", "Q2", "Q3", "Q4"];

  const safeSum = (arr: any[]) =>
    arr.reduce((sum, d) => sum + (d?.val ?? 0), 0);

  const hasLatest = rawData.some((d) => d?.fy === latestYear);
  if (!hasLatest) return { data: [], series: [] };

  // YEAR
  if (mode === "year") {
    return {
      data: years.map((y) => ({
        label: String(y),
        Profit: safeSum(rawData.filter((d) => d?.fy === y)),
      })),
      series: [{ name: "Profit" }],
    };
  }

  // QUARTER (✅ FIXED)
  if (mode === "quarter") {
    return {
      data: quarters.map((q) => ({
        label: q,
        [latestYear]: getQuarterValue(rawData, latestYear, q),
      })),
      series: [{ name: String(latestYear) }],
    };
  }

  // COMPARE (✅ FIXED)
  return {
    data: quarters.map((q) => {
      const row: ChartRow = { label: q };

      years.forEach((y) => {
        row[y] = getQuarterValue(rawData, y, q);
      });

      return row;
    }),
    series: years.map((y) => ({ name: String(y) })),
  };
}

// Tooltip (UNCHANGED)
type PayloadItem = {
  name: string;
  value: number;
  color?: string;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 text-xs min-w-[120px] shadow-sm">
      <p className="font-medium text-gray-900 mb-1">{label}</p>

      {payload.map((entry, i) => (
        <p key={i} className="flex justify-between gap-4 text-gray-600">
          <span style={{ color: entry.color || "#000" }}>{entry.name}</span>

          <span className="font-medium text-gray-900">
            {formatNumber(entry.value)}
          </span>
        </p>
      ))}
    </div>
  );
};

export default function CompareProfit() {
  const [mode, setMode] = useState<Mode>("year");
  const { financialData } = useBaseContext();

  const raw = (financialData?.NetIncomeLoss as any)?.units?.USD || [];
  const cleanedData = cleanData(raw);

  const { data: chartData, series } = buildChartData(cleanedData, mode, 2025);

  const showLegend = mode === "compare";

  if (!chartData.length) {
    return (
      <div className="w-full h-[260px] flex items-center justify-center text-sm text-gray-400">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <span className="text-sm sm:text-base font-medium text-gray-900">
          Profit overview
        </span>

        <div className="flex flex-wrap sm:flex-nowrap gap-1 bg-gray-100 border border-gray-200 rounded-lg p-1 w-full sm:w-auto">
          {MODES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`flex-1 sm:flex-none text-[11px] sm:text-xs cursor-pointer px-3 py-1.5 rounded-md transition whitespace-nowrap
          ${
            mode === key
              ? "bg-white shadow text-gray-900 font-medium"
              : "text-gray-500"
          }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 4, right: 8, left: -8 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(0,0,0,0.06)"
          />

          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={formatNumber}
          />

          <Tooltip content={<CustomTooltip />} />

          {series.map((s, i) => (
            <Line
              key={s.name}
              type="monotone"
              dataKey={s.name}
              stroke={PALETTE[i]}
              strokeWidth={2}
              strokeDasharray={STROKE_DASH[i] || "0"}
              dot={{ r: 1 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      {showLegend && (
        <div className="flex gap-4 itemx-center justify-center flex-wrap mb-4">
          {series.map((s, i) => (
            <span
              key={s.name}
              className="flex items-center gap-2 text-xs text-gray-500"
            >
              <span
                className="inline-block w-5 h-[2px] rounded"
                style={{
                  background: PALETTE[i],
                  opacity: i === 0 ? 1 : 0.7,
                }}
              />
              {s.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
