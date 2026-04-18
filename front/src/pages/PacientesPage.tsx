import { PacientesTable } from "@/components/PacientesTable";
import { SideBar } from "@/components/SideBar";

function PacientesPage() {
  return (
    <main className="h-screen bg-background p-4 sm:p-6">
      <div className="grid h-full w-full gap-6 lg:grid-cols-[16rem_1fr]">
        <SideBar userName="Usuario" className="max-w-none" />

        <section className="space-y-4 overflow-auto pr-1">
          <header>
            <h1 className="text-2xl font-semibold text-foreground">
              Pacientes
            </h1>
            <p className="text-sm text-muted-foreground">
              Gestiona los registros y personaliza los campos que quieres ver.
            </p>
          </header>

          <PacientesTable />
        </section>
      </div>
    </main>
  );
}

export default PacientesPage;
