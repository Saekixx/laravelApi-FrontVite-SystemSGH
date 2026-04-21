import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DashboardMetricCardProps = {
  title: string;
  value: string;
  description?: string;
  trendLabel?: string;
  icon?: ReactNode;
};

function DashboardMetricCard({
  title,
  value,
  description,
  trendLabel,
  icon,
}: DashboardMetricCardProps) {
  return (
    <Card className="py-0">
      <CardHeader className="border-b border-border/70">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-sm text-muted-foreground">
            {title}
          </CardTitle>
          {icon ? <span className="text-muted-foreground">{icon}</span> : null}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pt-4">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {description ? (
          <CardDescription className="text-xs">{description}</CardDescription>
        ) : null}
        {trendLabel ? (
          <Badge variant="secondary" className="text-[11px]">
            {trendLabel}
          </Badge>
        ) : null}
      </CardContent>
    </Card>
  );
}

type DashboardSectionCardProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

function DashboardSectionCard({
  title,
  description,
  action,
  children,
}: DashboardSectionCardProps) {
  return (
    <Card className="py-0">
      <CardHeader className="border-b border-border/70">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            {description ? (
              <CardDescription>{description}</CardDescription>
            ) : null}
          </div>
          {action}
        </div>
      </CardHeader>
      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}

type DashboardAlertCardProps = {
  title: string;
  message: string;
  variant?: "default" | "destructive";
};

function DashboardAlertCard({
  title,
  message,
  variant = "default",
}: DashboardAlertCardProps) {
  return (
    <Card className="py-0">
      <CardHeader className="border-b border-border/70">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge
            variant={variant === "destructive" ? "destructive" : "outline"}
          >
            {variant === "destructive" ? "Importante" : "Info"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}

export { DashboardMetricCard, DashboardSectionCard, DashboardAlertCard };
