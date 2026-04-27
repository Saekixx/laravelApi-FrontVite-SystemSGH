import { DashboardSectionCard } from "@/components/dashboard/DashboardCards";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { patientsByBloodType } from "@/components/dashboard/data/dashboardMockData";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const bloodTypeChartConfig = {
  cantidad: {
    label: "Pacientes",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface GraficoAreasProps {
  title: string;
  description: string;
}

function GraficoAreas({ title, description }: GraficoAreasProps) {
  return (
    <DashboardSectionCard title={title} description={description}>
      <ChartContainer config={bloodTypeChartConfig} className="h-72 w-full">
        <AreaChart data={patientsByBloodType} accessibilityLayer>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="tipo"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="cantidad"
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

export { GraficoAreas };
