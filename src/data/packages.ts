export type Package = {
  id: number;
  name: string;
  price: number;
  duration: string;
  savings: string;
  icon: string;
  highlight?: boolean;
  badge?: string;
};

export const packages: Package[] = [
  {
    id: 1,
    name: '1 BULAN',
    price: 9,
    duration: 'Akses penuh 30 hari',
    savings: 'Harga Asas',
    icon: '⭐',
  },
  {
    id: 2,
    name: '1 BULAN PREMIUM',
    price: 14,
    duration: 'Akses penuh 30 hari',
    savings: 'Kualiti Premium',
    icon: '✨',
  },
  {
    id: 3,
    name: '3 BULAN',
    price: 25,
    duration: 'Akses penuh 90 hari',
    savings: 'Jimat',
    icon: '🔥',
  },
  {
    id: 4,
    name: '3 BULAN PREMIUM',
    price: 30,
    duration: 'Akses penuh 90 hari',
    savings: 'Jimat RM12',
    icon: '🔥',
    badge: 'JIMAT RM12!',
  },
  {
    id: 5,
    name: '6 BULAN',
    price: 48,
    duration: 'Akses penuh 180 hari',
    savings: 'Jimat RM36',
    icon: '🚀',
    highlight: true,
    badge: 'PALING POPULAR!',
  },
  {
    id: 6,
    name: '12 BULAN',
    price: 90,
    duration: 'Akses penuh 365 hari',
    savings: 'Jimat RM78',
    icon: '👑',
    badge: 'NILAI TERBAIK!',
  },
  {
    id: 7,
    name: '24 BULAN',
    price: 121,
    duration: 'Akses penuh 730 hari',
    savings: 'Jimat RM215',
    icon: '💎',
    badge: 'ULTRA JIMAT!',
  },
];
