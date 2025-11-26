export async function createBill({ amount, description, name, email, phone, redirectUrl, callbackUrl }: { amount: number; description: string; name?: string; email?: string; phone?: string; redirectUrl: string; callbackUrl: string }) {
  const apiKey = process.env.BILLPLZ_API_KEY
  const collectionId = process.env.BILLPLZ_COLLECTION_ID
  const sandbox = process.env.BILLPLZ_SANDBOX === 'true'
  if (!apiKey || !collectionId) return { ok: false, error: 'Billplz not configured' }
  const base = sandbox ? 'https://www.billplz-sandbox.com' : 'https://www.billplz.com'
  const res = await fetch(`${base}/api/v3/bills`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${Buffer.from(apiKey + ':' ).toString('base64')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      collection_id: collectionId,
      email,
      name,
      mobile: phone,
      amount: Math.round(amount * 100),
      description,
      callback_url: callbackUrl,
      redirect_url: redirectUrl,
      deliver: true,
      reference_1: description,
    })
  })
  if (!res.ok) return { ok: false, error: await res.text() }
  const json = await res.json()
  return { ok: true, url: json.url, id: json.id }
}

