"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Mail,
  MoreVertical,
  User,
} from "lucide-react"

const subscribers = [
  {
    email: "john.smith@email.com",
    status: "active",
    subscribedAt: "2024-01-15",
  },
  {
    email: "sarah.johnson@email.com",
    status: "active",
    subscribedAt: "2024-01-18",
  },
  {
    email: "mike.brown@email.com",
    status: "active",
    subscribedAt: "2024-01-20",
  },
  {
    email: "emily.davis@email.com",
    status: "unsubscribed",
    subscribedAt: "2024-01-22",
  },
  {
    email: "alex.wilson@email.com",
    status: "active",
    subscribedAt: "2024-01-25",
  },
  {
    email: "jennifer.lee@email.com",
    status: "active",
    subscribedAt: "2024-02-01",
  },
  {
    email: "robert.taylor@email.com",
    status: "unsubscribed",
    subscribedAt: "2024-02-05",
  },
  {
    email: "lisa.anderson@email.com",
    status: "active",
    subscribedAt: "2024-02-10",
  },
  {
    email: "david.martinez@email.com",
    status: "active",
    subscribedAt: "2024-02-15",
  },
  {
    email: "susan.white@email.com",
    status: "active",
    subscribedAt: "2024-02-20",
  },
]

export default function SubscribersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "unsubscribed">("all")

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || sub.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: subscribers.length,
    active: subscribers.filter((s) => s.status === "active").length,
    unsubscribed: subscribers.filter((s) => s.status === "unsubscribed").length,
  }

  const handleExport = () => {
    const csvContent = [
      ["Email", "Status", "Subscribed At"].join(","),
      ...subscribers.map((s) => [s.email, s.status, s.subscribedAt].join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleDelete = (email: string) => {
    if (confirm(`Are you sure you want to delete ${email}?`)) {
      console.log("Delete:", email)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Subscribers" subtitle="Manage newsletter subscribers" />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
                <p className="text-sm text-gray-500">Manage your email subscribers</p>
              </div>
            </div>
            <Button onClick={handleExport} className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Total Subscribers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Unsubscribed</p>
                <p className="text-3xl font-bold text-red-600">{stats.unsubscribed}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === "all" ? "default" : "outline"}
                    size="sm"
                    className={filterStatus === "all" ? "bg-orange-500" : ""}
                    onClick={() => setFilterStatus("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === "active" ? "default" : "outline"}
                    size="sm"
                    className={filterStatus === "active" ? "bg-orange-500" : ""}
                    onClick={() => setFilterStatus("active")}
                  >
                    Active
                  </Button>
                  <Button
                    variant={filterStatus === "unsubscribed" ? "default" : "outline"}
                    size="sm"
                    className={filterStatus === "unsubscribed" ? "bg-orange-500" : ""}
                    onClick={() => setFilterStatus("unsubscribed")}
                  >
                    Unsubscribed
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Email</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Status</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Subscribed</th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                          No subscribers found
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((subscriber) => (
                        <tr key={subscriber.email} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-full">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{subscriber.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                subscriber.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {subscriber.status === "active" ? (
                                <>
                                  <Eye className="h-3 w-3" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <EyeOff className="h-3 w-3" />
                                  Unsubscribed
                                </>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(subscriber.subscribedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDelete(subscriber.email)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <p className="text-sm text-gray-500 mt-4">
            Showing {filteredSubscribers.length} of {subscribers.length} subscribers
          </p>
        </main>
      </div>
    </div>
  )
}
