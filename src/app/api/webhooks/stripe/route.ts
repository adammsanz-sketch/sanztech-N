import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { updateOrderStatus, addOrder } from '@/lib/crm'
import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const stripe = getStripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripe || !secret) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  const sig = req.headers.get('stripe-signature') || ''
  const raw = await req.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const md = session.metadata || {}
    const plan = md.plan || ''
    const duration = Number(md.durationMonths || '1')
    const price = (session.amount_total || 0) / 100
    const name = md.customerName || ''
    const phone = md.phone || ''
    const res = await addOrder({ customerId: '', plan, durationMonths: duration, price, status: 'active' })
    if (!res.ok) return NextResponse.json({ error: res.error }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
