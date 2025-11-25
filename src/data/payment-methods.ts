import { Banknote, Landmark, Smartphone, Wallet } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type PaymentCategory = {
  title: string;
  icon: LucideIcon;
  methods: string[];
};

export const paymentMethods: PaymentCategory[] = [
  {
    title: 'Bank Transfer',
    icon: Landmark,
    methods: ['Maybank', 'CIMB Bank', 'Public Bank', 'RHB Bank', 'Hong Leong Bank'],
  },
  {
    title: 'E-Wallet',
    icon: Wallet,
    methods: ['Touch \'n Go eWallet', 'Boost', 'GrabPay', 'ShopeePay'],
  },
];
