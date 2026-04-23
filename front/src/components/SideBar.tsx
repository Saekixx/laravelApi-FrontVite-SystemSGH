import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

type SideBarProps = {
  name?: string;
  last_name?: string;
  userImageUrl?: string;
  className?: string;
};

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Perfil", to: "/perfil" },
  { label: "Pacientes", to: "/pacientes" },
];

const logoutItem = { label: "Cerrar sesión", to: "/logout" };

function buildInitials(name: string) {
  const words = name.trim().split(" ").filter(Boolean);
  if (words.length === 0) return "US";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

function SideBar({ className }: SideBarProps) {
  const { CerrarSesion, estadoAuth } = useAuth();
  const { usuario } = estadoAuth;
  const navigate = useNavigate();

  // Priorizamos los datos del contexto global
  const userName = usuario?.name || "Usuario";
  const userLastName = usuario?.last_name || "";

  // Usamos el avatar del contexto (que ya tiene la URL completa)
  const userAvatar = usuario?.avatar || "";

  const initials = buildInitials(userName);

  const handleLogout = async () => {
    await CerrarSesion();
    navigate("/login");
  };

  return (
    <aside className={cn("h-full w-full max-w-64", className)}>
      <Card className="h-full border-border/70 bg-card/95 py-0 shadow-lg shadow-foreground/5 backdrop-blur-sm">
        <CardContent className="flex h-full flex-col gap-6 p-4">
          <div className="flex flex-col items-center gap-3 border-b border-border/70 pb-5">
            <Avatar className="size-20 ring-2 ring-border/80">
              {/* AvatarImage ahora es reactivo al estado global */}
              <AvatarImage
                src={userAvatar}
                alt={userName}
                className="object-cover"
              />
              <AvatarFallback className="text-base font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-semibold text-foreground text-center">
              {userName} {userLastName}
            </p>
          </div>

          <nav className="grid gap-2" aria-label="Sidebar principal">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "text-muted-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button
            onClick={handleLogout}
            className={cn(
              "mt-auto rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-muted hover:text-foreground text-muted-foreground",
            )}
            variant="outline"
          >
            {logoutItem.label}
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}

export { SideBar };
