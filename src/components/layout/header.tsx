"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tv } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <Tv className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              sanztech premium Hub
            </span>
          </Link>
        </div>

        {/* Mobile-first sidebar trigger */}
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex">
            <SidebarTrigger />
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/pakej">Langgan Sekarang</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
