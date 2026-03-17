'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    BarChart3,
    MessageSquare,
    Settings,
    LogOut,
    ChevronDown,
    Store,
} from 'lucide-react';
import { useState } from 'react';

interface SellerSidebarProps {
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
}

export function SellerSidebar({ isOpen: externalIsOpen, onToggle }: SellerSidebarProps) {
    const pathname = usePathname();
    const [internalIsOpen, setInternalIsOpen] = useState(true);
    
    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    
    const handleToggle = () => {
        const newValue = !isOpen;
        if (onToggle) {
            onToggle(newValue);
        } else {
            setInternalIsOpen(newValue);
        }
    };

    const menuItems = [
        {
            label: 'Dashboard',
            href: '/seller',
            icon: LayoutDashboard,
        },
        {
            label: 'Products',
            href: '/seller/products',
            icon: Package,
        },
        {
            label: 'Orders',
            href: '/seller/orders',
            icon: ShoppingCart,
        },
        {
            label: 'Analytics',
            href: '/seller/analytics',
            icon: BarChart3,
        },
        {
            label: 'Messages',
            href: '/seller/messages',
            icon: MessageSquare,
        },
        {
            label: 'Settings',
            href: '/seller/settings',
            icon: Settings,
        },
    ];

    const isActive = (href: string) => {
        if (href === '/seller') {
            return pathname === '/seller';
        }
        return pathname.startsWith(href);
    };

    return (
        <aside
            className={`${isOpen ? 'w-64' : 'w-20'
                } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0`}
        >
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <Store className="text-white" size={24} />
                    </div>
                    {isOpen && (
                        <div>
                            <h1 className="font-bold text-gray-900">Fynza</h1>
                            <p className="text-xs text-gray-600">Seller Hub</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                                        ? 'bg-orange-50 text-orange-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon size={20} className="flex-shrink-0" />
                                {isOpen && (
                                    <span className="text-sm font-medium">{item.label}</span>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-gray-200 p-4 space-y-2">
                {/* Toggle Sidebar */}
                <button
                    type="button"
                    onClick={handleToggle}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                    <ChevronDown
                        size={20}
                        className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''
                            }`}
                    />
                    {isOpen ? (
                        <span className="text-sm font-medium">Collapse</span>
                    ) : (
                        <span className="text-sm font-medium">Expand</span>
                    )}
                </button>

                {/* Logout */}
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={20} className="flex-shrink-0" />
                    {isOpen ? (
                        <span className="text-sm font-medium">Logout</span>
                    ) : (
                        <span className="text-sm font-medium">Logout</span>
                    )}
                </button>
            </div>
        </aside>
    );
}
