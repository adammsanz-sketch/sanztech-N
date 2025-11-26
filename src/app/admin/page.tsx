"use client"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Customer = { id?: string; name: string; phone: string; email?: string }
type Order = { id?: string; customerId: string; plan: string; durationMonths: number; price: number; status: string; createdAt?: string }

export default function AdminPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [form, setForm] = useState({ name: '', phone: '', plan: 'Basic', durationMonths: 1, price: 0 })
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const c = await fetch('/api/crm/customers').then(r => r.json())
    const o = await fetch('/api/crm/orders').then(r => r.json())
    if (!c.error) setCustomers(c)
    if (!o.error) setOrders(o)
  }

  useEffect(() => { fetchData() }, [])

  const submit = async () => {
    setLoading(true)
    const resC = await fetch('/api/crm/customers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: form.name, phone: form.phone }) })
    const cjson = await resC.json()
    if (cjson.id) {
      const payload = { customerId: cjson.id, plan: form.plan, durationMonths: form.durationMonths, price: form.price, status: 'pending' }
      await fetch('/api/crm/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      await fetchData()
      setForm({ name: '', phone: '', plan: 'Basic', durationMonths: 1, price: 0 })
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-headline font-bold mb-6">CRM Netflix</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Tambah Pesanan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nama</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama pelanggan" />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="60123456789" />
              </div>
              <div>
                <Label>Pelan</Label>
                <Select value={form.plan} onValueChange={v => setForm({ ...form, plan: v })}>
                  <SelectTrigger><SelectValue placeholder="Pilih pelan" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="4K">4K</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tempoh (bulan)</Label>
                <Input type="number" value={form.durationMonths} onChange={e => setForm({ ...form, durationMonths: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Harga (RM)</Label>
                <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: Number(e.target.value) })} />
              </div>
            </div>
            <Button onClick={submit} disabled={loading} className="w-full">Simpan</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Senarai Pesanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Nama</th>
                    <th className="p-2">Telefon</th>
                    <th className="p-2">Pelan</th>
                    <th className="p-2">Tempoh</th>
                    <th className="p-2">Harga</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => {
                    const c = customers.find(c => c.id === o.customerId)
                    return (
                      <tr key={o.id} className="border-t">
                        <td className="p-2">{c?.name}</td>
                        <td className="p-2">{c?.phone}</td>
                        <td className="p-2">{o.plan}</td>
                        <td className="p-2">{o.durationMonths}</td>
                        <td className="p-2">RM{o.price}</td>
                        <td className="p-2">{o.status}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

