import { SideBar } from "@/components/SideBar";
import { DashboardStatsCards } from "@/components/dashboard/DashboardStatsCards";
import { PatientsByMonthChartCard } from "@/components/dashboard/PatientsByMonthChartCard";
import { PatientsByGenderChartCard } from "@/components/dashboard/PatientsByGenderChartCard";

function DashboardPage() {
  return (
    <main className="h-screen bg-background p-4 sm:p-6">
      <div className="grid h-full w-full gap-6 lg:grid-cols-[16rem_1fr]">
        <SideBar userName="Usuario" className="max-w-none" />

        <section className="space-y-6 overflow-auto pr-1">
          <header>
            <h1 className="text-2xl font-semibold text-foreground">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Resumen general de los pacientes registrados.
            </p>
          </header>

          <DashboardStatsCards />

          <section className="grid gap-6 xl:grid-cols-2">
            <PatientsByMonthChartCard />
            <PatientsByGenderChartCard />
          </section>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
