export type MemberType = "Invitado" | "Socio" | "Casual"
export type SubscriptionType = "Mensual" | "Anual"

export interface Client {
  id: number
  name: string
  email: string
  phone: string
  address: string
  memberType: MemberType
  subscriptionType: SubscriptionType | null
  registrationDate: string
  subscriptionExpiration: string | null
  created_at: string
}