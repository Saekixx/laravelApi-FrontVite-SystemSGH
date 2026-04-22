import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function FilterPacientes({
  busqueda,
  setBusqueda,
  filtroEstado,
  setFiltroEstado,
  filtroGenero,
  setFiltroGenero,
  columnasTodas,
  columnasVisibles,
  toggleColumna,
}: any) {
  return (
    <div className="flex flex-wrap gap-2 items-end mb-4">
      <Input
        placeholder="Buscar por DNI o nombre"
        className="w-64"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <Select value={filtroEstado} onValueChange={setFiltroEstado}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="activos">Activos</SelectItem>
          <SelectItem value="inactivos">Inactivos</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filtroGenero} onValueChange={setFiltroGenero}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Género" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos los géneros</SelectItem>
          <SelectItem value="Masculino">Masculino</SelectItem>
          <SelectItem value="Femenino">Femenino</SelectItem>
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Columnas</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {columnasTodas.map((col: any) => (
            <DropdownMenuCheckboxItem
              key={col.key}
              checked={columnasVisibles[col.key]}
              onCheckedChange={() => toggleColumna(col.key)}
            >
              {col.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
