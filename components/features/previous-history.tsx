/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useBaseContext } from "../context/base-context";

function PreviousHistory() {
  const { searchHistory, setCompanyDetails } = useBaseContext();

  return (
    <div className="h-full max-h-[400px] w-full bg-white border-r border-slate-200 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="text-sm font-semibold text-slate-900">
          Recent Searches
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {searchHistory.length} {searchHistory.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {searchHistory.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-700">No history yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Search for companies to see them here
            </p>
          </div>
        ) : (
          // History List
          <div className="p-2 space-y-1.5">
            {searchHistory.map((company, index) => (
              <button
                key={`${company.symbol}-${index}`}
                onClick={() => setCompanyDetails(company)}
                className="w-full p-2.5 rounded-lg bg-slate-50/50 cursor-pointer hover:bg-[#fff8c5/10] border border-transparent hover:border-[#fff8c5] transition-all duration-200 text-left group"
              >
                <div className="flex items-center gap-2.5">
                  {/* Logo */}
                  <div className="w-9 h-9 rounded-md bg-white border border-slate-200 p-1.5 flex items-center justify-center flex-shrink-0">
                    <img
                      src={company.logo}
                      alt={company.symbol}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {company.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-medium text-[#288cfa] bg-[#288cfa]/10 px-1.5 py-0.5 rounded">
                        {company.symbol}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate">
                        {company.industry}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <svg
                    className="w-4 h-4 text-slate-400 group-hover:text-[#fff8c5] transition-colors flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviousHistory;
