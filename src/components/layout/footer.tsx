"use client";

import Link from 'next/link';
import { Tv } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AppFooter() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Tv className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">sanztech premium Hub</span>
          </div>
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            {currentYear && (
              <>&copy; {currentYear} sanztech. Hak Cipta Terpelihara.</>
            )}
          </div>
          <nav className="flex space-x-4 text-sm">
            <Link href="/legal/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Dasar Privasi
            </Link>
            <Link href="/legal/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terma Perkhidmatan
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
