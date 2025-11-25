import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FaqChatbot from "@/components/faq-chatbot";

const faqs = [
  {
    question: "Apa itu VUJ/PRIME/JOY! PREMIUM?",
    answer: "Ia adalah perkhidmatan langganan kandungan premium yang menawarkan akses kepada ribuan filem, siri TV, dan rancangan eksklusif.",
  },
  {
    question: "Bagaimana cara pembayaran?",
    answer: "Kami menerima pembayaran melalui Bank Transfer (Maybank, CIMB, dll.) dan juga E-wallet (Touch 'n Go, Boost, GrabPay, dll.).",
  },
  {
    question: "Berapa lama masa yang diambil untuk pengaktifan akaun?",
    answer: "Akaun anda akan diaktifkan dalam masa 1-2 jam selepas pembayaran anda disahkan oleh pihak kami.",
  },
  {
    question: "Bolehkah saya berkongsi akaun dengan orang lain?",
    answer: "Perkongsian akaun tidak digalakkan untuk mengelakkan sebarang isu teknikal atau sekatan pada akaun anda.",
  },
  {
    question: "Peranti apa yang disokong?",
    answer: "Perkhidmatan kami menyokong hampir semua peranti moden termasuk telefon pintar (Android & iOS), tablet, laptop, PC, dan Smart TV.",
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4">
          Soalan Lazim (FAQ)
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Ada soalan? Cari jawapannya di sini atau tanya chatbot kami.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-headline font-bold mb-6">Jawapan Pantas</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div>
          <h2 className="text-2xl font-headline font-bold mb-6">Tanya Pembantu AI Kami</h2>
          <FaqChatbot />
        </div>
      </div>
    </div>
  );
}
