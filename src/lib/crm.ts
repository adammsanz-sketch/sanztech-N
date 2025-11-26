import { z } from 'zod'
import * as firestore from 'firebase/firestore'
import { getDb } from './firebase'

export const CustomerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  phone: z.string().min(8),
  email: z.string().email().optional(),
  notes: z.string().optional(),
  createdAt: z.string().optional(),
})

export const OrderSchema = z.object({
  id: z.string().optional(),
  customerId: z.string().min(1),
  plan: z.string().min(1),
  durationMonths: z.number().min(1),
  price: z.number().min(0),
  status: z.enum(['pending','active','expired','cancelled']).default('pending'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  createdAt: z.string().optional(),
})

export async function listCustomers() {
  const db = getDb()
  if (!db) return { ok: false, data: [], error: 'Firebase not configured' }
  const snap = await (firestore as any).getDocs((firestore as any).query((firestore as any).collection(db,'customers'), (firestore as any).orderBy('createdAt','desc')))
  const data = snap.docs.map((d: any) => ({ id: d.id, ...(d.data() as any) }))
  return { ok: true, data }
}

export async function addCustomer(input: z.infer<typeof CustomerSchema>) {
  const db = getDb()
  if (!db) return { ok: false, error: 'Firebase not configured' }
  const parsed = CustomerSchema.omit({ id: true, createdAt: true }).parse(input)
  const ref = await (firestore as any).addDoc((firestore as any).collection(db,'customers'), { ...parsed, createdAt: (firestore as any).serverTimestamp() })
  return { ok: true, id: ref.id }
}

export async function listOrders() {
  const db = getDb()
  if (!db) return { ok: false, data: [], error: 'Firebase not configured' }
  const snap = await (firestore as any).getDocs((firestore as any).query((firestore as any).collection(db,'orders'), (firestore as any).orderBy('createdAt','desc')))
  const data = snap.docs.map((d: any) => ({ id: d.id, ...(d.data() as any) }))
  return { ok: true, data }
}

export async function addOrder(input: z.infer<typeof OrderSchema>) {
  const db = getDb()
  if (!db) return { ok: false, error: 'Firebase not configured' }
  const parsed = OrderSchema.omit({ id: true, createdAt: true }).parse(input)
  const ref = await (firestore as any).addDoc((firestore as any).collection(db,'orders'), { ...parsed, createdAt: (firestore as any).serverTimestamp() })
  return { ok: true, id: ref.id }
}

export async function updateOrderStatus(id: string, status: 'pending'|'active'|'expired'|'cancelled') {
  const db = getDb()
  if (!db) return { ok: false, error: 'Firebase not configured' }
  await (firestore as any).updateDoc((firestore as any).doc(db,'orders',id), { status })
  return { ok: true }
}
