import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import React from "react";

function Sidebar() {
  return (
    <div className=" h-full  top-0 hidden md:flex   shadow-xs w-[20%] mix-w-[200px] max-w-[240px] bg-white rounded-3xl flex flex-col py-[2rem] px-[1rem] ">
      <div className=" w-full flex items-center justify-center gap-[.5rem] text-black ">
        <Image src={"/logo.svg"} width={30} height={30} alt="" />
        <p className=" text-2xl font-bold leading-[100%]  -mt-[.2rem] ">
          HIFinance
        </p>
      </div>
      <div className=" mt-[4rem]">
        <SidebarItem
          logo={<LayoutDashboard size={18} fill="black" />}
          value="Dashboard"
        />
      </div>
    </div>
  );
}

export default Sidebar;

function SidebarItem({
  logo,
  value,
}: {
  logo: React.ReactNode;
  value: string;
  route?: string;
}) {
  return (
    <div className=" w-full bg-[#fff8c5] flex items-center px-[1rem]  py-[.6rem]  gap-[.5rem] rounded-md text-black  ">
      {logo}
      <p className="font-semibold">{value}</p>
    </div>
  );
}
