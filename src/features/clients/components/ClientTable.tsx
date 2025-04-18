import { useEffect, useState } from "react"
import { Button, TableHead, ResizablePanelGroup, ResizablePanel, ResizableHandle, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui"
import { Pencil, Trash2 } from "lucide-react"
import { ClientDialog } from "./ClientDialog"
import { DeleteConfirmationDialog } from "@/shared/components/dialogs/DeleteConfirmationDialog"
import { Client } from "@/types/client"
import { getClients, deleteClient } from "../services/client.service"
import { formatDate } from "@/shared/utils/general"

interface ColumnSizes {
  name: number
  email: number
  phone: number
  address: number
  membershipInfo: number
  registrationDate: number
  subscriptionExpiration: number
  actions: number
}

export default function ClientTable() {
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [columnSizes, setColumnSizes] = useState<ColumnSizes>({
    name: 20,
    email: 20,
    phone: 15,
    address: 15,
    membershipInfo: 10,
    registrationDate: 10,
    subscriptionExpiration: 10,
    actions: 10,
  })

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      const data = await getClients()
      setClients(data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteClient(id)
      await loadClients()
      setIsDeleteDialogOpen(false)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const getMembershipInfo = (client: Client) => {
    return `${client.memberType}${client.subscriptionType ? ` - ${client.subscriptionType}` : ''}`
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="flex-1 space-y-8">
      <div className="p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>Agregar Cliente</Button>
        </div>

        <div className="rounded-md border mt-8">
          <div className="w-full overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="relative">
                <div className="sticky top-0 z-10 bg-background border-b">
                  <ResizablePanelGroup 
                    direction="horizontal" 
                    className="w-full" 
                    onLayout={(sizes: number[]) => {
                      const [name, email, phone, address, membershipInfo, registrationDate, subscriptionExpiration, actions] = sizes
                      setColumnSizes({
                        name: name || columnSizes.name,
                        email: email || columnSizes.email,
                        phone: phone || columnSizes.phone,
                        address: address || columnSizes.address,
                        membershipInfo: membershipInfo || columnSizes.membershipInfo,
                        registrationDate: registrationDate || columnSizes.registrationDate,
                        subscriptionExpiration: subscriptionExpiration || columnSizes.subscriptionExpiration,
                        actions: actions || columnSizes.actions
                      })
                    }}
                  >
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
                        {formatDate(client.subscriptionExpiration)}
                      </div>
                      <div style={{ width: `${columnSizes.actions}%` }} className="p-2 text-right space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedClient(client)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Editar cliente</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Editar cliente</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedClient(client)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar cliente</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Eliminar cliente</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ClientDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        client={null}
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
        onConfirm={() => selectedClient && handleDelete(selectedClient.id)}
        title="Eliminar Cliente"
        description="¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer."
      />
    </div>
  )
}