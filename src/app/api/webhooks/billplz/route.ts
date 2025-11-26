import { NextResponse } from 'next/server'
import { addOrder } from '@/lib/crm'
import crypto from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function verifySignature(body: string, headerSig: string | null, secret: string | undefined) {
  if (!secret || !headerSig) return true
  try {
    const h = crypto.createHmac('sha256', secret).update(body).digest('hex')
    return h === headerSig
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  const text = await req.text()
  const sig = req.headers.get('x-signature')
  const ok = verifySignature(text, sig, process.env.BILLPLZ_X_SIGNATURE_KEY)
  if (!ok) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

  let paid = false
  let amount = 0
  let description = ''
  try {
    const ct = req.headers.get('content-type') || ''
    if (ct.includes('application/json')) {
      const j = JSON.parse(text)
      paid = String(j.paid).toLowerCase() === 'true' || j.paid === 1
      amount = Number(j.amount || 0) / 100
      description = j.description || ''
    } else {
      const p = new URLSearchParams(text)
      paid = (p.get('paid') || '').toLowerCase() === 'true' || p.get('paid') === '1'
      amount = Number(p.get('amount') || '0') / 100
      description = p.get('description') || ''
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }

  if (paid) {
    const parts = (description || '').split(' ')
    const plan = parts[0] || 'Netflix'
    const durationMonths = Number((parts[1] || '1').replace(/[^0-9]/g, '')) || 1
    const res = await addOrder({ customerId: '', plan, durationMonths, price: amount, status: 'active' })
    if (!res.ok) return NextResponse.json({ error: res.error }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

