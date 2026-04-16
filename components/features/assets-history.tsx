import { useEffect, useState } from "react";
import { useBaseContext } from "../context/base-context";
import { trackingassets } from "../helper/helper";
import { AssetHistory } from "../types/types";

function AssetsHistory() {
  const { financialData } = useBaseContext();
  const [assets, setAssets] = useState<AssetHistory[] | null>(null);

  useEffect(() => {
    setAssets(trackingassets(financialData));
  }, [financialData]);

  const colors = [
    "bg-[#FFF8C5]",
    "bg-[#C7E9F9]",
    "bg-[#CFF3AF]",
    "bg-[#FFD9D9]",
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="h-full w-full p-[1rem] flex flex-col">
      <p className="text-black mb-2">Assets Tracker</p>

      <div className="flex-1">
        {assets && assets.length > 0 ? (
          <div className="flex flex-col h-full gap-[.3rem] w-full">
            {assets.slice(0, 4).map((asset, index) => {
              const fy = asset?.fy ?? "N/A";
              const value = asset?.val ?? 0;
              const key = asset?.accn ?? `asset-${index}`;

              return (
                <div
                  key={`${key}-${index}`}
                  className={`flex-1 rounded-md ${colors[index % colors.length]} p-3 flex items-center justify-between`}
                >
                  <span className="text-sm text-gray-700">FY {fy}</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(value)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No Data available</div>
        )}
      </div>
    </div>
  );
}

export default AssetsHistory;
