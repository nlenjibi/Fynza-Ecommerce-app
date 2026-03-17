"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import {
    Bell,
    Check,
    CheckCheck,
    ShoppingCart,
    Package,
    AlertTriangle,
    DollarSign,
    RefreshCw,
    Settings,
    Trash2,
    Filter,
} from "lucide-react";

interface Notification {
    id: string;
    type: "order" | "stock" | "refund" | "payment" | "system" | "promotion";
    title: string;
    message: string;
    time: string;
    read: boolean;
    icon: React.ElementType;
}

export default function SellerNotifications() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [filterType, setFilterType] = useState("all");
    const [showUnreadOnly, setShowUnreadOnly] = useState(false);

    const notifications: Notification[] = [
        {
            id: "1",
            type: "order",
            title: "New Order Received",
            message: "Abena Mensah placed a new order (ORD-7821) for GH₵ 189.99",
            time: "5 minutes ago",
            read: false,
            icon: ShoppingCart,
        },
        {
            id: "2",
            type: "order",
            title: "Order Shipped",
            message: "Order ORD-7819 has been shipped. Tracking: FYN-TRK-78219",
            time: "1 hour ago",
            read: false,
            icon: Package,
        },
        {
            id: "3",
            type: "stock",
            title: "Low Stock Alert",
            message: "Wireless Headphones is running low (5 items left)",
            time: "2 hours ago",
            read: false,
            icon: AlertTriangle,
        },
        {
            id: "4",
            type: "refund",
            title: "Refund Request",
            message: "Michael Kwaku requested a refund for order ORD-7816",
            time: "3 hours ago",
            read: false,
            icon: RefreshCw,
        },
        {
            id: "5",
            type: "payment",
            title: "Payment Received",
            message: "Payment of GH₵ 450.00 received for order ORD-7820",
            time: "5 hours ago",
            read: true,
            icon: DollarSign,
        },
        {
            id: "6",
            type: "promotion",
            title: "Promotion Performance",
            message: "Your 'New Year Sale' promotion has generated 15 orders today",
            time: "1 day ago",
            read: true,
            icon: Bell,
        },
        {
            id: "7",
            type: "system",
            title: "System Update",
            message: "New seller analytics features are now available",
            time: "2 days ago",
            read: true,
            icon: Bell,
        },
        {
            id: "8",
            type: "order",
            title: "Order Delivered",
            message: "Order ORD-7818 has been delivered successfully",
            time: "2 days ago",
            read: true,
            icon: CheckCheck,
        },
    ];

    const getTypeColor = (type: string) => {
        switch (type) {
            case "order":
                return "bg-blue-100 text-blue-600";
            case "stock":
                return "bg-red-100 text-red-600";
            case "refund":
                return "bg-yellow-100 text-yellow-600";
            case "payment":
                return "bg-green-100 text-green-600";
            case "promotion":
                return "bg-purple-100 text-purple-600";
            case "system":
                return "bg-gray-100 text-gray-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const filteredNotifications = notifications.filter((notification) => {
        const matchesType = filterType === "all" || notification.type === filterType;
        const matchesRead = !showUnreadOnly || !notification.read;
        return matchesType && matchesRead;
    });

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id: string) => {
        console.log(`Marking notification ${id} as read`);
    };

    const markAllAsRead = () => {
        console.log("Marking all as read");
    };

    const deleteNotification = (id: string) => {
        console.log(`Deleting notification ${id}`);
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <SellerSidebar isOpen={sidebarOpen} onToggle={(open) => setSidebarOpen(open)} />

            <main className={`flex-1 overflow-auto ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-20'}`}>
                {/* Sidebar Toggle Header - Shows when sidebar is collapsed */}
                {!sidebarOpen && (
                    <div className="hidden lg:flex bg-white border-b border-gray-200 px-4 py-3 items-center gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSidebarOpen(true)}
                            className="p-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </Button>
                        <span className="font-semibold text-gray-900">Notifications</span>
                    </div>
                )}

                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(true)}
                        className="p-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    </Button>
                    <span className="font-semibold text-gray-900">Notifications</span>
                    <div className="w-10" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                            <p className="text-gray-600 mt-1">
                                {unreadCount > 0
                                    ? `You have ${unreadCount} unread notifications`
                                    : "You're all caught up!"}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={markAllAsRead}>
                                <Check size={16} className="mr-2" />
                                Mark All Read
                            </Button>
                            <Button variant="outline">
                                <Settings size={16} />
                            </Button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white rounded-lg shadow p-4 mb-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                            >
                                <option value="all">All Types</option>
                                <option value="order">Orders</option>
                                <option value="stock">Stock Alerts</option>
                                <option value="refund">Refunds</option>
                                <option value="payment">Payments</option>
                                <option value="promotion">Promotions</option>
                                <option value="system">System</option>
                            </select>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={showUnreadOnly}
                                    onChange={(e) => setShowUnreadOnly(e.target.checked)}
                                    className="w-4 h-4 accent-orange-500"
                                />
                                <span className="text-sm text-gray-700">Show unread only</span>
                            </label>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-gray-50 transition-colors ${!notification.read ? "bg-orange-50/50" : ""
                                        }`}
                                >
                                    <div className="flex gap-4">
                                        {/* Icon */}
                                        <div
                                            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(
                                                notification.type
                                            )}`}
                                        >
                                            <notification.icon size={18} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {notification.title}
                                                        {!notification.read && (
                                                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                                New
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {notification.message}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        {notification.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex-shrink-0 flex items-center gap-2">
                                            {!notification.read && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="text-gray-400 hover:text-gray-600"
                                                >
                                                    <Check size={16} />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteNotification(notification.id)}
                                                className="text-gray-400 hover:text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <Bell className="mx-auto text-gray-300 mb-4" size={48} />
                                <p className="text-gray-600">No notifications found</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
