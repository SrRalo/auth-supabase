import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Client, MemberType, SubscriptionType } from '@/types/client'
import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import { createClient, updateClient } from '../services/client.service'
import { MEMBERSHIP_TYPES, SUBSCRIPTION_TYPES } from '@/config/constants'

interface ClientFormProps {
  client?: Client | null
  onSuccess: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  memberType: MemberType
  subscriptionType?: SubscriptionType
  registrationDate: string
  subscriptionExpiration?: string
}

export function ClientForm({ client, onSuccess }: ClientFormProps) {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: client ? {
      ...client,
      registrationDate: client.registrationDate.split('T')[0],
      subscriptionExpiration: client.subscriptionExpiration?.split('T')[0]
    } : {
      registrationDate: new Date().toISOString().split('T')[0]
    }
  })

  const memberType = watch('memberType')

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      if (client) {
        await updateClient(client.id, data)
      } else {
        await createClient(data)
      }
      onSuccess()
    } catch (error: any) {
      console.error('Error:', error.message)
    } finally {
      setLoading(false)
    }
  }

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
          {...register("email", { required: "El email es requerido" })}
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
          {MEMBERSHIP_TYPES.map((type) => (
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
              {SUBSCRIPTION_TYPES.map((type) => (
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
            <Label htmlFor="subscriptionExpiration">Fecha de Vencimiento</Label>
            <Input
              id="subscriptionExpiration"
              type="date"
              {...register("subscriptionExpiration", {
                required: "La fecha de vencimiento es requerida para socios"
              })}
            />
            {errors.subscriptionExpiration && (
              <p className="text-sm text-red-500">{errors.subscriptionExpiration.message}</p>
            )}
          </div>
        </>
      )}

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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Guardando...' : client ? 'Actualizar' : 'Crear'}
      </Button>
    </form>
  )
}