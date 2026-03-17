'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Trash2, Plus, Check, Lock } from 'lucide-react';
import { useState } from 'react';

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit_card',
      name: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'credit_card',
      name: 'Mastercard',
      last4: '5555',
      expiry: '08/26',
     