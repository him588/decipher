import { useBaseContext } from "../context/base-context";

function Header() {
  const { companyDetails } = useBaseContext();

  return (
    <div className="relative min-h-[120px] sm:min-h-[100px] w-full bg-gradient-to-br from-slate-50 to-white rounded-xl mt-1 transition-all duration-300 p-3 overflow-hidden border border-slate-100">
      <div className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-[#fff8c5]/60 to-amber-200/30 rounded-bl-full blur-xl z-0" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 h-full">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/40 backdrop-blur-sm w-full sm:w-auto">
          <div className="flex flex-col justify-center overflow-hidden">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[1rem] sm:text-[1.35rem] font-semibold text-slate-900 tracking-tight truncate">
                {companyDetails.name}
              </h1>

              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium bg-[#288cfa]/10 text-[#288cfa] border border-[#288cfa]/20">
                {companyDetails.symbol}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1 text-[10px] sm:text-[11px] mt-0.5">
              <p className="text-slate-500 truncate">
                {companyDetails.industry}
              </p>
              <span className="text-slate-300">•</span>
              <p className="text-slate-400 truncate">
                {companyDetails.exchange}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap sm:flex-col items-start sm:items-end justify-between gap-2 w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-medium bg-white/40 backdrop-blur-md text-slate-700 border border-white/30 shadow-sm">
              ID: {companyDetails.cik}
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
