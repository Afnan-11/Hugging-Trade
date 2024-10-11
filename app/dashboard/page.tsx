import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowUpRight} from "lucide-react";
import Link from "next/link";
import {BarChartComponent} from "./_components/bar-chart";
import {BarChartBetter} from "./_components/bar-chart-better";
import {MetricsDisplay} from "./_components/metrics-display";

export default async function Dashboard() {
  return <MetricsDisplay />;
}
