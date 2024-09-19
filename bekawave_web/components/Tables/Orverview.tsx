import React from "react";

const Overview = () => {
  return (
    <div
      className={
        "border h-full w-full bg-white rounded-2xl shadow-soft shadow-blue-100 p-4"
      }
    >
      <div className={"text-center pt-4"}>
        <span
          className={
            "font-baloo font-bold text-xl border rounded-xl px-10 py-1 bg-gray-100"
          }
        >
          Sales summary
        </span>
      </div>
    </div>
  );
};

export default Overview;
