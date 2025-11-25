import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { testimonials } from '@/data/testimonials';
import { Star, User } from 'lucide-react';

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
          Testimoni Pelanggan
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Lihat apa yang pelanggan kami katakan tentang perkhidmatan kami. Kepuasan anda adalah keutamaan kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center font-bold text-primary text-xl">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <CardTitle className="text-xl font-headline">{testimonial.name}</CardTitle>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground text-lg italic">"{testimonial.review}"</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
