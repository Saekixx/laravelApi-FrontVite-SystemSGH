import { SideBar } from "@/components/SideBar";
import { DashboardMetricCard } from "@/components/dashboard/DashboardCards";
import { GraficoAreas } from "@/components/dashboard/GraficoAreas";
import { GraficoBarras } from "@/components/dashboard/GraficoBarras";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePaciente } from "@/hooks/usePaciente";

function DashboardPage() {
  const { cargarPerfilCompleto } = useAuth();
  const {
    onCardsData,
    onChartSangreData,
    onChartGeneroData,
    totalPacientes,
    pacientesActivos,
    pacientesInactivos,
    pacientesEdadPromedio,
    pacientesPorGenero,
    pacientesPorTipoSangre,
  } = usePaciente();

  useEffect(() => {
    // Usamos un flag para evitar doble ejecución en StrictMode
    let mounted = true;

    const cargarTodo = async () => {
      try {
        // Ejecutamos las cargas. No usamos await en cascada para que sea más rápido
        if (mounted) {
          cargarPerfilCompleto();
          onCardsData();
          onChartSangreData();
          onChartGeneroData();
        }
      } catch (error) {
        console.error("Error cargando el dashboard:", error);
      }
    };

    cargarTodo();

    return () => {
      mounted = false;
    };
  }, []); // ARRAY VACÍO: Esto asegura que solo cargue UNA vez al entrar.

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

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <DashboardMetricCard
              title="Total de Pacientes"
              value={String(totalPacientes)}
              description="..."
            />
            <DashboardMetricCard
              title="Pacientes Activos"
              value={String(pacientesActivos)}
              description="..."
            />
            <DashboardMetricCard
              title="Pacientes Inactivos"
              value={String(pacientesInactivos)}
              description="..."
            />
            <DashboardMetricCard
              title="Edad Promedio"
              value={String(pacientesEdadPromedio)}
              description="..."
            />
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <GraficoAreas
              title="Tipo de Sangre"
              description="Distribución por grupo sanguíneo"
              data={pacientesPorTipoSangre}
            />
            <GraficoBarras
              title="Distribución por Género"
              description="Pacientes por género"
              data={pacientesPorGenero}
            />
          </section>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
