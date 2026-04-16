/* eslint-disable react-hooks/set-state-in-effect */
import axios from "axios";
import { ArrowUpRight, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CompanyDetails } from "../types/types";
import { useBaseContext } from "../context/base-context";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<CompanyDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const { setCompanyDetails, setSearchHistory } = useBaseContext();

  async function fetchCompanyDetails(query: string) {
    setLoading(true);
    try {
      const response = await axios.get(`/api/search/${query}`);
      console.log(response.data);
      setSearchResult(response.data.companies);

      setLoading(false);
    } catch (error) {
      console.log("Erro while fetching company Data", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (search === "") {
      setSearchResult([]);
      return;
    }

    const timer = setTimeout(() => {
      console.log("search", search);
      fetchCompanyDetails(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex min-h-[50px] gap-[5px] z-50 relative items-center w-full h-full px-3 rounded-lg text-slate-400 border border-slate-200 bg-white shadow-sm focus-within:border-[#fff8c5] focus-within:ring-2 focus-within:ring-[#fff8c5]/40 transition-all">
      <Search size={14} />

      <input
        type="text"
        value={search}
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
      />

      {search && (
        <div className="absolute w-full max-h-[200px] overflow-y-auto bg-white border border-slate-200 top-[3rem] left-0 rounded-md shadow-md p-2">
          {searchResult.length === 0 && !loading ? (
            <div className="text-sm text-slate-400 text-center py-4">
              No results found
            </div>
          ) : loading ? (
            <div className="flex gap-[.5rem] items-center justify-center text-sm py-4">
              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin " />
              Loading ...
            </div>
          ) : (
            searchResult.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setCompanyDetails(item);
                  setSearchResult([]);
                  setSearch("");
                  setSearchHistory((prev) => {
                    const isIncludes = prev.find(
                      (search) => search.cik === item.cik,
                    );
                    if (isIncludes) {
                      return prev;
                    } else {
                      const updatedArray = [...prev, item];
                      localStorage.setItem(
                        "previosSearch",
                        JSON.stringify(updatedArray),
                      );
                      return updatedArray;
                    }
                  });
                }}
                className="p-2  flex  items-center justify-between text-sm text-slate-700 hover:bg-slate-100 rounded cursor-pointer"
              >
                {item.name}
                <p className=" px-[.5rem]  text-[12px]  flex items-center ">
                  {item.cik}
                  <ArrowUpRight size={10} />
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
