import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Edit2, Plus, Trash2 } from "lucide-react";
import { Client, deleteClient, getClients } from "@/lib/api/clients";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { ClientDialog } from "./ClientDialog";

export function ClientTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [deletingClient, setDeletingClient] = useState<string | null>(null);
  
  const queryClient = useQueryClient();

  // Fetch clients with search term
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["clients", debouncedSearch],
    queryFn: () => getClients(debouncedSearch),
  });

  const handleDelete = async (clientId: string) => {
    setDeletingClient(clientId);
    try {
      await deleteClient(clientId);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    } finally {
      setDeletingClient(null);
    }
  };

  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["clients"] });
  };

  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Teléfono",
      cell: ({ row }) => row.getValue("phone") || "N/A"
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Fecha de creación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleDateString()
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const client = row.original;

        return (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ClientDialog
                    client={client}
                    onSuccess={refreshData}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                      >
                        <Edit2 className="size-4" />
                        <span className="sr-only">Editar cliente</span>
                      </Button>
                    }
                  />
                </TooltipTrigger>
                <TooltipContent>Editar cliente</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <DeleteConfirmationDialog
                    onConfirm={() => handleDelete(client.id)}
                    loading={deletingClient === client.id}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                        <span className="sr-only">Eliminar cliente</span>
                      </Button>
                    }
                  />
                </TooltipTrigger>
                <TooltipContent>Eliminar cliente</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: clients,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
        <Input
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-sm"
        />
        <ClientDialog
          onSuccess={refreshData}
          trigger={
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Cliente
            </Button>
          }
        />
      </div>

      <div className="rounded-md border w-full overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap px-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? "Cargando..." : "No se encontraron clientes"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} cliente(s) encontrado(s)
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}