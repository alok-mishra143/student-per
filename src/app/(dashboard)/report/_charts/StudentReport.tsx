/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 60 },
  { month: "February", desktop: 85 },
  { month: "March", desktop: 40 },
  { month: "April", desktop: 90 },
  { month: "May", desktop: 56 },
  { month: "June", desktop: 100 },
];
const chartConfig = {
  desktop: {
    label: "Avg Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
interface StudentReportProps {
  rollNo: string;
  name: string;
  grade: string;
  score: number;
}

const StudentReport = ({ students }: any) => {
  return (
    <div className="w-full max-h-[600px]">
      <Card>
        <CardHeader>
          <CardTitle>Month Wise Report</CardTitle>
          <CardDescription>average Score</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentReport;
