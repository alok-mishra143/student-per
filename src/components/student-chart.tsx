"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

type Student = {
  rollNo: string;
  name: string;
  grade: string;
  score: number;
};

type StudentChartProps = {
  students: Student[];
};

export function StudentChart({ students }: StudentChartProps) {
  const averageScore =
    students.reduce((sum, student) => sum + student.score, 0) / students.length;
  const highestScore = Math.max(...students.map((student) => student.score));
  const lowestScore = Math.min(...students.map((student) => student.score));

  const chartData = [
    { name: "Average", score: averageScore },
    { name: "Highest", score: highestScore },
    { name: "Lowest", score: lowestScore },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Performance Overview</CardTitle>
        <CardDescription>Average, highest, and lowest scores</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            score: {
              label: "Score",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="score" fill="var(--color-score)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
