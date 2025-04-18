import { Card } from '@/shared/components/ui/card'

export default function Dashboard() {
  return (
    <div className="container space-y-4 p-8">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold">100</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-3xl font-bold">80</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-3xl font-bold">$1,234</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Growth</h2>
          <p className="text-3xl font-bold">12%</p>
        </Card>
      </div>
    </div>
  )
}