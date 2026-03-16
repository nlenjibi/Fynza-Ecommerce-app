"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Phone, MoreVertical } from "lucide-react"

const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+233 24 123 4567",
    orders: 12,
    spent: 2847.5,
    status: "active",
    joinDate: "2023-08-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    phone: "+233 24 234 5678",
    orders: 8,
    spent: 1523.75,
    status: "active",
    joinDate: "2023-09-22",
  },
  {
    id: 3,
    name: "Emma Williams",
    email: "emma.w@example.com",
    phone: "+233 24 345 6789",
    orders: 15,
    spent: 3256.0,
    status: "active",
    joinDate: "2023-07-10",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.b@example.com",
    phone: "+233 24 456 7890",
    orders: 3,
    spent: 456.25,
    status: "inactive",
    joinDate: "2023-11-05",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+233 24 567 8901",
    orders: 20,
    spent: 4567.8,
    status: "vip",
    joinDate: "2023-06-01",
  },
]

export function CustomersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search customers..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Contact</th>
                <th className="pb-3 font-medium">Orders</th>
                <th className="pb-3 font-medium">Total Spent</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Join Date</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder-user.jpg" alt={customer.name} />
                        <AvatarFallback>
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Mail className="h-3 w-3" />
                        <span className="text-xs">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Phone className="h-3 w-3" />
                        <span className="text-xs">{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-900">{customer.orders}</td>
                  <td className="py-4 font-medium text-gray-900">GH₵ {customer.spent.toFixed(2)}</td>
                  <td className="py-4">
                    <Badge
                      variant="secondary"
                      className={
                        customer.status === "active"
                          ? "bg-green-100 text-green-700"
                          : customer.status === "vip"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    >
                      {customer.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-4 text-gray-600">{customer.joinDate}</td>
                  <td className="py-4">
                    <button className="rounded p-1 hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1-5 of 8,547 customers</p>
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
