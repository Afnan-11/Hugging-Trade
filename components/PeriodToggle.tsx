"use client";

import React from "react";

interface PeriodToggleProps {
  selectedPeriod: "year" | "month";
  onPeriodChange: (period: "year" | "month") => void;
  discountYear: number;
  discountMonth: number;
}

const PeriodToggle: React.FC<PeriodToggleProps> = ({
  selectedPeriod,
  onPeriodChange,
  discountYear,
  discountMonth
}) => {
  return (
    <div className="flex z-[55] items-center p-0 bg-white rounded-full border border-gray-200 w-max">
      <button
        onClick={() => onPeriodChange("year")}
        className={`px-4 py-2 rounded-full focus:outline-none transition-colors ${
          selectedPeriod === "year"
            ? "bg-black text-white font-bold"
            : "text-black"
        }`}
      >
        12 months <span className="text-[#F7C23B]">Save {discountYear}%</span>
      </button>

      <button
        onClick={() => onPeriodChange("month")}
        className={`px-4 py-2 rounded-full focus:outline-none transition-colors ${
          selectedPeriod === "month"
            ? "bg-black text-white font-bold"
            : "text-black"
        }`}
      >
        1 month <span className="text-[#F7C23B]">Save {discountMonth}%</span>
      </button>
    </div>
  );
};

export default PeriodToggle;
