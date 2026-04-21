import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

function FormLogin() {
  const { IniciarSesion, GoogleLogin, estadoAuth, limpiarError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    limpiarError();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const result = await IniciarSesion({ email, password });
    setLoading(false);
    if (result?.ok) {
      navigate("/dashboard");
    }
  };

  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      {/* Fondos decorativos, sin pointer-events en el contenido */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-chart-2/20 blur-3xl" />

      {/* El Card y su contenido NO están dentro de pointer-events-none */}
      <Card className="relative z-10 w-full max-w-md border border-border/70 shadow-xl shadow-foreground/5 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <p className="text-xs font-semibold tracking-[0.28em] text-muted-foreground uppercase">
            Bienvenido
          </p>
          <CardTitle className="text-2xl">Inicia sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="tuemail@ejemplo.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full font-medium"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </Button>

            {estadoAuth.error && (
              <p className="text-center text-sm text-destructive">
                {estadoAuth.error}
              </p>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  o continúa con
                </span>
              </div>
            </div>

            <button
              type="button"
              id="google-login"
              className="btn-google flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
              onClick={GoogleLogin}
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                className="h-4 w-4"
              />
              Continuar con Google
            </button>

            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Regístrate
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export { FormLogin };
