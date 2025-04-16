import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { ClientDialog } from "./ClientDialog";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { Client, deleteClient, getClients } from "@/lib/api/clients";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ClientTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [columnSizes, setColumnSizes] = useState({
    name: 15,
    email: 20,
    phone: 12,
    address: 15,
    membershipInfo: 13,
    registrationDate: 12,
    subscriptionExpiration: 13,
    actions: 10
  });

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      console.error("Error loading clients:", error);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleDelete = async (client: Client) => {
    try {
      await deleteClient(client.id);
      await loadClients();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsEditDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getRemainingDays = (expirationDate: string) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const diffTime = expiration.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMembershipInfo = (client: Client) => {
    if (client.memberType === "Socio") {
      return `${client.memberType} - ${client.subscriptionType}`;
    }
    return client.memberType;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clientes</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>Agregar Cliente</Button>
      </div>

      <div className="rounded-md border">
        <div className="w-full overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="relative">
              <div className="sticky top-0 z-10 bg-background border-b">
                <ResizablePanelGroup direction="horizontal" className="w-full" onLayout={(sizes) => {
                  const [name, email, phone, address, membershipInfo, registrationDate, subscriptionExpiration, actions] = sizes;
                  setColumnSizes({
                    name: name || columnSizes.name,
                    email: email || columnSizes.email,
                    phone: phone || columnSizes.phone,
                    address: address || columnSizes.address,
                    membershipInfo: membershipInfo || columnSizes.membershipInfo,
                    registrationDate: registrationDate || columnSizes.registrationDate,
                    subscriptionExpiration: subscriptionExpiration || columnSizes.subscriptionExpiration,
                    actions: actions || columnSizes.actions
                  });
                }}>
                  <ResizablePanel defaultSize={columnSizes.name} minSize={15}>
                    <TableHead className="h-10">Nombre</TableHead>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={columnSizes.email} minSize={15}>
                    <TableHead className="h-10">Email</TableHead>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={columnSizes.phone} minSize={10}>
                    <TableHead className="h-10">Teléfono</TableHead>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={columnSizes.address} minSize={10}>
                    <TableHead className="h-10">Dirección</TableHead>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={columnSizes.membershipInfo} minSize={10}>
                    <TableHead className="h-10">Membresía</TableHead>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={columnSizes.registrationDate} minSize={10}>
                    <TableHead className="h-10">Fecha Registro</TableHead>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={columnSizes.subscriptionExpiration} minSize={10}>
                    <TableHead className="h-10">Vencimiento</TableHead>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={columnSizes.actions} minSize={10}>
                    <TableHead className="h-10 text-right">Acciones</TableHead>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>

              <div className="divide-y divide-border">
                {clients.map((client) => (
                  <div key={client.id} className="flex w-full hover:bg-muted/50">
                    <div style={{ width: `${columnSizes.name}%` }} className="p-2 truncate">
                      {client.name}
                    </div>
                    <div style={{ width: `${columnSizes.email}%` }} className="p-2 truncate">
                      {client.email}
                    </div>
                    <div style={{ width: `${columnSizes.phone}%` }} className="p-2 truncate">
                      {client.phone}
                    </div>
                    <div style={{ width: `${columnSizes.address}%` }} className="p-2 truncate">
                      {client.address}
                    </div>
                    <div style={{ width: `${columnSizes.membershipInfo}%` }} className="p-2 truncate">
                      {getMembershipInfo(client)}
                    </div>
                    <div style={{ width: `${columnSizes.registrationDate}%` }} className="p-2 truncate">
                      {formatDate(client.registrationDate)}
                    </div>
                    <div style={{ width: `${columnSizes.subscriptionExpiration}%` }} className="p-2 truncate">
                      {client.subscriptionExpiration ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">
                                {formatDate(client.subscriptionExpiration)}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              {getRemainingDays(client.subscriptionExpiration)} días restantes
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div style={{ width: `${columnSizes.actions}%` }} className="p-2 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(client)}
                        title="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => {
                          setSelectedClient(client);
                          setIsDeleteDialogOpen(true);
                        }}
                        title="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSuccess={loadClients}
      />

      <ClientDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        client={selectedClient}
        onSuccess={loadClients}
      />

      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => selectedClient && handleDelete(selectedClient)}
      />
    </div>
  );
}