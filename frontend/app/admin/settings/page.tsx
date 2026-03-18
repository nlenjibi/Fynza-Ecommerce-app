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
  EyeOff,
  Footer,
  Plus,
  Trash2,
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
    socialFacebook: "",
    socialTwitter: "",
    socialInstagram: "",
    socialLinkedIn: "",
    socialYouTube: "",
    socialTikTok: "",
    socialPinterest: "",
  })

  const [footerSettings, setFooterSettings] = useState({
    companyDescription: "Your one-stop destination for quality products at affordable prices. Shop with confidence on our secure platform.",
    supportOnlineStatus: true,
    storeLocatorUrl: "https://example.com/store-locator",
    liveChatUrl: "https://chat.example.com",
    newsletterDescription: "Get exclusive deals, new arrivals, and special offers delivered to your inbox.",
    paymentMethods: [
      { id: "1", label: "Visa", icon: "💳", isActive: true },
      { id: "2", label: "Mastercard", icon: "💳", isActive: true },
      { id: "3", label: "Discover", icon: "💳", isActive: true },
      { id: "4", label: "Amex", icon: "💳", isActive: true },
      { id: "5", label: "PayPal", icon: "🅿️", isActive: true },
      { id: "6", label: "Google Pay", icon: "🔵", isActive: true },
      { id: "7", label: "Apple Pay", icon: "🍎", isActive: true },
    ],
    securityBadges: [
      { id: "1", label: "SSL Certificate", icon: "Shield", isActive: true },
      { id: "2", label: "Payment Security", icon: "Lock", isActive: true },
      { id: "3", label: "Trust Badge", icon: "Award", isActive: true },
      { id: "4", label: "Verified Secure", icon: "Award", isActive: true },
    ],
    legalLinks: [
      { id: "1", label: "Terms of Use", url: "/terms-of-service", isActive: true },
      { id: "2", label: "Privacy Policy", url: "/privacy-policy", isActive: true },
      { id: "3", label: "Cookie Preferences", url: "#", isActive: true },
      { id: "4", label: "Ad Choices", url: "#", isActive: true },
    ],
  })

  const [footerTab, setFooterTab] = useState<"general" | "payments" | "security" | "legal" | "newsletter">("general")

  const tabs = [
    { id: "general", label: "General", icon: Building2 },
    { id: "footer", label: "Footer", icon: Footer },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "taxes", label: "Taxes", icon: Percent },
    { id: "email", label: "Email", icon: Mail },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "social", label: "Social Links", icon: Globe },
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

                {/* Footer Settings */}
                {activeTab === "footer" && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Footer Settings</CardTitle>
                      <CardDescription>Configure footer content, payment methods, and legal links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex gap-2 mb-6">
                        {(["general", "payments", "security", "legal", "newsletter"] as const).map((tab) => (
                          <Button
                            key={tab}
                            variant={footerTab === tab ? "default" : "outline"}
                            size="sm"
                            className={footerTab === tab ? "bg-orange-500" : ""}
                            onClick={() => setFooterTab(tab)}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </Button>
                        ))}
                      </div>

                      {footerTab === "general" && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                            <textarea
                              className="w-full px-3 py-2 rounded-lg border border-gray-300"
                              rows={4}
                              value={footerSettings.companyDescription}
                              onChange={(e) => setFooterSettings({ ...footerSettings, companyDescription: e.target.value })}
                            />
                            <p className="text-xs text-gray-500 mt-1">Appears in the footer's company info section</p>
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Support Status</label>
                              <select
                                className="w-full h-10 px-3 rounded-lg border border-gray-300"
                                value={footerSettings.supportOnlineStatus ? "online" : "offline"}
                                onChange={(e) => setFooterSettings({ ...footerSettings, supportOnlineStatus: e.target.value === "online" })}
                              >
                                <option value="online">Online</option>
                                <option value="offline">Offline</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Store Locator URL</label>
                              <Input
                                type="url"
                                value={footerSettings.storeLocatorUrl}
                                onChange={(e) => setFooterSettings({ ...footerSettings, storeLocatorUrl: e.target.value })}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Live Chat URL</label>
                            <Input
                              type="url"
                              value={footerSettings.liveChatUrl}
                              onChange={(e) => setFooterSettings({ ...footerSettings, liveChatUrl: e.target.value })}
                            />
                          </div>
                        </div>
                      )}

                      {footerTab === "payments" && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Payment Methods</h3>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newMethod = { id: Date.now().toString(), label: "New Payment", icon: "💳", isActive: true }
                                setFooterSettings({ ...footerSettings, paymentMethods: [...footerSettings.paymentMethods, newMethod] })
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />Add Method
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {footerSettings.paymentMethods.map((method) => (
                              <div key={method.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                <span className="text-2xl">{method.icon}</span>
                                <Input className="flex-1" value={method.label} onChange={(e) => {
                                  const updated = footerSettings.paymentMethods.map((m) => m.id === method.id ? { ...m, label: e.target.value } : m)
                                  setFooterSettings({ ...footerSettings, paymentMethods: updated })
                                }} />
                                <input type="checkbox" checked={method.isActive} onChange={(e) => {
                                  const updated = footerSettings.paymentMethods.map((m) => m.id === method.id ? { ...m, isActive: e.target.checked } : m)
                                  setFooterSettings({ ...footerSettings, paymentMethods: updated })
                                }} className="h-4 w-4 rounded" />
                                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                                  setFooterSettings({ ...footerSettings, paymentMethods: footerSettings.paymentMethods.filter((m) => m.id !== method.id) })
                                }}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {footerTab === "security" && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Security Badges</h3>
                            <Button variant="outline" size="sm" onClick={() => {
                              const newBadge = { id: Date.now().toString(), label: "New Badge", icon: "Shield", isActive: true }
                              setFooterSettings({ ...footerSettings, securityBadges: [...footerSettings.securityBadges, newBadge] })
                            }}>
                              <Plus className="h-4 w-4 mr-2" />Add Badge
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {footerSettings.securityBadges.map((badge) => (
                              <div key={badge.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                <Shield className="h-5 w-5 text-gray-400" />
                                <Input className="flex-1" value={badge.label} onChange={(e) => {
                                  const updated = footerSettings.securityBadges.map((b) => b.id === badge.id ? { ...b, label: e.target.value } : b)
                                  setFooterSettings({ ...footerSettings, securityBadges: updated })
                                }} />
                                <input type="checkbox" checked={badge.isActive} onChange={(e) => {
                                  const updated = footerSettings.securityBadges.map((b) => b.id === badge.id ? { ...b, isActive: e.target.checked } : b)
                                  setFooterSettings({ ...footerSettings, securityBadges: updated })
                                }} className="h-4 w-4 rounded" />
                                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                                  setFooterSettings({ ...footerSettings, securityBadges: footerSettings.securityBadges.filter((b) => b.id !== badge.id) })
                                }}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {footerTab === "legal" && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Legal Links</h3>
                            <Button variant="outline" size="sm" onClick={() => {
                              const newLink = { id: Date.now().toString(), label: "New Link", url: "#", isActive: true }
                              setFooterSettings({ ...footerSettings, legalLinks: [...footerSettings.legalLinks, newLink] })
                            }}>
                              <Plus className="h-4 w-4 mr-2" />Add Link
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {footerSettings.legalLinks.map((link) => (
                              <div key={link.id} className="flex items-center gap-4 p-3 border rounded-lg">
                                <Input className="flex-1" placeholder="Label" value={link.label} onChange={(e) => {
                                  const updated = footerSettings.legalLinks.map((l) => l.id === link.id ? { ...l, label: e.target.value } : l)
                                  setFooterSettings({ ...footerSettings, legalLinks: updated })
                                }} />
                                <Input className="flex-1" placeholder="URL" value={link.url} onChange={(e) => {
                                  const updated = footerSettings.legalLinks.map((l) => l.id === link.id ? { ...l, url: e.target.value } : l)
                                  setFooterSettings({ ...footerSettings, legalLinks: updated })
                                }} />
                                <input type="checkbox" checked={link.isActive} onChange={(e) => {
                                  const updated = footerSettings.legalLinks.map((l) => l.id === link.id ? { ...l, isActive: e.target.checked } : l)
                                  setFooterSettings({ ...footerSettings, legalLinks: updated })
                                }} className="h-4 w-4 rounded" />
                                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => {
                                  setFooterSettings({ ...footerSettings, legalLinks: footerSettings.legalLinks.filter((l) => l.id !== link.id) })
                                }}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {footerTab === "newsletter" && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Newsletter Description</label>
                            <textarea className="w-full px-3 py-2 rounded-lg border border-gray-300" rows={3} value={footerSettings.newsletterDescription}
                              onChange={(e) => setFooterSettings({ ...footerSettings, newsletterDescription: e.target.value })} />
                            <p className="text-xs text-gray-500 mt-1">Displayed above the email input field</p>
                          </div>
                        </div>
                      )}

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

                {/* Social Links Settings */}
                {activeTab === "social" && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Social Media Links</CardTitle>
                      <CardDescription>Add your social media profiles to display on the platform</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                          <Input 
                            placeholder="https://facebook.com/yourpage"
                            value={settings.socialFacebook}
                            onChange={(e) => setSettings({ ...settings, socialFacebook: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X</label>
                          <Input 
                            placeholder="https://twitter.com/yourhandle"
                            value={settings.socialTwitter}
                            onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                          <Input 
                            placeholder="https://instagram.com/yourhandle"
                            value={settings.socialInstagram}
                            onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                          <Input 
                            placeholder="https://linkedin.com/company/yourcompany"
                            value={settings.socialLinkedIn}
                            onChange={(e) => setSettings({ ...settings, socialLinkedIn: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">YouTube</label>
                          <Input 
                            placeholder="https://youtube.com/@yourchannel"
                            value={settings.socialYouTube}
                            onChange={(e) => setSettings({ ...settings, socialYouTube: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">TikTok</label>
                          <Input 
                            placeholder="https://tiktok.com/@yourhandle"
                            value={settings.socialTikTok}
                            onChange={(e) => setSettings({ ...settings, socialTikTok: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pinterest</label>
                          <Input 
                            placeholder="https://pinterest.com/yourprofile"
                            value={settings.socialPinterest}
                            onChange={(e) => setSettings({ ...settings, socialPinterest: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                        <p className="text-sm text-blue-700">
                          <strong>Tip:</strong> Leave empty any social links you don't want to display on your platform.
                        </p>
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
