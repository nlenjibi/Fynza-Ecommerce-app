"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings as SettingsIcon,
  Building2,
  CreditCard,
  Truck,
  Percent,
  Mail,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [showApiKey, setShowApiKey] = useState(false)
  const [settings, setSettings] = useState({
    siteName: "Fynza",
    siteEmail: "support@fynza.com",
    sitePhone: "+1 (555) 000-0000",
    currency: "USD",
    timezone: "America/New_York",
    taxRate: "10",
    shippingCost: "5",
    freeShippingThreshold: "50",
    paystackPublicKey: "pk_test_...",
    paystackSecretKey: "sk_test_...",
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpEmail: "noreply@fynza.com",
    emailNotifications: true,
    orderNotifications: true,
    refundNotifications: true,
    sellerNotifications: true,
  })

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "taxes", label: "Taxes", icon: Percent },
    { id: "email", label: "Email", icon: Mail },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Settings" subtitle="Configure platform settings" />
        
        <main className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex gap-6">
              {/* Sidebar Tabs */}
              <Card className="w-64 border-0 shadow-sm h-fit sticky top-20">
                <CardContent className="p-4">
                  <TabsList className="flex flex-col w-full bg-transparent h-auto space-y-1">
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className={`w-full justify-start px-3 py-2 text-left ${
                          activeTab === tab.id 
                            ? "bg-orange-50 text-orange-600" 
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <tab.icon className="h-4 w-4 mr-2" />
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </CardContent>
              </Card>

              {/* Content */}
              <div className="flex-1">
                {/* General Settings */}
                {activeTab === "general" && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>General Settings</CardTitle>
                      <CardDescription>Configure basic platform information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                          <Input 
                            value={settings.siteName}
                            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                          <Input 
                            type="email"
                            value={settings.siteEmail}
                            onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <Input 
                            value={settings.sitePhone}
                            onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                          <select 
                            className="w-full h-10 px-3 rounded-lg border border-gray-300"
                            value={settings.currency}
                            onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                          >
                            <option value="USD">USD - US Dollar</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="GBP">GBP - British Pound</option>
                            <option value="GHS">GHS - Ghana Cedis</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                          <select 
                            className="w-full h-10 px-3 rounded-lg border border-gray-300"
                            value={settings.timezone}
                            onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                          >
                            <option value="America/New_York">Eastern Time (ET)</option>
                            <option value="America/Chicago">Central Time (CT)</option>
                            <option value="America/Denver">Mountain Time (MT)</option>
                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                            <option value="Europe/London">London (GMT)</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end pt-4 border-t">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Payment Settings */}
                {activeTab === "payments" && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Payment Gateway Settings</CardTitle>
                      <CardDescription>Configure payment gateway integrations</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                        <div className="flex items-center gap-2 text-blue-700 mb-2">
                          <CreditCard className="h-5 w-5" />
                          <span className="font-medium">Paystack Integration</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">Connected</Badge>
                        </div>
                        <p className="text-sm text-blue-600">Your Paystack account is connected and ready to process payments.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Public Key</label>
                          <div className="relative">
                            <Input 
                              type={showApiKey ? "text" : "password"}
                              value={settings.paystackPublicKey}
                              onChange={(e) => setSettings({ ...settings, paystackPublicKey: e.target.value })}
                            />
                            <button 
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              onClick={() => setShowApiKey(!showApiKey)}
                            >
                              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                          <Input 
                            type="password"
                            value={settings.paystackSecretKey}
                            onChange={(e) => setSettings({ ...settings, paystackSecretKey: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4 p-4 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-orange-500" defaultChecked />
                          <span className="text-sm text-gray-700">Enable Cash on Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-orange-500" defaultChecked />
                          <span className="text-sm text-gray-700">Enable Mobile Money</span>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Shipping Settings */}
                {activeTab === "shipping" && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Shipping Settings</CardTitle>
                      <CardDescription>Configure shipping rates and options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Base Shipping Cost</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input 
                              className="pl-7"
                              type="number"
                              value={settings.shippingCost}
                              onChange={(e) => setSettings({ ...settings, shippingCost: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold</label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <Input 
                              className="pl-7"
                              type="number"
                              value={settings.freeShippingThreshold}
                              onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery Days</label>
                          <Input type="number" defaultValue="3-5" />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Tax Settings */}
                {activeTab === "taxes" && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Tax Configuration</CardTitle>
                      <CardDescription>Set up tax rates for your platform</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Default Tax Rate (%)</label>
                          <Input 
                            type="number"
                            value={settings.taxRate}
                            onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                          />
                          <p className="text-xs text-gray-500 mt-1">Applied to all orders unless overridden</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tax Number</label>
                          <Input placeholder="TAX-12345678" />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Email Settings */}
                {activeTab === "email" && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>SMTP Configuration</CardTitle>
                      <CardDescription>Set up email server for notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                          <Input 
                            value={settings.smtpHost}
                            onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                          <Input 
                            value={settings.smtpPort}
                            onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Email</label>
                          <Input 
                            type="email"
                            value={settings.smtpEmail}
                            onChange={(e) => setSettings({ ...settings, smtpEmail: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Password</label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        Send Test Email
                      </Button>

                      <div className="flex justify-end pt-4 border-t">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Notifications Settings */}
                {activeTab === "notifications" && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Choose what notifications you receive</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { key: "orderNotifications", label: "New Order Notifications", description: "Get notified when new orders are placed" },
                        { key: "refundNotifications", label: "Refund Requests", description: "Get notified about refund requests" },
                        { key: "sellerNotifications", label: "Seller Applications", description: "Get notified about new seller registrations" },
                        { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border">
                          <div>
                            <p className="font-medium text-gray-900">{item.label}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                          <button 
                            className={`w-12 h-6 rounded-full transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-orange-500' : 'bg-gray-200'}`}
                            onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                          >
                            <span className={`block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                          </button>
                        </div>
                      ))}

                      <div className="flex justify-end pt-4 border-t">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Security Settings */}
                {activeTab === "security" && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Configure security and access control</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                          <div>
                            <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                          <div>
                            <p className="font-medium text-gray-900">Session Timeout</p>
                            <p className="text-sm text-gray-500">Automatically log out after period of inactivity</p>
                          </div>
                          <select className="h-9 px-3 rounded-lg border border-gray-300 text-sm">
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>4 hours</option>
                            <option>8 hours</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg border">
                          <div>
                            <p className="font-medium text-gray-900">Login Notifications</p>
                            <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                          </div>
                          <button className="w-12 h-6 bg-orange-500 rounded-full">
                            <span className="block w-6 h-6 bg-white rounded-full shadow transform translate-x-6" />
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <Button className="bg-orange-500 hover:bg-orange-600">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
