"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { packages } from '@/data/packages';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PackagesPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '601163969241';
  const qrSrc = process.env.NEXT_PUBLIC_TNG_QR_SRC || '/tng-qr.png';
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
          Pakej Langganan Kami
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Pilih pakej yang paling sesuai dengan bajet anda. Lebih lama anda melanggan, lebih banyak anda jimat!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        {packages.map((pkg) => {
          const message = encodeURIComponent(`Salam, saya berminat untuk melanggan akaun Netflix (${pkg.name}).`);
          const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
          const pay = async () => {
            const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan: pkg.name, durationMonths: Number(pkg.duration.replace(/[^0-9]/g,'')) || 1, price: pkg.price, customerName: '', phone: '' }) })
            const j = await res.json()
            if (j.url) window.location.href = j.url
          }

          return (
            <Card
              key={pkg.id}
              className={`flex flex-col rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 ${
                pkg.highlight ? 'border-primary border-2 relative' : 'border-border'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute -top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {pkg.badge || 'Popular'}
                </div>
              )}
              <CardHeader className="items-center text-center">
                <span className="text-4xl mb-2">{pkg.icon}</span>
                <CardTitle className="text-2xl font-headline">{pkg.name}</CardTitle>
                {pkg.badge && !pkg.highlight && (
                  <CardDescription className="font-bold text-accent">{pkg.badge}</CardDescription>
                )}
                <div className="text-4xl font-bold py-2 text-primary">
                  RM{pkg.price}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    {pkg.duration}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Akses semua kandungan
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Sokongan penuh
                  </li>
                   <li className="flex items-center font-semibold">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    {pkg.savings}
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="grid grid-cols-3 gap-2">
                <Button onClick={pay} className="w-full font-bold" variant={pkg.highlight ? 'default' : 'secondary'}>
                  Bayar Online
                </Button>
                <Button asChild className="w-full font-bold" variant={'secondary'}>
                  <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">WhatsApp</Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full font-bold" variant={'outline'}>TNG QR</Button>
                  </DialogTrigger>
                  <DialogContent aria-label="Pembayaran TNG QR">
                    <DialogHeader>
                      <DialogTitle>Pembayaran Touch 'n Go eWallet</DialogTitle>
                      <DialogDescription>Imbas QR di bawah dan hantar resit melalui WhatsApp untuk pengesahan segera.</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center py-4">
                      {/* unoptimized di cara-order, di sini gunakan img biasa */}
                      <img src={qrSrc} alt="TNG QR Code" width={250} height={250} className="rounded-lg" />
                    </div>
                    <p className="text-center text-sm">Penerima: <strong>MOHD ZULFADLI BIN ZULKEPLI</strong></p>
                    <div className="pt-4">
                      <Button asChild className="w-full">
                        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">Hantar Resit melalui WhatsApp</Link>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
