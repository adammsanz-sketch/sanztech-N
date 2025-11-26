import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { paymentMethods } from '@/data/payment-methods';
import { BadgeCheck, Banknote, BotMessageSquare, FileCheck, Landmark, ScanLine, Smartphone, Wallet } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const steps = [
  { icon: <BadgeCheck className="h-8 w-8 text-primary" />, text: 'Pilih pakej langganan yang anda inginkan.' },
  { icon: <Banknote className="h-8 w-8 text-primary" />, text: 'Buat pembayaran melalui Bank Transfer atau E-wallet.' },
  { icon: <Smartphone className="h-8 w-8 text-primary" />, text: 'WhatsApp screenshot bukti bayaran kepada kami.' },
  { icon: <FileCheck className="h-8 w-8 text-primary" />, text: 'Terima butiran akaun dalam masa 1-2 jam.' },
  { icon: <BotMessageSquare className="h-8 w-8 text-primary" />, text: 'Nikmati kandungan premium tanpa had!' },
];

export default function HowToOrderPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '601163969241';
  const message = encodeURIComponent("Salam, saya ingin bertanya tentang kaedah pembayaran.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
  

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
          Cara Melanggan
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ikuti langkah-langkah mudah di bawah untuk memulakan langganan anda hari ini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-headline font-bold mb-6">Langkah-langkah Order</h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                  {step.icon}
                </div>
                <p className="text-lg">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-headline font-bold mb-6">Kaedah Pembayaran</h2>
          <div className="space-y-8">
            {paymentMethods.map((category, index) => (
              <Card key={index} className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-6 w-6 text-accent" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                    {category.methods.map((method, i) => {
                      const ask = encodeURIComponent(`Salam, saya nak tanya tentang kaedah pembayaran: ${category.title} - ${method}.`)
                      const askLink = `https://wa.me/${whatsappNumber}?text=${ask}`
                      return (
                        <li key={i}>
                          <Link href={askLink} target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                            {method}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  {category.title === 'Bank Transfer' && (
                     <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-semibold">Butiran Bank:</p>
                        <p className="text-sm">Nama Bank: <strong>Maybank</strong></p>
                        <p className="text-sm">Nama Akaun: <strong>sanztech</strong></p>
                        <p className="text-sm">No. Akaun: <strong>56210162XXXX</strong></p>
                     </div>
                  )}
                  {category.title === 'E-Wallet' && (
                     <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="font-semibold">Pembayaran melalui WhatsApp:</p>
                        <p className="text-sm mb-4">Tekan butang di bawah dan ikut arahan untuk membuat pembayaran.</p>
                        <Button asChild className="w-full">
                          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">Terus WhatsApp Untuk Order</Link>
                        </Button>
                     </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-16 bg-card p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-headline font-bold mb-4">Ada Pertanyaan Tentang Pembayaran?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Klik butang di bawah untuk bertanya apa-apa mengenai kaedah pembayaran terus melalui WhatsApp.
        </p>
        <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg px-8 py-6">
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-6 w-6">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.849 6.075l-1.267 4.625 4.755-1.248zM9.354 8.734c-.196-.297-.426-.389-.63-.398-.218-.012-.442-.014-.666-.014-.247 0-.646.089-.99.448-.344.359-.99.981-.99 2.386 0 1.406 1.015 2.768 1.15 2.941.135.174 2.012 3.238 4.935 4.354 2.922 1.116 2.922.753 3.45.727.528-.026 1.686-.687 1.92-1.336.234-.649.234-1.217.162-1.336-.072-.119-.247-.174-.528-.318s-1.686-.832-1.943-.923-.442-.14-.63.14-.732.923-.9.1116-.319-.174-.63-.344c-1.282-.663-2.125-1.159-2.227-1.373-.102-.213-.012-.318.089-.442.099-.121.223-.304.332-.448s.14-.223.223-.374c.081-.149.04-.284-.019-.398z"/>
            </svg>
            Tanya Di WhatsApp
          </Link>
        </Button>
      </div>
    </div>
  );
}
