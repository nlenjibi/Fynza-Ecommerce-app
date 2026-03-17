'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  DollarSign,
  Users,
  Settings,
  MessageSquare,
  TrendingUp,
  LogOut,
  Star,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    title: 'OVERVIEW',
    items: [
      { name: 'Dashboard', href: '/seller/dashboard', icon: LayoutDashboard },
      { name: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'BUSINESS',
    items: [
      { name: 'My Products', href: '/seller/products', icon: Package, badge: '24' },
      { name: 'Orders', href: '/seller/orders', icon: ShoppingCart, badge: '8' },
      { name: 'Customers', href: '/seller/customers', icon: Users },
    ],
  },
  {
    title: 'FINANCIALS',
    items: [
      { name: 'Revenue', href: '/seller/revenue', icon: DollarSign },
      { name: 'Payouts', href: '/seller/payouts', icon: TrendingUp },
    ],
  },
  {
    title: 'STORE',
    items: [
      { name: 'Messages', href: '/seller/messages', icon: MessageSquare, badge: '3' },
      { name: 'Reviews', href: '/seller/reviews', icon: Star },
      { name: 'Settings', href: '/seller/settings', icon: Settings },
    ],
  },
];

export function SellerSidebar() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['OVERVIEW', 'BUSINESS', 'FINANCIALS', 'STORE'])
  );
  const pathname = usePathname();

  return (
    <aside className="w-80 bg-primary-dark text-white h-screen overflow-y-auto sticky top-0">
      {/* Store Header */}
      <div className="border-b border-primary/30 px-6 py-6">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary font-bold text-white">S</div>
          <h2 className="text-base font-bold">My Store</h2>
        </div>
        <p className="text-xs text-gray-300">Seller Rating: 4.8/5</p>
      </div>
        <div>
          <p className="text-sm font-semibold text-white">Tech Store</p>
          <p className="text-xs text-gray-400">Seller Account</p>
        </div>
      </div>

      <nav className="p-4 space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
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
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-xs font-medium',
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-orange-500/20 text-orange-300'
                          )}
                        >
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
        <button className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors border border-gray-700">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
