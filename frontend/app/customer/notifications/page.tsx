'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Bell, Trash2, Check, CheckCheck, Package, ShoppingCart, Tag, AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order #FYN-2024-001245 has been delivered successfully.',
      date: 'Jan 18, 2024',
      time: '2:30 PM',
      read: false,
      icon: Package,
    },
    {
      id: 2,
      type: 'promotion',
      title: 'Flash Sale Alert',
      message: 'Get up to 50% off on electronics this weekend only!',
      date: 'Jan 17, 2024',
      time: '10:00 AM',
      read: false,
      icon: Tag,
    },
    {
      id: 3,
      type: 'cart',
      title: 'Items in Cart',
      message: 'You have items in your cart that are selling fast. Complete your purchase now!',
      date: 'Jan 16, 2024',
      time: '5:45 PM',
      read: true,
      icon: ShoppingCart,
    },
    {
      id: 4,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #FYN-2024-001244 has been shipped and is on its way.',
      date: 'Jan 15, 2024',
      time: '11:20 AM',
      read: true,
      icon: Package,
    },
    {
      id: 5,
      type: 'system',
      title: 'Account Update',
      message: 'Your account information has been updated successfully.',
      date: 'Jan 14, 2024',
      time: '3:15 PM',
      read: true,
      icon: Info,
    },
    {
      id: 6,
      type: 'promotion',
      title: 'New Arrivals',
      message: 'Check out the latest products in our Fashion category.',
      date: 'Jan 13, 2024',
      time: '9:00 AM',
      read: true,
      icon: Tag,
    },
    {
      id: 7,
      type: 'system',
      title: 'Price Drop Alert',
      message: 'Price dropped for "Wireless Bluetooth Headphones" - Save 30% now!',
      date: 'Jan 12, 2024',
      time: '6:30 PM',
      read: true,
      icon: AlertCircle,
    },
  ]);

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifs => 
      notifs.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifs => notifs.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifs => notifs.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <CustomerSidebar />

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600 mt-1">Manage your notifications and alerts</p>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                    className={filter === 'all' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === 'unread' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('unread')}
                    className={filter === 'unread' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  >
                    Unread {unreadCount > 0 && `(${unreadCount})`}
                  </Button>
                  <Button
                    variant={filter === 'order' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('order')}
                    className={filter === 'order' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  >
                    Orders
                  </Button>
                  <Button
                    variant={filter === 'promotion' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('promotion')}
                    className={filter === 'promotion' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                  >
                    Promotions
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={markAllAsRead}
                    >
                      <CheckCheck className="mr-1 h-4 w-4" />
                      Mark all read
                    </Button>
                  )}
                  {notifications.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAll}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Clear all
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-lg shadow">
              {filteredNotifications.length === 0 ? (
                <div className="p-12 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                  <p className="text-gray-500">
                    {filter === 'unread' 
                      ? 'You have read all your notifications.' 
                      : filter === 'all' 
                        ? 'You don\'t have any notifications yet.'
                        : `No ${filter} notifications.`
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-orange-50/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'order' ? 'bg-blue-100 text-blue-600' :
                          notification.type === 'promotion' ? 'bg-orange-100 text-orange-600' :
                          notification.type === 'cart' ? 'bg-purple-100 text-purple-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          <notification.icon className="h-5 w-5" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className={`font-medium ${
                                !notification.read ? 'text-gray-900' : 'text-gray-700'
                              }`}>
                                {notification.title}
                                {!notification.read && (
                                  <span className="ml-2 inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
                                )}
                              </h4>
                              <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.date} at {notification.time}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => markAsRead(notification.id)}
                                  title="Mark as read"
                                >
                                  <Check className="h-4 w-4 text-gray-400" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteNotification(notification.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4 text-red-400" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
