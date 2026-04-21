import { DashboardMetricCard } from "@/components/dashboard/DashboardCards";
import { totalPatients } from "@/components/dashboard/data/dashboardMockData";

function DashboardStatsCards() {
  return (
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
  );
}

export { DashboardStatsCards };
