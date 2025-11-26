import { NextResponse } from 'next/server'
import { addOrder, listOrders, OrderSchema } from '@/lib/crm'

export async function GET() {
  const res = await listOrders()
  if (!res.ok) return NextResponse.json({ error: res.error }, { status: 500 })
  return NextResponse.json(res.data)
}

export async function POST(req: Request) {
  const body = await req.json()
  try {
    const parsed = OrderSchema.parse(body)
    const res = await addOrder(parsed)
    if (!res.ok) return NextResponse.json({ error: res.error }, { status: 500 })
    return NextResponse.json({ id: res.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}

