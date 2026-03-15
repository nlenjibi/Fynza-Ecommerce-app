'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell, Mail, Smartphone, MessageSquare, ToggleLeft, ToggleRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState({
        orderUpdates: true,
        promotionalEmails: true,
        smsNotifications: true,
        pushNotifications: true,
        newArrivals: false,
        priceDrops: true,
        flashSales: true,
    });

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications({ ...notifications, [key]: !notifications[key] });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/help" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Help Center
                </Link>

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <Bell className="h-8 w-8 text-orange-500" />
                        Managing Notification Settings
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Learn how to control your notification preferences on Fynza
                    </p>
                </div>

                {/* Guide Sections */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Manage Notifications</h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">1</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Access Account Settings</h3>
                                <p className="text-gray-600 mt-1">
                                    Log in to your account and click on your profile icon. Select "Account Settings" from the dropdown menu.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">2</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Go to Notifications Tab</h3>
                                <p className="text-gray-600 mt-1">
                                    In the Account Settings page, click on the "Notifications" tab to view all notification options.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">3</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Customize Your Preferences</h3>
                                <p className="text-gray-600 mt-1">
                                    Toggle the switches to enable or disable specific notification types according to your preferences.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">4</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Save Changes</h3>
                                <p className="text-gray-600 mt-1">
                                    Make sure to click "Save Changes" to apply your new notification settings.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification Types */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Notification Types</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Bell className="h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="font-medium text-gray-900">Order Updates</p>
                                    <p className="text-sm text-gray-600">Get notified about order status changes, shipping updates, and delivery confirmations</p>
                                </div>
                            </div>
                            {notifications.orderUpdates ?
                                <ToggleRight className="h-6 w-6 text-green-500" /> :
                                <ToggleLeft className="h-6 w-6 text-gray-400" />
                            }
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-blue-500" />
                                <div>
                                    <p className="font-medium text-gray-900">Promotional Emails</p>
                                    <p className="text-sm text-gray-600">Receive special offers, discounts, and promotional content via email</p>
                                </div>
                            </div>
                            {notifications.promotionalEmails ?
                                <ToggleRight className="h-6 w-6 text-green-500" /> :
                                <ToggleLeft className="h-6 w-6 text-gray-400" />
                            }
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Smartphone className="h-5 w-5 text-purple-500" />
                                <div>
                                    <p className="font-medium text-gray-900">SMS Notifications</p>
                                    <p className="text-sm text-gray-600">Receive order updates and promotional messages via SMS</p>
                                </div>
                            </div>
                            {notifications.smsNotifications ?
                                <ToggleRight className="h-6 w-6 text-green-500" /> :
                                <ToggleLeft className="h-6 w-6 text-gray-400" />
                            }
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Bell className="h-5 w-5 text-green-500" />
                                <div>
                                    <p className="font-medium text-gray-900">Push Notifications</p>
                                    <p className="text-sm text-gray-600">Receive real-time updates in your browser or mobile app</p>
                                </div>
                            </div>
                            {notifications.pushNotifications ?
                                <ToggleRight className="h-6 w-6 text-green-500" /> :
                                <ToggleLeft className="h-6 w-6 text-gray-400" />
                            }
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Bell className="h-5 w-5 text-orange-500" />
                                <div>
                                    <p className="font-medium text-gray-900">New Arrivals</p>
                                    <p className="text-sm text-gray-600">Be the first to know about new products in your favorite categories</p>
                                </div>
                            </div>
                            {notifications.newArrivals ?
                                <ToggleRight className="h-6 w-6 text-green-500" /> :
                                <ToggleLeft className="h-6 w-6 text-gray-400" />
                            }
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Bell className="h-5 w-5 text-red-500" />
                                <div>
                                    <p className="font-medium text-gray-900">Price Drops</p>
                                    <p className="text-sm text-gray-600">Get notified when items on your wishlist go on sale</p>
                                </div>
                            </div>
                            {notifications.priceDrops ?
                                <ToggleRight className="h-6 w-6 text-green-500" /> :
                                <ToggleLeft className="h-6 w-6 text-gray-400" />
                            }
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Bell className="h-5 w-5 text-yellow-500" />
                                <div>
                                    <p className="font-medium text-gray-900">Flash Sales</p>
                                    <p className="text-sm text-gray-600">Get early access to flash sales and limited-time offers</p>
                                </div>
                            </div>
                            {notifications.flashSales ?
                                <ToggleRight className="h-6 w-6 text-green-500" /> :
                                <ToggleLeft className="h-6 w-6 text-gray-400" />
                            }
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-3">Important Notes</h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                        <li>Order-related notifications cannot be completely disabled as they are essential for order fulfillment</li>
                        <li>SMS notifications may incur carrier charges based on your mobile plan</li>
                        <li>Push notifications require your browser or mobile app to have notification permissions enabled</li>
                        <li>You can unsubscribe from promotional emails at any time using the unsubscribe link in the email</li>
                    </ul>
                </div>

                {/* Contact Support */}
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need More Help?</h3>
                    <p className="text-gray-600 mb-4">Our support team is here to assist you</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contact">
                            <Button className="bg-orange-500 hover:bg-orange-600">Contact Us</Button>
                        </Link>
                        <Link href="/help">
                            <Button variant="outline">Back to Help Center</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
