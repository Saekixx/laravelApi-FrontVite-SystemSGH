import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DashboardSectionCard } from "@/components/dashboard/DashboardCards";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { PacienteChartsData } from "@/types/paciente";

const genderChartConfig = {
  cantidad: {
    label: "Pacientes",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

interface GraficoBarrasProps {
  title: string;
  description: string;
  data: PacienteChartsData[];
}

function GraficoBarras({ title, description, data }: GraficoBarrasProps) {
  const chartData = useMemo(() => {
    const generos = ["Masculino", "Femenino", "Otro"];

    return generos.map((g) => ({
      genero: g,
      cantidad: data.find((p) => p.genero === g)?.cantidad || 0,
    }));
  }, [data]);

  return (
    <DashboardSectionCard title={title} description={description}>
      <ChartContainer config={genderChartConfig} className="h-72 w-full">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 12, left: 12, bottom: 0 }}
          accessibilityLayer
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
          <XAxis
            dataKey="genero"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            content={<ChartTooltipContent />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="cantidad"
            fill="var(--color-cantidad)"
            radius={[4, 4, 0, 0]}
            barSize={60}
          />
        </BarChart>
      </ChartContainer>
    </DashboardSectionCard>
  );
}

export { GraficoBarras };
