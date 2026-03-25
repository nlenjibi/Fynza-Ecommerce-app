'use client'

import { useState } from "react"
import { SellerSidebar } from "@/components/seller/seller-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Users, Mail, Calendar, MoreVertical, UserCheck, MessageCircle } from "lucide-react"
import Link from "next/link"

interface Follower {
  id: string
  name: string
  email: string
  avatar?: string
  joinedDate: string
  totalOrders: number
  totalSpent: number
  lastActive: string
}

export default function SellerFollowersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [followers, setFollowers] = useState<Follower[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      joinedDate: "2024-01-15",
      totalOrders: 5,
      totalSpent: 1250,
      lastActive: "2 hours ago"
    },
    {
      id: "2",
      name: "Sarah Smith",
      email: "sarah.smith@email.com",
      joinedDate: "2024-02-20",
      totalOrders: 3,
      totalSpent: 890,
      lastActive: "1 day ago"
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.b@email.com",
      joinedDate: "2024-03-10",
      totalOrders: 8,
      totalSpent: 2100,
      lastActive: "3 days ago"
    },
  ])

  const filteredFollowers = followers.filter(follower =>
    follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    follower.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar isOpen={sidebarOpen} onToggle={(open) => setSidebarOpen(open)} />

      <main className={`flex-1 overflow-auto ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-20'}`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Followers</h1>
              <p className="text-gray-600">People following your store ({followers.length})</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search followers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Followers</p>
                    <p className="text-2xl font-bold">{followers.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active This Month</p>
                    <p className="text-2xl font-bold">18</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">New This Week</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg. Follow Age</p>
                    <p className="text-2xl font-bold">45 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Followers List */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Customer</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Joined Date</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Orders</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Total Spent</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Last Active</th>
                      <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredFollowers.map((follower) => (
                      <tr key={follower.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              <span className="text-orange-600 font-semibold">
                                {follower.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{follower.name}</p>
                              <p className="text-sm text-gray-500">{follower.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(follower.joinedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary">{follower.totalOrders} orders</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          GHC {follower.totalSpent.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {follower.lastActive}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link href={`/customer/messages?chat=${follower.id}`}>
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Chat
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredFollowers.length === 0 && (
                <div className="p-12 text-center">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No followers found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
