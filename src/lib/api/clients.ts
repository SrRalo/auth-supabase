// Mock data for clients
export type MemberType = "Invitado" | "Socio" | "Casual";
export type SubscriptionType = "Mensual" | "Anual";

export type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  memberType: MemberType;
  subscriptionType: SubscriptionType | null;
  registrationDate: string;
  subscriptionExpiration: string | null;
  created_at: string;
};

const mockClients: Client[] = [
  {
    id: 1,
    name: "Cliente Ejemplo 1",
    email: "cliente1@ejemplo.com",
    phone: "123-456-7890",
    address: "Calle Principal 123",
    memberType: "Socio" as MemberType,
    subscriptionType: "Mensual" as SubscriptionType,
    registrationDate: "2024-01-15T00:00:00.000Z",
    subscriptionExpiration: "2025-01-15T00:00:00.000Z",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Cliente Ejemplo 2",
    email: "cliente2@ejemplo.com",
    phone: "098-765-4321",
    address: "Avenida Secundaria 456",
    memberType: "Invitado" as MemberType,
    subscriptionType: null,
    registrationDate: "2024-02-20T00:00:00.000Z",
    subscriptionExpiration: null,
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "Cliente Ejemplo 3",
    email: "cliente3@ejemplo.com",
    phone: "555-555-5555",
    address: "Plaza Central 789",
    memberType: "Casual" as MemberType,
    subscriptionType: null,
    registrationDate: "2024-03-10T00:00:00.000Z",
    subscriptionExpiration: null,
    created_at: new Date().toISOString()
  }
];

export const getClients = async (): Promise<Client[]> => {
  return mockClients;
};

export const createClient = async (client: Omit<Client, "id" | "created_at">): Promise<Client> => {
  const newClient = {
    ...client,
    id: mockClients.length + 1,
    created_at: new Date().toISOString()
  };
  mockClients.push(newClient);
  return newClient;
};

export const updateClient = async (id: number, client: Partial<Client>): Promise<Client> => {
  const index = mockClients.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error("Cliente no encontrado");
  }
  
  mockClients[index] = {
    ...mockClients[index],
    ...client
  };
  return mockClients[index];
};

export const deleteClient = async (id: number): Promise<void> => {
  const index = mockClients.findIndex(c => c.id === id);
  if (index === -1) {
    throw new Error("Cliente no encontrado");
  }
  mockClients.splice(index, 1);
};