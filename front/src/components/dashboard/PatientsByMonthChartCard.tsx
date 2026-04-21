import { DashboardSectionCard } from "@/components/dashboard/DashboardCards";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { patientsByMonth } from "@/components/dashboard/data/dashboardMockData";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const monthlyChartConfig = {
  pacientes: {
    label: "Pacientes",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function PatientsByMonthChartCard() {
  return (
    <DashboardSectionCard
      title="Nuevos pacientes por mes"
      description="Tendencia de registros de pacientes"
    >
      <ChartContainer config={monthlyChartConfig} className="h-72 w-full">
        <AreaChart data={patientsByMonth} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="pacientes"
            type="monotone"
            fill="var(--color-pacientes)"
            fillOpacity={0.2}
            stroke="var(--color-pacientes)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </DashboardSectionCard>
  );
}

export { PatientsByMonthChartCard };
