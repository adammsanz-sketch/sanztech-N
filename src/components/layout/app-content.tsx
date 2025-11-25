"use client";

import { useSidebar } from '@/components/layout/sidebar';
import { AppHeader } from '@/components/layout/header';
import { AppFooter } from '@/components/layout/footer';

export function AppContent({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  return (
    <div className={`flex flex-col flex-1 transition-all duration-300 ${state === 'expanded' ? 'md:ml-[16rem]' : 'md:ml-[3rem]'}`}>
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}
