"use client";

import { useState } from "react";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Tag,
  Save,
  Check
} from "lucide-react";

interface NotificationSettings {
  orderUpdates: boolean;
  paymentConfirmation: boolean;
  shippingUpdates: boolean;
  promotionalEmails: boolean;
  promotionalSms: boolean;
  newProductAlerts: boolean;
  priceDropAlerts: boolean;
  wishlistUpdates: boolean;
  reviewRequests: boolean;
  newsletter: boolean;
}

export default function NotificationSettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settings, setSettings] = useState<NotificationSettings>({
    orderUpdates: true,
    paymentConfirmation: true,
    shippingUpdates: true,
    promotionalEmails: true,
    promotionalSms: false,
    newProductAlerts: true,
    priceDropAlerts: true,
    wishlistUpdates: true,
    reviewRequests: true,
    newsletter: false,
  });
  const [saved, setSaved] = useState(false);

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const saveSettings = () => {
    console.log("Saving settings:", settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
              <p className="text-gray-600">Manage how you receive notifications and updates</p>
            </div>
            <Button 
              onClick={saveSettings}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {saved ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          {/* Order Notifications */}
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-500" />
                Order Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Order Updates</p>
                  <p className="text-sm text-gray-500">Get notified about order status changes</p>
                </div>
                <Switch 
                  checked={settings.orderUpdates}
                  onCheckedChange={() => toggleSetting('orderUpdates')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Payment Confirmation</p>
                  <p className="text-sm text-gray-500">Receive confirmation when payment is processed</p>
                </div>
                <Switch 
                  checked={settings.paymentConfirmation}
                  onCheckedChange={() => toggleSetting('paymentConfirmation')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Shipping Updates</p>
                  <p className="text-sm text-gray-500">Track your package with shipping notifications</p>
                </div>
                <Switch 
                  checked={settings.shippingUpdates}
                  onCheckedChange={() => toggleSetting('shippingUpdates')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Email Notifications */}
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-orange-500" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Promotional Emails</p>
                  <p className="text-sm text-gray-500">Receive deals, discounts, and special offers</p>
                </div>
                <Switch 
                  checked={settings.promotionalEmails}
                  onCheckedChange={() => toggleSetting('promotionalEmails')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">New Product Alerts</p>
                  <p className="text-sm text-gray-500">Be the first to know about new arrivals</p>
                </div>
                <Switch 
                  checked={settings.newProductAlerts}
                  onCheckedChange={() => toggleSetting('newProductAlerts')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Price Drop Alerts</p>
                  <p className="text-sm text-gray-500">Get notified when items in your wishlist drop in price</p>
                </div>
                <Switch 
                  checked={settings.priceDropAlerts}
                  onCheckedChange={() => toggleSetting('priceDropAlerts')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Wishlist Updates</p>
                  <p className="text-sm text-gray-500">Updates about your saved items</p>
                </div>
                <Switch 
                  checked={settings.wishlistUpdates}
                  onCheckedChange={() => toggleSetting('wishlistUpdates')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Review Requests</p>
                  <p className="text-sm text-gray-500">Reminders to review purchased products</p>
                </div>
                <Switch 
                  checked={settings.reviewRequests}
                  onCheckedChange={() => toggleSetting('reviewRequests')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Newsletter</p>
                  <p className="text-sm text-gray-500">Weekly digest of top deals and trends</p>
                </div>
                <Switch 
                  checked={settings.newsletter}
                  onCheckedChange={() => toggleSetting('newsletter')}
                />
              </div>
            </CardContent>
          </Card>

          {/* SMS Notifications */}
          <Card className="border-0 shadow-sm mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-orange-500" />
                SMS Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Promotional SMS</p>
                  <p className="text-sm text-gray-500">Receive exclusive deals via text message</p>
                </div>
                <Switch 
                  checked={settings.promotionalSms}
                  onCheckedChange={() => toggleSetting('promotionalSms')}
                />
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-orange-500" />
                Push Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Browser Notifications</p>
                  <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">App Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications from the mobile app</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
