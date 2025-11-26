export async function createToyyibBill(params: {
  apiKey: string
  categoryCode: string
  name: string
  description: string
  amount: number
  returnUrl: string
  callbackUrl: string
  email?: string
  phone?: string
}) {
  const form = new URLSearchParams()
  form.append('userSecretKey', params.apiKey)
  form.append('categoryCode', params.categoryCode)
  form.append('billName', params.name)
  form.append('billDescription', params.description)
  form.append('billAmount', String(Math.round(params.amount * 100)))
  form.append('billReturnUrl', params.returnUrl)
  form.append('billCallbackUrl', params.callbackUrl)
  if (params.email) form.append('billEmail', params.email)
  if (params.phone) form.append('billPhone', params.phone)

  const res = await fetch('https://toyyibpay.com/index.php/api/createBill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  })
  const json = await res.json()
  if (Array.isArray(json) && json[0]?.BillCode) {
    const billCode = json[0].BillCode as string
    return { ok: true, url: `https://toyyibpay.com/${billCode}` }
  }
  return { ok: false, error: 'Failed to create bill' }
}

