"use client";
/* eslint-disable react-hooks/set-state-in-effect */
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";

type DropdownValue = { key: string; value: string }[];

function DropDown({
  data,
  handleClick,
  defaultSelect = false,
}: {
  data: DropdownValue;
  handleClick: (value: string) => void;
  defaultSelect?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    if (defaultSelect && data && selectedValue === "") {
      handleClick(data[0].value);
      setSelectedValue(data[0].value);
    }
  }, [defaultSelect, data, handleClick, selectedValue]);

  return (
    <div className="relative ">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between
  px-2.5 py-1.5
  text-sm text-stone-800
  
  transition"
      >
        <span className="capitalize">{selectedValue || "Select"}</span>

        <ChevronDown
          size={16}
          className={`transition ${isOpen ? "rotate-180 text-amber-600" : "text-stone-500"}`}
        />
      </button>

      {/* Menu */}
      {isOpen && (
        <div
          className="absolute  z-50 mt-1 
          rounded-2xl border border-stone-200
          bg-white shadow-xl left-[50%] -translate-x-[50%]
          p-1 max-h-52 overflow-auto
          animate-in fade-in zoom-in-95 duration-150"
        >
          {!defaultSelect && (
            <button
              className="w-full text-left px-3 py-2 text-sm text-stone-500
            rounded-lg hover:bg-stone-100 transition"
              onClick={() => {
                setSelectedValue("");
                handleClick("");
                setIsOpen(false);
              }}
            >
              None
            </button>
          )}

          {data &&
            data.map((item) => (
              <button
                key={item.value}
                onClick={() => {
                  setSelectedValue(item.key);
                  handleClick(item.value);
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm
                text-stone-700 rounded-lg capitalize
                hover:bg-amber-50 hover:text-amber-700
                transition"
              >
                {item.key}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
