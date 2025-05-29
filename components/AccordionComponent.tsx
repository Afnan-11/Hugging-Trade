"use client";

import { CircleMinus, CirclePlus } from "lucide-react";
import React from "react";

interface AccordionProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionComponent: React.FC<AccordionProps> = ({
  title,
  content,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="border rounded-2xl mb-2 md:mb-4 lg:w-[820px] w-full  bg-[#F3F4F6] hover:bg-gray-200">
      <div
        className="flex justify-between items-center cursor-pointer p-2 md:p-4 "
        onClick={onToggle}
      >
        <h2 className="text-[15px] md:text-[22px] font-bold md:py-1">{title}</h2>
        <span>{isOpen ? <CircleMinus /> : <CirclePlus />}</span>
      </div>
      {isOpen && (
        <div className=" border-t border-gray-300 mx-2 md:mx-5 py-5">
          <p className="text-[15px] md:text-[22px]">{content}</p>
        </div>
      )}
    </div>
  );
};

export default AccordionComponent;
