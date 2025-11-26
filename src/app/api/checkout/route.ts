import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createBill } from '@/lib/billplz'

export async function POST(req: Request) {
  const body = await req.json()
  const { plan, durationMonths, price, customerName, phone } = body
  const origin = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || ''
  const provider = process.env.PAYMENT_PROVIDER || 'billplz'
  if (provider === 'stripe') {
    const stripe = getStripe()
    if (!stripe) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: `${origin}/success`,
      cancel_url: `${origin}/pakej`,
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'myr', unit_amount: Math.round(price * 100), product_data: { name: `${plan} ${durationMonths}m` } }, quantity: 1 }],
      metadata: { plan, durationMonths: String(durationMonths), customerName: customerName || '', phone: phone || '' },
    })
    return NextResponse.json({ url: session.url })
  } else {
    const bill = await createBill({ amount: price, description: `${plan} ${durationMonths}m`, name: customerName, phone, redirectUrl: `${origin}/success`, callbackUrl: `${origin}/api/webhooks/billplz` })
    if (!bill.ok) return NextResponse.json({ error: bill.error }, { status: 500 })
    return NextResponse.json({ url: bill.url })
  }
}
