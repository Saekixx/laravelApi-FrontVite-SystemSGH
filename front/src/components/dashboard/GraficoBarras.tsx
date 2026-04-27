import { DashboardSectionCard } from "@/components/dashboard/DashboardCards";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { patientsByGender } from "@/components/dashboard/data/dashboardMockData";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const genderChartConfig = {
  cantidad: {
    label: "Pacientes",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface GraficoBarrasProps {
  title: string;
  description: string;
}

function GraficoBarras({ title, description }: GraficoBarrasProps) {
  return (
    <DashboardSectionCard title={title} description={description}>
      <ChartContainer config={genderChartConfig} className="h-72 w-full">
        <BarChart data={patientsByGender} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="genero"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="cantidad"
            radius={[8, 8, 0, 0]}
            fill="var(--color-cantidad)"
          />
        </BarChart>
      </ChartContainer>
    </DashboardSectionCard>
  );
}

export { GraficoBarras };
