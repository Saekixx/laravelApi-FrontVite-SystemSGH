import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { DashboardSectionCard } from "@/components/dashboard/DashboardCards";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { PacienteChartsData } from "@/types/paciente";

const bloodTypeChartConfig = {
  cantidad: {
    label: "Pacientes",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface GraficoAreasProps {
  title: string;
  description: string;
  data: PacienteChartsData[];
}

function GraficoAreas({ title, description, data }: GraficoAreasProps) {
  const chartData = useMemo(() => {
    const tipos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    return tipos.map((t) => ({
      tipo: t,
      cantidad: data.find((p) => p.tipo === t)?.cantidad || 0,
    }));
  }, [data]);

  return (
    <DashboardSectionCard title={title} description={description}>
      <ChartContainer config={bloodTypeChartConfig} className="h-72 w-full">
        <AreaChart
          data={chartData}
          margin={{ left: 12, right: 12, top: 20 }}
          accessibilityLayer
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
          <YAxis
            hide
            domain={[0, (dataMax: number) => (dataMax <= 1 ? 2 : dataMax + 1)]}
          />
          <XAxis
            dataKey="tipo"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Area
            dataKey="cantidad"
            type="monotone"
            fill="var(--color-cantidad)"
            fillOpacity={0.3}
            stroke="var(--color-cantidad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </DashboardSectionCard>
  );
}

export { GraficoAreas };
