"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TableSkeleton } from "@/components/skeletons"
import {
    Search,
    Filter,
    MoreVertical,
    Eye,
    Ban,
    CheckCircle,
    Mail,
    Phone,
    MapPin,
    ShoppingCart,
    DollarSign,
    Calendar,
    ChevronLeft,
    ChevronRight,
    User,
    ArrowUpDown,
    Download
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const customers = [
    {
        id: "CUS-001",
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        avatar: null,
        location: "New York, NY",
        joinedDate: "2023-01-15",
        lastLogin: "2024-03-15 10:30",
        totalOrders: 24,
        totalSpent: "$2,456.00",
        status: "active",
    },
    {
        id: "CUS-002",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        phone: "+1 (555) 234-5678",
        avatar: null,
        location: "Los Angeles, CA",
        joinedDate: "2023-03-22",
        lastLogin: "2024-03-14 15:45",
        totalOrders: 18,
        totalSpent: "$1,890.00",
        status: "active",
    },
    {
        id: "CUS-003",
        name: "Mike Brown",
        email: "mike.brown@email.com",
        phone: "+1 (555) 345-6789",
        avatar: null,
        location: "Chicago, IL",
        joinedDate: "2023-05-10",
        lastLogin: "2024-03-10 09:20",
        totalOrders: 7,
        totalSpent: "$567.00",
        status: "inactive",
    },
    {
        id: "CUS-004",
        name: "Emily Davis",
        email: "emily.d@email.com",
        phone: "+1 (555) 456-7890",
        avatar: null,
        location: "Houston, TX",
        joinedDate: "2023-07-08",
        lastLogin: "2024-03-15 08:15",
        totalOrders: 31,
        totalSpent: "$3,420.00",
        status: "active",
    },
    {
        id: "CUS-005",
        name: "David Wilson",
        email: "david.w@email.com",
        phone: "+1 (555) 567-8901",
        avatar: null,
        location: "Phoenix, AZ",
        joinedDate: "2023-09-14",
        lastLogin: "2024-03-12 14:30",
        totalOrders: 12,
        totalSpent: "$1,234.00",
        status: "blocked",
    },
]

const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700 border-green-200",
    inactive: "bg-gray-100 text-gray-700 border-gray-200",
    blocked: "bg-red-100 text-red-700 border-red-200",
}

export default function CustomersPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null)
    const [loading, setLoading] = useState(true)
    const totalPages = 15

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500)
        return () => clearTimeout(timer)
    }, [])

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />
                <div className="flex-1 ml-64">
                    <AdminHeader title="Customers" subtitle="Manage customer accounts" />
                    <main className="p-6">
                        <TableSkeleton rows={8} columns={5} />
                    </main>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 ml-64">
                <AdminHeader title="Customers" subtitle="Manage platform customers" />

                <main className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Customers</p>
                                        <p className="text-2xl font-bold text-gray-900">18,234</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-blue-100">
                                        <User className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-green-600 mt-2">+8.2% from last month</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Active</p>
                                        <p className="text-2xl font-bold text-green-600">15,678</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-green-100">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">86% of total</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">New This Month</p>
                                        <p className="text-2xl font-bold text-purple-600">1,234</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-purple-100">
                                        <Calendar className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-green-600 mt-2">+15% vs last month</p>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Revenue</p>
                                        <p className="text-2xl font-bold text-orange-600">$2.4M</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-orange-100">
                                        <DollarSign className="h-5 w-5 text-orange-600" />
                                    </div>
                                </div>
                                <p className="text-xs text-green-600 mt-2">+12% from customers</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters */}
                    <Card className="border-0 shadow-sm mb-6">
                        <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        placeholder="Search by name, email, phone..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <select
                                        className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="All">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="blocked">Blocked</option>
                                    </select>
                                    <Button variant="outline">
                                        <Filter className="h-4 w-4 mr-2" />
                                        More Filters
                                    </Button>
                                    <Button className="bg-orange-500 hover:bg-orange-600">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customers Table */}
                    <Card className="border-0 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <CardTitle className="text-lg font-semibold">All Customers</CardTitle>
                            <p className="text-sm text-gray-500">Showing 1-10 of 18,234 customers</p>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100">
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3 pl-4">
                                                <button className="flex items-center gap-1 hover:text-gray-700">
                                                    Customer <ArrowUpDown className="h-3 w-3" />
                                                </button>
                                            </th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Location</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Orders</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Total Spent</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Joined</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                                            <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {customers.map((customer) => (
                                            <tr key={customer.id} className="hover:bg-gray-50">
                                                <td className="py-4 pl-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10">
                                                            <AvatarFallback className="bg-orange-100 text-orange-600 text-sm">
                                                                {customer.name.split(" ").map(n => n[0]).join("")}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                                                            <p className="text-xs text-gray-500">{customer.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {customer.location}
                                                    </div>
                                                </td>
                                                <td className="py-4 text-sm font-medium text-gray-900">
                                                    {customer.totalOrders}
                                                </td>
                                                <td className="py-4 text-sm font-semibold text-gray-900">{customer.totalSpent}</td>
                                                <td className="py-4 text-sm text-gray-500">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {customer.joinedDate}
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[customer.status]}`}>
                                                        {customer.status}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => setSelectedCustomer(customer)}>
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View Profile
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <ShoppingCart className="h-4 w-4 mr-2" />
                                                                View Orders
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <Mail className="h-4 w-4 mr-2" />
                                                                Send Email
                                                            </DropdownMenuItem>
                                                            {customer.status === "active" ? (
                                                                <DropdownMenuItem className="text-red-600">
                                                                    <Ban className="h-4 w-4 mr-2" />
                                                                    Block Customer
                                                                </DropdownMenuItem>
                                                            ) : customer.status === "blocked" ? (
                                                                <DropdownMenuItem className="text-green-600">
                                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                                    Unblock Customer
                                                                </DropdownMenuItem>
                                                            ) : null}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500">
                                    Page {currentPage} of {totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    {[1, 2, 3, 4, 5].map((page) => (
                                        <Button
                                            key={page}
                                            variant={currentPage === page ? "default" : "outline"}
                                            size="sm"
                                            className={currentPage === page ? "bg-orange-500 hover:bg-orange-600" : ""}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </main>

                {/* Customer Details Modal */}
                {selectedCustomer && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
                            <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white rounded-t-xl">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-14 w-14">
                                        <AvatarFallback className="bg-orange-100 text-orange-600 text-lg">
                                            {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                                        <p className="text-sm text-gray-500">{selectedCustomer.id}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(null)}>
                                    ×
                                </Button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Contact Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Mail className="h-4 w-4" />
                                            <span className="text-xs">Email</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.email}</p>
                                    </div>
                                    <div className="p-4 rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Phone className="h-4 w-4" />
                                            <span className="text-xs">Phone</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{selectedCustomer.phone}</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 rounded-lg border">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <ShoppingCart className="h-4 w-4" />
                                            <span className="text-xs">Total Orders</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{selectedCustomer.totalOrders}</p>
                                    </div>
                                    <div className="p-4 rounded-lg border">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <DollarSign className="h-4 w-4" />
                                            <span className="text-xs">Total Spent</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{selectedCustomer.totalSpent}</p>
                                    </div>
                                    <div className="p-4 rounded-lg border">
                                        <div className="flex items-center gap-2 text-gray-500 mb-1">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-xs">Member Since</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{selectedCustomer.joinedDate}</p>
                                    </div>
                                </div>

                                {/* Last Login */}
                                <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                                    <div className="flex items-center gap-2 text-blue-700 mb-1">
                                        <User className="h-4 w-4" />
                                        <span className="text-sm font-medium">Last Login</span>
                                    </div>
                                    <p className="text-sm text-blue-900">{selectedCustomer.lastLogin}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4 border-t">
                                    <Button className="bg-orange-500 hover:bg-orange-600">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Send Email
                                    </Button>
                                    <Button variant="outline">
                                        <ShoppingCart className="h-4 w-4 mr-2" />
                                        View Orders
                                    </Button>
                                    {selectedCustomer.status === "active" ? (
                                        <Button variant="destructive" className="bg-red-500 hover:bg-red-600 ml-auto">
                                            <Ban className="h-4 w-4 mr-2" />
                                            Block Customer
                                        </Button>
                                    ) : selectedCustomer.status === "blocked" ? (
                                        <Button className="bg-green-500 hover:bg-green-600 ml-auto">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Unblock Customer
                                        </Button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
