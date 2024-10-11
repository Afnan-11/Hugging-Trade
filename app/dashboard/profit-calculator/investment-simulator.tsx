"use client";

import {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {TrendingUp} from "lucide-react";
import {cn} from "@/lib/utils";
import {PROFIT_SHARE_PERCENTAGE} from "@/utils/constants";
const MONTHLY_GROWTH_PERCENTAGE = 200;
const PROFIT_DEDUCTION_PERCENTAGE = PROFIT_SHARE_PERCENTAGE * 100;

interface SimulationDataPoint {
  month: number;
  balance: number;
  totalGrowthPercentage: number;
}

export default function InvestmentSimulation() {
  const [initialDeposit, setInitialDeposit] = useState<number>(500);
  const [months, setMonths] = useState<number>(12);
  const [simulationData, setSimulationData] = useState<SimulationDataPoint[]>([]);

  const generateData = (initialAmount: number, months: number): SimulationDataPoint[] => {
    let data: SimulationDataPoint[] = [];
    let currentAmount = initialAmount;
    for (let i = 1; i <= months; i++) {
      const growthAmount = currentAmount * (MONTHLY_GROWTH_PERCENTAGE / 100);
      const profitAfterDeduction = growthAmount * (1 - PROFIT_DEDUCTION_PERCENTAGE / 100);
      currentAmount += profitAfterDeduction;
      const totalGrowthPercentage = ((currentAmount - initialAmount) / initialAmount) * 100;
      data.push({
        month: i,
        balance: Math.round(currentAmount * 100) / 100,
        totalGrowthPercentage: totalGrowthPercentage,
      });
    }
    return data;
  };

  useEffect(() => {
    const data = generateData(initialDeposit, months);
    setSimulationData(data);
  }, [initialDeposit, months]);

  return (
    <div>
      <div className="space-y-1 border-b pt-4">
        <h1 className="text-3xl font-bold tracking-tight">Compound Investment Simulation</h1>
        <p className="pb-2 text-muted-foreground">
          See how your investment might grow over time with a {MONTHLY_GROWTH_PERCENTAGE}% monthly growth,{" "}
          {PROFIT_DEDUCTION_PERCENTAGE}% profit deduction, compounded monthly.
        </p>
      </div>
      <div className="mt-6 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:gap-10">
          <div className="flex-1 space-y-4">
            <div>
              <Label htmlFor="initialDeposit">Initial Deposit: ${initialDeposit}</Label>
              <Slider
                id="initialDeposit"
                min={100}
                max={10000}
                step={100}
                value={[initialDeposit]}
                onValueChange={(value) => setInitialDeposit(value[0])}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="months">Simulation Period: {months} months</Label>
              <Slider
                id="months"
                min={1}
                max={12}
                step={1}
                value={[months]}
                onValueChange={(value) => setMonths(value[0])}
                className="mt-2"
              />
            </div>
          </div>
          {simulationData.length > 0 && (
            <SimulationCard
              data={simulationData[simulationData.length - 1]}
              isHighlighted={true}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
          {simulationData.map((data) => (
            <SimulationCard
              key={data.month}
              data={data}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SimulationCard({data, isHighlighted}: {data: SimulationDataPoint; isHighlighted?: boolean}) {
  const cardClassName = cn(
    "transition-all duration-300 ease-in-out bg-card hover:bg-muted overflow-hidden",
    isHighlighted && "flex-1 shadow-lg border border-chart-2/20",
  );

  const cardHeaderClassName = cn("p-4", isHighlighted && "bg-gradient-to-b from-accent/20 to-accent/10");

  const titleClassName = cn("text-lg font-semibold", isHighlighted && "text-xl ");

  const contentClassName = cn("px-4 space-y-2");

  const balanceClassName = cn("text-2xl font-bold", isHighlighted && "text-3xl pt-6");

  const percentageClassName = cn(
    "flex items-center text-chart-2 opacity-70 text-sm font-medium",
    isHighlighted && "opacity-100 pt-2 text-accent font-bold",
  );

  return (
    <Card className={cardClassName}>
      <CardHeader className={cardHeaderClassName}>
        <CardTitle className={titleClassName}>Month {data.month}</CardTitle>
      </CardHeader>
      <CardContent className={contentClassName}>
        <div className={balanceClassName}>
          ${data.balance.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </div>
        <div className={percentageClassName}>
          <TrendingUp className="mr-2 h-4 w-4" />
          {data.totalGrowthPercentage.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}%
          growth
        </div>
      </CardContent>
    </Card>
  );
}
