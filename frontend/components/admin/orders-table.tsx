"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye } from "lucide-react"

const orders = [
  {
    id: "#ORD-2024-0001",
    customer: "Sarah Johnson",
    date: "2024-01-06",
    total: 285.5,
    status: "completed",
    items: 3,
  },
  {
    id: "#ORD-2024-0002",
    customer: "Michael Chen",
    date: "2024-01-06",
    total: 142.75,
    status: "pending",
    items: 2,
  },
  {
    id: "#ORD-2024-0003",
    customer: "Emma Williams",
    date: "2024-01-05",
    total: 523.0,
    status: "processing",
    items: 5,
  },
  {
    id: "#ORD-2024-0004",
    customer: "David Brown",
    date: "2024-01-05",
    total: 89.99,
    status: "cancelled",
    items: 1,
  },
  {
    id: "#ORD-2024-0005",
    customer: "Lisa Anderson",
    date: "2024-01-04",
    total: 367.25,
    status: "completed",
    items: 4,
  },
]

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="today">
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                <th className="pb-3 font-medium">Order ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-4 font-medium text-orange-600">{order.id}</td>
                  <td className="py-4 text-gray-900">{order.customer}</td>
                  <td className="py-4 text-gray-600">{order.date}</td>
                  <td className="py-4 text-gray-600">{order.items}</td>
                  <td className="py-4 font-medium text-gray-900">GH₵ {order.total}</td>
                  <td className="py-4">
                    <Badge
                      variant="secondary"
                      className={
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "processing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                      }
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <button className="rounded p-1 hover:bg-gray-100">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1-5 of 1,247 orders</p>
          <div className="flex gap-2">
            <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">Previous</button>
            <button className="rounded bg-orange-500 px-3 py-1 text-sm text-white hover:bg-orange-600">1</button>
            <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">2</button>
            <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">3</button>
            <button className="rounded border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
