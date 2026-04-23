import { FormPerfil } from "@/components/FormPerfil";
import { SideBar } from "@/components/SideBar";
import { useAuth } from "@/hooks/useAuth";

function PerfilPage() {
  const { profile, setProfile, obtenerProfile, estadoAuth, guardarProfile } =
    useAuth();
  return (
    <main className="h-screen bg-background p-4 sm:p-6">
      <div className="grid h-full w-full gap-6 lg:grid-cols-[16rem_1fr]">
        <SideBar className="max-w-none" />

        <section className="overflow-auto pr-1">
          <FormPerfil
            profile={profile}
            setProfile={setProfile}
            obtenerProfile={obtenerProfile}
            guardarProfile={(data) => guardarProfile(data).then(() => {})}
            userEmail={estadoAuth?.usuario?.email || ""}
          />
        </section>
      </div>
    </main>
  );
}

export default PerfilPage;
