import React from "react";

export interface BaseContextType {
  companyDetails: CompanyDetails;
  setCompanyDetails: React.Dispatch<React.SetStateAction<CompanyDetails>>;
  searchHistory: CompanyDetails[];
  setSearchHistory: React.Dispatch<React.SetStateAction<CompanyDetails[]>>;
  financialData: Record<string, object> | null;
  setFinancialData: React.Dispatch<
    React.SetStateAction<Record<string, object> | null>
  >;
}

export interface CompanyDetails {
  symbol: string;
  name: string;
  exchange: string;
  industry: string;
  logo: string;
  website: string;
  cik: number;
}

export interface AssetHistory {
  end?: string;
  val?: number;
  accn?: string;
  fy?: number;
  fp?: string;
  form?: string;
  filed?: string;
  frame?: string;
}

export type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

export type FinancialRecord = {
  fy: number | null;
  fp: Quarter | "FY" | null;
  val: number | null;
};

export type Series = {
  name: string;
  data: number[];
};

export type ChartData = {
  year: {
    labels: string[];
    series: Series[];
  };
  quarter: {
    labels: string[];
    series: Series[];
  };
  compare: {
    labels: string[];
    series: Series[];
  };
} | null;
