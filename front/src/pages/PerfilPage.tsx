import { FormPerfil } from "@/components/FormPerfil";
import { SideBar } from "@/components/SideBar";

function PerfilPage() {
  return (
    <main className="h-screen bg-background p-4 sm:p-6">
      <div className="grid h-full w-full gap-6 lg:grid-cols-[16rem_1fr]">
        <SideBar userName="Usuario" className="max-w-none" />

        <section className="overflow-auto pr-1">
          <FormPerfil />
        </section>
      </div>
    </main>
  );
}

export default PerfilPage;
