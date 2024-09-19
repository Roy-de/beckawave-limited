import React, { useState } from "react";
import {
  BadgeDollarSignIcon,
  NotebookPenIcon,
  TrendingDown,
  TrendingUp,
  MinusIcon,
  WalletIcon,
} from "lucide-react";

import SalesAnalytics from "@/components/SalesAnalytics";
import RecentTransactions from "@/components/Tables/RecentTransactions";
import Overview from "@/components/Tables/Orverview";

const SalesCard: React.FC<{ total_sales: number }> = ({ total_sales }) => {
  const salesValue =
    total_sales >= 1000
      ? (total_sales / 1000).toFixed(1)
      : total_sales.toString();

  return (
    <button
      className={
        "w-fit px-10 h-fit hover:-rotate-2 duration-300 ease-in-out hover:scale-105 bg-white rounded-2xl shadow-soft shadow-blue-100 border border-slate-300 p-7 flex flex-row items-center gap-12 overflow-hidden relative"
      }
    >
      <div className={"flex flex-col space-y-3 text-center"}>
        <span className={`font-medium font-baloo text-2xl`}>Total Sales</span>
        <span className={"font-bold font-baloo text-4xl"}>
          {total_sales >= 1000 ? `${salesValue}K` : `${salesValue}`}
        </span>
      </div>
      <BadgeDollarSignIcon
        className={" bg-blue-100 p-4 rounded-3xl rotate-12"}
        size={80}
      />
    </button>
  );
};

const AverageSalesPerDay: React.FC<{ avgSales: number }> = ({ avgSales }) => {
  return (
    <button
      className={
        "h-fit hover:rotate-2 px-10 duration-300 ease-in-out bg-white hover:scale-105 w-fit rounded-2xl shadow-soft shadow-blue-100 border border-slate-300 p-7 flex flex-row items-center gap-12"
      }
    >
      <div className={"flex flex-col space-y-3 text-center"}>
        <span className={`font-medium font-baloo text-2xl`}>Average Sales</span>
        <span className={"font-bold font-baloo text-4xl"}>{avgSales}</span>
      </div>

      <NotebookPenIcon
        className={" bg-green-100 p-4 rounded-3xl -rotate-12"}
        size={80}
      />
    </button>
  );
};

const Revenue: React.FC = () => {
  const [trend] = useState(1);

  return (
    <button
      className={
        "h-fit hover:-rotate-2 px-10 duration-300 ease-in-out bg-white hover:scale-105 w-fit rounded-2xl shadow-soft shadow-blue-100 border border-slate-300 p-7 flex flex-row items-center gap-12"
      }
    >
      <div className={"flex flex-col space-y-3 text-center"}>
        <span className={`font-medium font-baloo text-2xl`}>
          Monthly Revenue
        </span>
        <div className={"flex flex-row items-center justify-between"}>
          <span className={"font-bold font-baloo text-4xl"}>100K</span>
          {trend < 0 ? (
            <div
              className={
                "bg-red-50 py-1 px-2 rounded-2xl flex flex-row space-x-2 items-center justify-center"
              }
            >
              <TrendingDown color={"#dc2626"} size={18} />
              <span className={"text-red-600 font-baloo font-medium"}>
                -1.2%
              </span>
            </div>
          ) : trend > 0 ? (
            <div
              className={
                "bg-green-50 py-1 px-2 rounded-2xl flex flex-row space-x-2 items-center justify-center"
              }
            >
              <TrendingUp color={"#00B418"} size={18} />
              <span className={"text-green-600 font-baloo font-medium"}>
                0.6%
              </span>
            </div>
          ) : (
            <MinusIcon
              className={"bg-blue-50 py-1 w-16 rounded-full"}
              color={"blue"}
            />
          )}
        </div>
      </div>

      <WalletIcon
        className={" bg-red-100 p-4 rounded-3xl rotate-12"}
        size={80}
      />
    </button>
  );
};

const DashBoardPage = () => {
  return (
    <div className={"h-full w-full grid grid-cols-10 overflow-y-scroll text-black"}>
      <div
        className={
          "col-start-1 col-span-8 gap-4 space-y-6 p-6 justify-start content-start"
        }
      >
        <span className={"font-bold font-baloo text-lg text-black"}>
          Dashboard
        </span>
        <div className={"flex flex-row gap-x-16 justify-start"}>
          <SalesCard total_sales={1600} />
          <AverageSalesPerDay avgSales={200} />
          <Revenue />
        </div>
        <div />
        <SalesAnalytics />
        <RecentTransactions />
      </div>
      <div className={"col-start-9 col-span-2 py-6 pr-2"}>
        <Overview />
      </div>
    </div>
  );
};

export default DashBoardPage;
