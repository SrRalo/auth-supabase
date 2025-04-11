import { useState } from "react";
import { Client, createClient, updateClient } from "@/lib/api/clients";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ClientForm } from "./ClientForm";

interface Props {
  trigger: React.ReactNode;
  client?: Client;
  onSuccess?: () => void;
}

export function ClientDialog({ trigger, client, onSuccess }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Omit<Client, "id" | "created_at">) => {
    setIsLoading(true);
    try {
      if (client) {
        await updateClient(client.id, data);
      } else {
        await createClient(data);
      }
      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error saving client:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <div className="px-6">
          <SheetHeader>
            <SheetTitle>{client ? "Editar" : "Nuevo"} Cliente</SheetTitle>
            <SheetDescription>
              {client
                ? "Modifica los datos del cliente"
                : "Completa los datos para crear un nuevo cliente"}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <ClientForm
              onSubmit={handleSubmit}
              initialData={client}
              isLoading={isLoading}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}