import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/footer';
import FloatingWhatsapp from '@/components/floating-whatsapp';
import { AppSidebar } from '@/components/layout/sidebar';
import { Providers } from '@/components/providers';
import { AppContent } from '@/components/layout/app-content';
import './globals.css';

export const metadata: Metadata = {
  title: 'sanztech premium Hub',
  description: 'Langganan VUJ / PRIME / JOY! PREMIUM Anda',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-body antialiased">
        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <AppSidebar />
            <AppContent>{children}</AppContent>
          </div>
        </Providers>
        <FloatingWhatsapp />
        <Toaster />
      </body>
    </html>
  );
}
