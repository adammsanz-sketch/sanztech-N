import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const contactInfo = [
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: 'Waktu Operasi',
    description: '9:00 AM - 12:00 AM (Setiap Hari)',
  },
  {
    icon: <Phone className="h-8 w-8 text-primary" />,
    title: 'Saluran Utama',
    description: 'WhatsApp untuk respons terpantas.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Jaminan Respons',
    description: 'Kami akan membalas mesej anda secepat mungkin.',
  },
];

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '601163969241';
  const message = encodeURIComponent("Salam, saya berminat untuk melanggan akaun Netflix.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
          Hubungi Kami
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Kami sedia membantu! Jangan ragu-ragu untuk menghubungi kami jika anda mempunyai sebarang pertanyaan.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-4 bg-primary/10 p-4 rounded-full">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-headline font-semibold">{info.title}</h3>
                  <p className="text-muted-foreground">{info.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center bg-muted p-8 rounded-lg">
              <h2 className="text-2xl font-bold font-headline mb-4">Cara Terpantas Untuk Berhubung</h2>
              <p className="text-muted-foreground mb-6">
                Klik butang di bawah untuk terus menghantar mesej kepada kami di WhatsApp.
              </p>
              <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg px-8 py-6">
                 <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-2 h-6 w-6">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.849 6.075l-1.267 4.625 4.755-1.248zM9.354 8.734c-.196-.297-.426-.389-.63-.398-.218-.012-.442-.014-.666-.014-.247 0-.646.089-.99.448-.344.359-.99.981-.99 2.386 0 1.406 1.015 2.768 1.15 2.941.135.174 2.012 3.238 4.935 4.354 2.922 1.116 2.922.753 3.45.727.528-.026 1.686-.687 1.92-1.336.234-.649.234-1.217.162-1.336-.072-.119-.247-.174-.528-.318s-1.686-.832-1.943-.923-.442-.14-.63.14-.732.923-.9.1116-.319-.174-.63-.344c-1.282-.663-2.125-1.159-2.227-1.373-.102-.213-.012-.318.089-.442.099-.121.223-.304.332-.448s.14-.223.223-.374c.081-.149.04-.284-.019-.398z"/>
                    </svg>
                    Hubungi di WhatsApp
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
