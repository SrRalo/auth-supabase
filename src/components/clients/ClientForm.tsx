import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Client, createClient, updateClient, MemberType, SubscriptionType } from "@/lib/api/clients";
import { useEffect } from "react";

interface ClientFormProps {
  client?: Client | null;
  onSuccess: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberType: MemberType;
  subscriptionType?: SubscriptionType;
  registrationDate: string;
  subscriptionExpiration?: string;
}

const memberTypes: MemberType[] = ["Invitado", "Socio", "Casual"];
const subscriptionTypes: SubscriptionType[] = ["Mensual", "Anual"];

export function ClientForm({ client, onSuccess }: ClientFormProps) {
  const { register, handleSubmit, watch, setValue, control, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      name: client?.name || "",
      email: client?.email || "",
      phone: client?.phone || "",
      address: client?.address || "",
      memberType: client?.memberType || "Invitado",
      subscriptionType: client?.subscriptionType || undefined,
      registrationDate: client?.registrationDate ? new Date(client.registrationDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      subscriptionExpiration: client?.subscriptionExpiration ? new Date(client.subscriptionExpiration).toISOString().split('T')[0] : undefined,
    },
  });

  const memberType = watch("memberType");
  const subscriptionType = useWatch({
    control,
    name: "subscriptionType"
  });
  const registrationDate = useWatch({
    control,
    name: "registrationDate"
  });

  useEffect(() => {
    if (memberType === "Socio" && subscriptionType && registrationDate) {
      const startDate = new Date(registrationDate);
      const expirationDate = new Date(startDate);
      
      if (subscriptionType === "Mensual") {
        expirationDate.setMonth(expirationDate.getMonth() + 1);
      } else if (subscriptionType === "Anual") {
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }

      setValue("subscriptionExpiration", expirationDate.toISOString().split('T')[0]);
    }
  }, [memberType, subscriptionType, registrationDate, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const formattedData = {
        ...data,
        registrationDate: new Date(data.registrationDate).toISOString(),
        subscriptionType: data.memberType === "Socio" ? data.subscriptionType || "Mensual" : null,
        subscriptionExpiration: data.memberType === "Socio" && data.subscriptionExpiration 
          ? new Date(data.subscriptionExpiration).toISOString() 
          : null,
      };

      if (client) {
        await updateClient(client.id, formattedData);
      } else {
        await createClient(formattedData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving client:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          {...register("name", { required: "El nombre es requerido" })}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email inválido",
            },
          })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          {...register("phone", { required: "El teléfono es requerido" })}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Dirección</Label>
        <Input
          id="address"
          {...register("address", { required: "La dirección es requerida" })}
        />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="memberType">Tipo de Socio</Label>
        <select
          id="memberType"
          {...register("memberType", { required: "El tipo de socio es requerido" })}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {memberTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.memberType && (
          <p className="text-sm text-red-500">{errors.memberType.message}</p>
        )}
      </div>

      {memberType === "Socio" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="subscriptionType">Tipo de Suscripción</Label>
            <select
              id="subscriptionType"
              {...register("subscriptionType", { 
                required: "El tipo de suscripción es requerido para socios"
              })}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              {subscriptionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.subscriptionType && (
              <p className="text-sm text-red-500">{errors.subscriptionType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationDate">Fecha de Registro</Label>
            <Input
              id="registrationDate"
              type="date"
              {...register("registrationDate", { required: "La fecha de registro es requerida" })}
            />
            {errors.registrationDate && (
              <p className="text-sm text-red-500">{errors.registrationDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subscriptionExpiration">Fecha de Expiración de Suscripción</Label>
            <Input
              id="subscriptionExpiration"
              type="date"
              {...register("subscriptionExpiration", { 
                required: "La fecha de expiración es requerida para socios",
                validate: (value) => {
                  if (!value) return true;
                  return new Date(value) > new Date() || "La fecha de expiración debe ser futura";
                }
              })}
              readOnly
            />
            {errors.subscriptionExpiration && (
              <p className="text-sm text-red-500">{errors.subscriptionExpiration.message}</p>
            )}
          </div>
        </>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : client ? "Actualizar" : "Crear"}
        </Button>
      </div>
    </form>
  );
}