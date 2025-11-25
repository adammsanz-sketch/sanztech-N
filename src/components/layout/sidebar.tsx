'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import {
  Home,
  Package,
  ShoppingCart,
  Star,
  HelpCircle,
  Phone,
  Tv,
} from 'lucide-react';

const mainNavLinks = [
  { href: '/', label: 'Laman Utama', icon: Home },
  { href: '/pakej', label: 'Pakej & Harga', icon: Package },
  { href: '/cara-order', label: 'Cara Melanggan', icon: ShoppingCart },
  { href: '/testimoni', label: 'Testimoni', icon: Star },
];

const supportNavLinks = [
  { href: '/faq', label: 'Soalan Lazim', icon: HelpCircle },
  { href: '/hubungi-kami', label: 'Hubungi Kami', icon: Phone },
];

export function AppSidebar() {
  const pathname = usePathname();

  const renderLinks = (links: typeof mainNavLinks) => {
    return links.map((link) => (
      <SidebarMenuItem key={link.href}>
        <Link href={link.href} className="w-full">
          <SidebarMenuButton
            isActive={pathname === link.href}
            className="w-full justify-start"
            tooltip={link.label}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    ));
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
           <Link href="/" className="flex items-center space-x-2">
            <Tv className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl font-headline sm:inline-block">
              sanztech
            </span>
          </Link>
        </SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
          </SidebarMenuItem>
          {renderLinks(mainNavLinks)}
          <SidebarMenuItem>
            <SidebarGroupLabel>Sokongan</SidebarGroupLabel>
          </SidebarMenuItem>
          {renderLinks(supportNavLinks)}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export { useSidebar } from '@/components/ui/sidebar';
