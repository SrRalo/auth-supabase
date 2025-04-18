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
    memberType: "Socio",
    subscriptionType: "Mensual",
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
    memberType: "Invitado",
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
    memberType: "Casual",
    subscriptionType: null,
    registrationDate: "2024-03-10T00:00:00.000Z",
    subscriptionExpiration: null,
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "María García",
    email: "maria.garcia@ejemplo.com",
    phone: "654-789-0123",
    address: "Paseo del Mar 234",
    memberType: "Socio",
    subscriptionType: "Anual",
    registrationDate: "2024-01-05T00:00:00.000Z",
    subscriptionExpiration: "2025-01-05T00:00:00.000Z",
    created_at: new Date().toISOString()
  },
  {
    id: 5,
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    phone: "789-012-3456",
    address: "Avenida del Sol 567",
    memberType: "Casual",
    subscriptionType: "Mensual",
    registrationDate: "2024-02-15T00:00:00.000Z",
    subscriptionExpiration: "2024-03-15T00:00:00.000Z",
    created_at: new Date().toISOString()
  },
  {
    id: 6,
    name: "Ana Martínez",
    email: "ana.martinez@ejemplo.com",
    phone: "321-654-9870",
    address: "Calle de la Luna 890",
    memberType: "Socio",
    subscriptionType: "Mensual",
    registrationDate: "2024-03-01T00:00:00.000Z",
    subscriptionExpiration: "2024-04-01T00:00:00.000Z",
    created_at: new Date().toISOString()
  },
  {
    id: 7,
    name: "Carlos López",
    email: "carlos.lopez@ejemplo.com",
    phone: "147-258-3690",
    address: "Ruta del Bosque 123",
    memberType: "Invitado",
    subscriptionType: null,
    registrationDate: "2024-03-20T00:00:00.000Z",
    subscriptionExpiration: null,
    created_at: new Date().toISOString()
  },
  {
    id: 8,
    name: "Laura Sánchez",
    email: "laura.sanchez@ejemplo.com",
    phone: "369-852-1470",
    address: "Camino Real 456",
    memberType: "Casual",
    subscriptionType: null,
    registrationDate: "2024-02-28T00:00:00.000Z",
    subscriptionExpiration: null,
    created_at: new Date().toISOString()
  },
  {
    id: 9,
    name: "Roberto Torres",
    email: "roberto.torres@ejemplo.com",
    phone: "963-741-8520",
    address: "Avenida Principal 789",
    memberType: "Socio",
    subscriptionType: "Anual",
    registrationDate: "2024-01-10T00:00:00.000Z",
    subscriptionExpiration: "2025-01-10T00:00:00.000Z",
    created_at: new Date().toISOString()
  },
  {
    id: 10,
    name: "Patricia Ruiz",
    email: "patricia.ruiz@ejemplo.com",
    phone: "852-963-7410",
    address: "Plaza Mayor 012",
    memberType: "Casual",
    subscriptionType: "Mensual",
    registrationDate: "2024-03-15T00:00:00.000Z",
    subscriptionExpiration: "2024-04-15T00:00:00.000Z",
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