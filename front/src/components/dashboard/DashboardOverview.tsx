import {
  DashboardMetricCard,
  DashboardSectionCard,
} from "@/components/dashboard/DashboardCards";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const patientsByMonth = [
  { month: "Ene", pacientes: 18 },
  { month: "Feb", pacientes: 24 },
  { month: "Mar", pacientes: 21 },
  { month: "Abr", pacientes: 29 },
  { month: "May", pacientes: 31 },
  { month: "Jun", pacientes: 36 },
];

const patientsByGender = [
  { genero: "Masculino", cantidad: 54 },
  { genero: "Femenino", cantidad: 63 },
  { genero: "Otro", cantidad: 9 },
];

const monthlyChartConfig = {
  pacientes: {
    label: "Pacientes",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const genderChartConfig = {
  cantidad: {
    label: "Pacientes",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const totalPatients = patientsByGender.reduce(
  (total, row) => total + row.cantidad,
  0,
);

function DashboardOverview() {
  return (
    <section className="space-y-6 overflow-auto pr-1">
      <header>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Resumen general de los pacientes registrados.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardMetricCard
          title="Pacientes totales"
          value={totalPatients.toString()}
          description="Registros acumulados"
          trendLabel="+12% vs mes anterior"
        />
        <DashboardMetricCard
          title="Pacientes activos"
          value="112"
          description="Con estado activo"
        />
        <DashboardMetricCard
          title="Nuevos este mes"
          value="36"
          description="Ingresos en junio"
        />
        <DashboardMetricCard
          title="Edad promedio"
          value="34.8"
          description="Años"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
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

        <DashboardSectionCard
          title="Distribución por género"
          description="Composición actual de pacientes"
        >
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
      </section>
    </section>
  );
}

export { DashboardOverview };
