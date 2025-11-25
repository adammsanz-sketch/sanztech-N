import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BadgeCheck, ShieldCheck, Star, ThumbsUp } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { testimonials } from '@/data/testimonials';

const trustBadges = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Selamat & Aman',
    description: 'Transaksi anda dilindungi dan dijamin selamat.',
  },
  {
    icon: <ThumbsUp className="h-10 w-10 text-primary" />,
    title: 'Terpercaya',
    description: 'Dipercayai oleh ratusan pelanggan di seluruh Malaysia.',
  },
  {
    icon: <BadgeCheck className="h-10 w-10 text-primary" />,
    title: 'Jaminan Kualiti',
    description: 'Akaun premium berkualiti tinggi dan tahan lama.',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-banner');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 text-primary">
            Hiburan Premium Tanpa Had
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Dapatkan akses eksklusif ke VUJ/PRIME/JOY! PREMIUM dengan harga paling jimat di pasaran.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href="/pakej">Langgan Sekarang</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/cara-order">Lihat Cara Order</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="trust" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border-border">
                <CardHeader className="items-center">
                  {badge.icon}
                  <CardTitle className="font-headline">{badge.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{badge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section id="product-intro" className="py-16 bg-card">
         <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Apa itu VUJ/PRIME/JOY! PREMIUM?</h2>
          <p className="max-w-3xl mx-auto text-muted-foreground mb-8">
            VUJ/PRIME/JOY! PREMIUM adalah perkhidmatan langganan yang memberikan anda akses tanpa had kepada ribuan filem, siri TV, rancangan eksklusif, dan banyak lagi. Nikmati kandungan berkualiti tinggi di mana-mana, pada bila-bila masa.
          </p>
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <Link href="/pakej">Lihat Pakej Kami <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
         </div>
      </section>

      <section id="testimonials" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-8">Apa Kata Pelanggan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial) => (
              <Card key={testimonial.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-primary text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-headline">{testimonial.name}</CardTitle>
                       <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground italic">"{testimonial.review}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
             <Button asChild variant="link" className="text-primary font-bold">
              <Link href="/testimoni">Lihat Semua Testimoni <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
