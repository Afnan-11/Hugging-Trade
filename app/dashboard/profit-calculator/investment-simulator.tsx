"use client";

import {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {Info, TrendingUp, DollarSign, Calendar} from "lucide-react";
import {cn} from "@/lib/utils";
import {motion} from "framer-motion";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";

const INITIAL_MONTHLY_GROWTH_PERCENTAGE = 200;
const REDUCED_MONTHLY_GROWTH_PERCENTAGE = 50;
const INITIAL_PROFIT_SHARE_PERCENTAGE = 35;
const REDUCED_PROFIT_SHARE_PERCENTAGE = 15;
const BALANCE_THRESHOLD = 500000;

interface SimulationDataPoint {
  month: number;
  balance: number;
  totalGrowthPercentage: number;
  monthlyGrowthRate: number;
  profitSharePercentage: number;
}

export default function InvestmentSimulation() {
  const [initialDeposit, setInitialDeposit] = useState<number>(500);
  const [months, setMonths] = useState<number>(12);
  const [simulationData, setSimulationData] = useState<SimulationDataPoint[]>([]);

  const generateData = (initialAmount: number, months: number): SimulationDataPoint[] => {
    let data: SimulationDataPoint[] = [];
    let currentAmount = initialAmount;
    for (let i = 1; i <= months; i++) {
      const monthlyGrowthRate =
        currentAmount < BALANCE_THRESHOLD ? INITIAL_MONTHLY_GROWTH_PERCENTAGE : REDUCED_MONTHLY_GROWTH_PERCENTAGE;
      const profitSharePercentage =
        currentAmount < BALANCE_THRESHOLD ? INITIAL_PROFIT_SHARE_PERCENTAGE : REDUCED_PROFIT_SHARE_PERCENTAGE;
      const growthAmount = currentAmount * (monthlyGrowthRate / 100);
      const profitAfterDeduction = growthAmount * (1 - profitSharePercentage / 100);
      currentAmount += profitAfterDeduction;
      const totalGrowthPercentage = ((currentAmount - initialAmount) / initialAmount) * 100;
      data.push({
        month: i,
        balance: Math.round(currentAmount * 100) / 100,
        totalGrowthPercentage: totalGrowthPercentage,
        monthlyGrowthRate: monthlyGrowthRate,
        profitSharePercentage: profitSharePercentage,
      });
    }
    return data;
  };

  useEffect(() => {
    const data = generateData(initialDeposit, months);
    setSimulationData(data);
  }, [initialDeposit, months]);

  const calculateYAxisWidth = (maxBalance: number) => {
    const numberOfDigits = Math.floor(Math.log10(maxBalance)) + 1;
    return Math.max(60, numberOfDigits * 10); // Minimum width of 60, then 10px per digit
  };

  const maxBalance = Math.max(...simulationData.map((data) => data.balance));
  const yAxisWidth = calculateYAxisWidth(maxBalance);

  return (
    <div className="">
      <div className="space-y-1 border-b">
        <h1 className="pb-4 text-2xl font-bold tracking-tight text-accent md:text-3xl lg:text-4xl">
          Compound Investment Simulation
        </h1>
        <motion.ul
          className="space-y-2 pb-4 text-muted-foreground"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          <motion.li
            className="flex items-center gap-2"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.3, delay: 0.1}}
          >
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-accent"></span>
            <span>
              Investment growth: {INITIAL_MONTHLY_GROWTH_PERCENTAGE}% monthly (reduced to{" "}
              {REDUCED_MONTHLY_GROWTH_PERCENTAGE}% when balance exceeds ${BALANCE_THRESHOLD.toLocaleString()})
            </span>
          </motion.li>
          <motion.li
            className="flex items-center gap-2"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.3, delay: 0.2}}
          >
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-chart-2"></span>
            <span>
              Our profit share: {INITIAL_PROFIT_SHARE_PERCENTAGE}% for balances under $
              {BALANCE_THRESHOLD.toLocaleString()}, {REDUCED_PROFIT_SHARE_PERCENTAGE}% for balances of $
              {BALANCE_THRESHOLD.toLocaleString()} or more
            </span>
          </motion.li>
          <motion.li
            className="flex items-center gap-2"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.3, delay: 0.3}}
          >
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-primary"></span>
            <span>Balance shown is after deducting our profit share</span>
          </motion.li>
        </motion.ul>
      </div>
      <div className="mt-8 space-y-8">
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.2}}
          className="flex flex-col gap-6 md:flex-row md:gap-10"
        >
          <Card className="flex-1 shadow-lg">
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label
                  htmlFor="initialDeposit"
                  className="flex items-center gap-2"
                >
                  <DollarSign className="h-4 w-4" />
                  Initial Deposit: ${initialDeposit}
                </Label>
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
                <Label
                  htmlFor="months"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Simulation Period: {months} months
                </Label>
                <Slider
                  id="months"
                  min={1}
                  max={36}
                  step={1}
                  value={[months]}
                  onValueChange={(value) => setMonths(value[0])}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
          {simulationData.length > 0 && (
            <SimulationCard
              data={simulationData[simulationData.length - 1]}
              isHighlighted={true}
            />
          )}
        </motion.div>
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.4}}
          className="space-y-6"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Investment Growth Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <LineChart data={simulationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    width={yAxisWidth}
                  />
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Balance"]}
                    labelFormatter={(label) => `Month ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {simulationData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5, delay: 0.1 * index}}
              >
                <SimulationCard data={data} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SimulationCard({data, isHighlighted}: {data: SimulationDataPoint; isHighlighted?: boolean}) {
  const cardClassName = cn(
    "transition-all duration-300 ease-in-out bg-card hover:bg-accent/5 overflow-hidden",
    isHighlighted && "flex-1 shadow-lg border border-accent/20",
  );

  const cardHeaderClassName = cn("p-4", isHighlighted && "bg-gradient-to-b from-accent/20 to-accent/5");

  const titleClassName = cn("text-lg font-semibold", isHighlighted && "text-xl");

  const contentClassName = cn("px-4 pb-4 space-y-2");

  const balanceClassName = cn("text-2xl font-bold", isHighlighted && "text-3xl pt-2");

  const percentageClassName = cn(
    "flex items-center text-accent opacity-70 text-sm font-medium",
    isHighlighted && "opacity-100 pt-2 font-bold",
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
        <div>
          <div className={percentageClassName}>
            <TrendingUp className="mr-2 h-4 w-4" />
            {data.totalGrowthPercentage.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})}%
            growth
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Info className="h-3 w-3" />
            Monthly growth: {data.monthlyGrowthRate}% | Profit share: {data.profitSharePercentage}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
