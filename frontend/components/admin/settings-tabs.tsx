"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="bg-white">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="payment">Payment</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                <p className="mt-1 text-sm text-gray-500">Update your store information</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input id="store-name" defaultValue="Fynza" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email">Store Email</Label>
                  <Input id="store-email" type="email" defaultValue="contact@fynza.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea
                  id="store-description"
                  rows={4}
                  defaultValue="Your trusted online marketplace for quality products"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+233 30 274 0642" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input id="currency" defaultValue="GH₵ (Ghanaian Cedi)" />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="payment">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment Settings</h3>
                <p className="mt-1 text-sm text-gray-500">Configure payment methods and gateways</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Mobile Money</p>
                    <p className="text-sm text-gray-500">Accept MTN Mobile Money and Vodafone Cash</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Credit/Debit Cards</p>
                    <p className="text-sm text-gray-500">Accept Visa, Mastercard payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Allow customers to pay on delivery</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="shipping">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Shipping Settings</h3>
                <p className="mt-1 text-sm text-gray-500">Configure delivery options and rates</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="delivery-time">Standard Delivery Time</Label>
                  <Input id="delivery-time" defaultValue="2-5 business days" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shipping-fee">Standard Shipping Fee</Label>
                  <Input id="shipping-fee" defaultValue="GH₵ 15.00" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Free Shipping</p>
                    <p className="text-sm text-gray-500">Free shipping on orders over GH₵ 200</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Express Delivery</p>
                    <p className="text-sm text-gray-500">1-2 day delivery for GH₵ 30</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                <p className="mt-1 text-sm text-gray-500">Manage email and push notifications</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Order Notifications</p>
                    <p className="text-sm text-gray-500">Receive alerts for new orders</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Customer Messages</p>
                    <p className="text-sm text-gray-500">Get notified about customer inquiries</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Low Stock Alerts</p>
                    <p className="text-sm text-gray-500">Alert when products are running low</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Marketing Updates</p>
                    <p className="text-sm text-gray-500">Receive platform updates and tips</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                <p className="mt-1 text-sm text-gray-500">Manage account security and authentication</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                  <div>
                    <p className="font-medium text-gray-900">Login Alerts</p>
                    <p className="text-sm text-gray-500">Get notified of new login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button className="bg-orange-500 hover:bg-orange-600">Update Password</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
