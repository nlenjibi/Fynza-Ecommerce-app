'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  ChevronRight,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    title: 'MY ACCOUNT',
    items: [
      { name: 'Dashboard', href: '/customer/dashboard', icon: LayoutDashboard },
      { name: 'Profile', href: '/customer/profile', icon: User },
    ],
  },
  {
    title: 'SHOPPING',
    items: [
      { name: 'My Orders', href: '/customer/orders', icon: ShoppingBag, badge: '2' },
      { name: 'Wishlist', href: '/customer/wishlist', icon: Heart, badge: '5' },
    ],
  },
  {
    title: 'PREFERENCES',
    items: [
      { name: 'Addresses', href: '/customer/addresses', icon: MapPin },
      { name: 'Payment Methods', href: '/customer/payments', icon: CreditCard },
      { name: 'Notifications', href: '/customer/notifications', icon: Bell },
    ],
  },
];

export function CustomerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-background h-screen overflow-y-auto sticky top-0">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
          <span className="text-sm font-bold">JD</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">John Doe</p>
          <p className="text-xs text-muted-foreground">Premium Member</p>
        </div>
      </div>

      <nav className="p-4 space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary border-l-2 border-primary'
                          : 'text-foreground hover:bg-muted'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-secondary/20 px-2.5 py-0.5 text-xs font-medium text-secondary">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
