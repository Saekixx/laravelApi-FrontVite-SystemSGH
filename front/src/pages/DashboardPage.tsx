import { SideBar } from "@/components/SideBar";
import { DashboardStatsCards } from "@/components/dashboard/DashboardStatsCards";
import { GraficoAreas } from "@/components/dashboard/GraficoAreas";
import { GraficoBarras } from "@/components/dashboard/GraficoBarras";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

function DashboardPage() {
  const { cargarPerfilCompleto } = useAuth();

  useEffect(() => {
    cargarPerfilCompleto();
  }, [cargarPerfilCompleto]);

  return (
    <main className="h-screen bg-background p-4 sm:p-6">
      <div className="grid h-full w-full gap-6 lg:grid-cols-[16rem_1fr]">
        <SideBar className="max-w-none" />

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
            <GraficoAreas
              title="Tipo de Sangre"
              description="Composición actual de pacientes por tipo de sangre"
            />
            <GraficoBarras
              title="Distribución por Genero"
              description="Composición actual de pacientes por género"
            />
          </section>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
