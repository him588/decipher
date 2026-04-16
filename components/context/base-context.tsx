/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BaseContextType, CompanyDetails } from "../types/types";

const BaseContext = createContext<null | BaseContextType>(null);

export function BaseContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [companyDetails, setCompanyDetails] = useState({
    symbol: "AAPL",
    name: "Apple Inc",
    exchange: "NASDAQ NMS - GLOBAL MARKET",
    industry: "Technology",
    logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png",
    website: "https://www.apple.com/",
    cik: 320193,
  });

  const [previousSearch, setPreviousSearch] = useState<CompanyDetails[]>([]);
  const [financialData, setFinancialData] = useState<Record<
    string,
    object
  > | null>(null);

  useEffect(() => {
    const searchHistory = localStorage.getItem("previosSearch");
    if (searchHistory) {
      const search = JSON.parse(searchHistory);
      console.log(search);
      setPreviousSearch(search);
    }
  }, []);

  const baseContextValue: BaseContextType = useMemo(() => {
    return {
      companyDetails,
      setCompanyDetails,
      searchHistory: previousSearch,
      setSearchHistory: setPreviousSearch,
      financialData,
      setFinancialData,
    };
  }, [companyDetails, previousSearch, financialData]);
  return (
    <BaseContext.Provider value={baseContextValue}>
      {children}
    </BaseContext.Provider>
  );
}

export function useBaseContext() {
  const baseContext = useContext(BaseContext);
  if (baseContext === null) {
    throw new Error("Base context should not be empty");
  }
  return baseContext;
}
