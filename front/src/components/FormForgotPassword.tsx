import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

function FormForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { RecuperarPasswordEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await RecuperarPasswordEmail(email);
    setLoading(false);
    alert(
      "Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.",
    );
  };
  return (
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-chart-2/20 blur-3xl" />

      <Card className="relative z-10 w-full max-w-md border border-border/70 shadow-xl shadow-foreground/5 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Recuperar contraseña</CardTitle>
          <CardDescription>
            Ingresa tu correo y te enviaremos las instrucciones de recuperación.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="recover-email">Correo electrónico</Label>
              <Input
                id="recover-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="tuemail@ejemplo.com"
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full font-medium"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar enlace de recuperación"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              ¿Recordaste tu contraseña?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Volver al login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export { FormForgotPassword };
