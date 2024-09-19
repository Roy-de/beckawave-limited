import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface SalesData {
  name: string;
  ProductA: number;
  ProductB: number;
  ProductC: number;
  ProductD: number;
  ProductE: number;
}

// Sample data for different periods
const weeklyData: SalesData[] = [
  {
    name: "Week 1",
    ProductA: 120,
    ProductB: 90,
    ProductC: 60,
    ProductD: 80,
    ProductE: 70,
  },
  {
    name: "Week 2",
    ProductA: 150,
    ProductB: 120,
    ProductC: 90,
    ProductD: 100,
    ProductE: 85,
  },
  {
    name: "Week 3",
    ProductA: 180,
    ProductB: 160,
    ProductC: 120,
    ProductD: 140,
    ProductE: 110,
  },
  {
    name: "Week 4",
    ProductA: 210,
    ProductB: 180,
    ProductC: 140,
    ProductD: 160,
    ProductE: 130,
  },
];

const monthlyData: SalesData[] = [
  {
    name: "Jan",
    ProductA: 400,
    ProductB: 240,
    ProductC: 240,
    ProductD: 200,
    ProductE: 300,
  },
  {
    name: "Feb",
    ProductA: 300,
    ProductB: 139,
    ProductC: 221,
    ProductD: 250,
    ProductE: 400,
  },
  {
    name: "Mar",
    ProductA: 200,
    ProductB: 980,
    ProductC: 229,
    ProductD: 320,
    ProductE: 500,
  },
  {
    name: "Apr",
    ProductA: 278,
    ProductB: 390,
    ProductC: 200,
    ProductD: 400,
    ProductE: 600,
  },
  {
    name: "May",
    ProductA: 189,
    ProductB: 480,
    ProductC: 218,
    ProductD: 450,
    ProductE: 700,
  },
  {
    name: "Jun",
    ProductA: 239,
    ProductB: 380,
    ProductC: 250,
    ProductD: 500,
    ProductE: 800,
  },
  {
    name: "Jul",
    ProductA: 349,
    ProductB: 430,
    ProductC: 210,
    ProductD: 600,
    ProductE: 900,
  },
  {
    name: "August",
    ProductA: 349,
    ProductB: 430,
    ProductC: 210,
    ProductD: 600,
    ProductE: 900,
  },
  {
    name: "September",
    ProductA: 349,
    ProductB: 430,
    ProductC: 210,
    ProductD: 600,
    ProductE: 900,
  },
  {
    name: "October",
    ProductA: 349,
    ProductB: 430,
    ProductC: 210,
    ProductD: 600,
    ProductE: 900,
  },
  {
    name: "November",
    ProductA: 349,
    ProductB: 430,
    ProductC: 210,
    ProductD: 600,
    ProductE: 900,
  },
  {
    name: "December",
    ProductA: 349,
    ProductB: 430,
    ProductC: 210,
    ProductD: 600,
    ProductE: 900,
  },
];

const yearlyData: SalesData[] = [
  {
    name: "2018",
    ProductA: 1000,
    ProductB: 700,
    ProductC: 600,
    ProductD: 500,
    ProductE: 900,
  },
  {
    name: "2019",
    ProductA: 1500,
    ProductB: 1200,
    ProductC: 800,
    ProductD: 700,
    ProductE: 1000,
  },
  {
    name: "2020",
    ProductA: 1800,
    ProductB: 1400,
    ProductC: 900,
    ProductD: 800,
    ProductE: 1100,
  },
  {
    name: "2021",
    ProductA: 2000,
    ProductB: 1600,
    ProductC: 1000,
    ProductD: 900,
    ProductE: 1200,
  },
  {
    name: "2022",
    ProductA: 2300,
    ProductB: 1800,
    ProductC: 1200,
    ProductD: 1000,
    ProductE: 1300,
  },
];

const SalesAnalytics: React.FC = () => {
  const [activePeriod, setActivePeriod] = useState<string>("Monthly");

  // Determine which dataset to display based on the active period
  const getData = () => {
    switch (activePeriod) {
      case "Weekly":
        return weeklyData;
      case "Yearly":
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  return (
    <div
      className={
        "h-[500px] w-[1380px] bg-white border rounded-2xl shadow-soft shadow-blue-100 flex flex-col p-4"
      }
    >
      <div className={"h-12 w-full flex flex-row items-center justify-between"}>
        <div className={"flex items-start flex-col"}>
          <div className={"font-baloo font-bold text-xl px-2"}>
            Sales Analytics
          </div>
          <span className={"font-baloo text-sm px-2 text-gray-600"}>
            Revenue Analysis Report Insight
          </span>
        </div>
        <div className={"bg-[#eeeeef] rounded-xl p-1"}>
          <Button
            className={"font-baloo font-medium text-sm rounded-xl"}
            size={"sm"}
            onClick={() => setActivePeriod("Weekly")}
            color={"primary"}
            // @ts-ignore
            variant={activePeriod === "Weekly" ? "solid" : ""}
          >
            Weekly
          </Button>
          <Button
            className={"font-baloo font-medium text-sm rounded-xl"}
            size={"sm"}
            onClick={() => setActivePeriod("Monthly")}
            color={"primary"}
            // @ts-ignore
            variant={activePeriod === "Monthly" ? "solid" : ""}
          >
            Monthly
          </Button>
          <Button
            className={"font-baloo font-medium text-sm rounded-xl"}
            size={"sm"}
            onClick={() => setActivePeriod("Yearly")}
            color={"primary"}
            // @ts-ignore
            variant={activePeriod === "Yearly" ? "solid" : ""}
          >
            Yearly
          </Button>
        </div>
      </div>

      <ResponsiveContainer height="80%" width="100%">
        <AreaChart
          data={getData()}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            dataKey="ProductA"
            fill="#8884d8"
            fillOpacity={0.3}
            stackId="1"
            stroke="#8884d8"
            type="monotone"
          />
          <Area
            dataKey="ProductB"
            fill="#82ca9d"
            fillOpacity={0.3}
            stackId="1"
            stroke="#82ca9d"
            type="monotone"
          />
          <Area
            dataKey="ProductC"
            fill="#ffc658"
            fillOpacity={0.3}
            stackId="1"
            stroke="#ffc658"
            type="monotone"
          />
          <Area
            dataKey="ProductD"
            fill="#ff7300"
            fillOpacity={0.3}
            stackId="1"
            stroke="#ff7300"
            type="monotone"
          />
          <Area
            dataKey="ProductE"
            fill="#00c49f"
            fillOpacity={0.3}
            stackId="1"
            stroke="#00c49f"
            type="monotone"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesAnalytics;
