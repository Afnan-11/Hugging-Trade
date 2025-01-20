"use client";

import * as React from "react";
import {CalendarIcon} from "lucide-react";
import {DateRange} from "react-day-picker";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

type Props = {
  date: DateRange | undefined;
  setDate: any;
  setSelectedPeriod: any;
};

export function DatePickerWithRange({date, setDate, setSelectedPeriod}: Props) {
  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className="h-8 w-8"
          >
            <div>
              <CalendarIcon
                size={18}
                className="block"
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate: any) => {
              setDate(newDate);
              setSelectedPeriod("");
            }}
            numberOfMonths={2}
            disabled={{after: new Date()}}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
