"use client";
import {CalendarIcon} from "lucide-react";
import {DateRange} from "react-day-picker";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useState} from "react";
import {toast} from "sonner";
import {MONTHS} from "@/sanity/schemas/chart";

type Props = {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  setSelectedPeriod: (period: string) => void;
  selectedPeriod: string;
  chartData?: Array<{
    month: string;
    fund: number;
    sp500: number;
    date: Date;
  }> | null;
};

export function DatePickerWithRange({date, setDate, setSelectedPeriod, selectedPeriod, chartData}: Props) {
  const [fromMonth, setFromMonth] = useState<number>(date?.from?.getMonth() || new Date().getMonth());
  const [fromYear, setFromYear] = useState<number>(date?.from?.getFullYear() || new Date().getFullYear());
  const [toMonth, setToMonth] = useState<number>(date?.to?.getMonth() || new Date().getMonth());
  const [toYear, setToYear] = useState<number>(date?.to?.getFullYear() || new Date().getFullYear());

  // Get unique years from chartData dates, sorted in descending order
  const years = Array.from(new Set(chartData?.map((item) => new Date(item.date).getFullYear()))).sort((a, b) => b - a);

  const handleSelect = () => {
    const fromDate = new Date(fromYear, fromMonth, 1);
    const toDate = new Date(toYear, toMonth + 1, 0); // Last day of selected month

    if (fromDate > toDate) {
      toast.error("From date cannot be after To date");
      return;
    }

    setDate({
      from: fromDate,
      to: toDate,
    });
    setSelectedPeriod("");
  };

  const isOptionDisabled = (type: "from" | "to", year: number, month?: number) => {
    if (type === "from") {
      if (year === toYear && month !== undefined) {
        return month > toMonth;
      }
      return year > toYear;
    } else {
      if (year === fromYear && month !== undefined) {
        return month < fromMonth;
      }
      return year < fromYear;
    }
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={selectedPeriod ? "outline" : "default"}
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
          className="w-80 p-4"
          align="end"
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">From</p>
              <div className="flex gap-2">
                <select
                  value={fromMonth}
                  onChange={(e) => setFromMonth(parseInt(e.target.value))}
                  className="w-full rounded-md border p-2"
                >
                  {MONTHS.map((month, index) => (
                    <option
                      key={`from-${month}`}
                      value={index}
                      disabled={isOptionDisabled("from", fromYear, index)}
                    >
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  value={fromYear}
                  onChange={(e) => setFromYear(parseInt(e.target.value))}
                  className="w-full rounded-md border p-2"
                >
                  {years.map((year) => (
                    <option
                      key={`from-${year}`}
                      value={year}
                      disabled={isOptionDisabled("from", year)}
                    >
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">To</p>
              <div className="flex gap-2">
                <select
                  value={toMonth}
                  onChange={(e) => setToMonth(parseInt(e.target.value))}
                  className="w-full rounded-md border p-2"
                >
                  {MONTHS.map((month, index) => (
                    <option
                      key={`to-${month}`}
                      value={index}
                      disabled={isOptionDisabled("to", toYear, index)}
                    >
                      {month}
                    </option>
                  ))}
                </select>

                <select
                  value={toYear}
                  onChange={(e) => setToYear(parseInt(e.target.value))}
                  className="w-full rounded-md border p-2"
                >
                  {years.map((year) => (
                    <option
                      key={`to-${year}`}
                      value={year}
                      disabled={isOptionDisabled("to", year)}
                    >
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button onClick={handleSelect}>Apply</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
