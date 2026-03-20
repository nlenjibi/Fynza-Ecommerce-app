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
  User,
  Lock,
  Shield,
  HelpCircle,
  Settings,
  Mail,
  Users,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    title: 'MY ACCOUNT',
    items: [
      { name: 'Home', href: '/', icon: Home },
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
    title: 'MY STORES',
    items: [
      { name: 'Following', href: '/customer/follows', icon: Users, badge: '12' },
      { name: 'Messages', href: '/customer/messages', icon: Mail, badge: '3' },
    ],
  },
  {
    title: 'PREFERENCES',
    items: [
      { name: 'Addresses', href: '/customer/addresses', icon: MapPin },
      { name: 'Payment Methods', href: '/customer/payments', icon: CreditCard },
      { name: 'Notification Settings', href: '/customer/notification-settings', icon: Bell },
    ],
  },
  {
    title: 'SECURITY',
    items: [
      { name: 'Change Password', href: '/customer/change-password', icon: Lock },
      { name: 'Two-Factor Authentication', href: '/customer/2fa', icon: Shield },
    ],
  },
  {
    title: 'COMMUNICATION',
    items: [
      { name: 'Notifications', href: '/customer/notifications', icon: Bell },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      { name: 'Help / Contact', href: '/customer/help', icon: HelpCircle },
    ],
  },
];

interface CustomerSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function CustomerSidebar({ isOpen: externalIsOpen, onClose }: CustomerSidebarProps) {
  const pathname = usePathname()
  const [internalIsOpen, setInternalIsOpen] = useState(true)
  
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = onClose ? (value: boolean) => {
      if (!value) onClose();
  } : setInternalIsOpen;

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

      <div className="p-4 border-t border-border mt-auto">
        <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
