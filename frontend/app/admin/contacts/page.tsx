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
    MoreVertical,
    Eye,
    CheckCircle,
    Clock,
    AlertCircle,
    User,
    Mail,
    Phone,
    MessageSquare,
    Send,
    Tag,
    ChevronLeft,
    ChevronRight
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const messages = [
    {
        id: "MSG-001",
        name: "John Smith",
        email: "john.smith@email.com",
        subject: "Order not received",
        category: "Order Issues",
        message: "I placed an order 2 weeks ago but still haven't received it. Order #ORD-7829.",
        status: "open",
        priority: "high",
        date: "2024-03-15 10:30",
    },
    {
        id: "MSG-002",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        subject: "How to become a seller?",
        category: "Seller Inquiry",
        message: "I'm interested in selling my products on Fynza. What are the requirements?",
        status: "pending",
        priority: "medium",
        date: "2024-03-15 09:15",
    },
    {
        id: "MSG-003",
        name: "Mike Brown",
        email: "mike.brown@email.com",
        subject: "Refund request",
        category: "Refunds",
        message: "I would like to request a refund for my recent purchase. The product was damaged.",
        status: "in_progress",
        priority: "high",
        date: "2024-03-14 16:45",
    },
    {
        id: "MSG-004",
        name: "Emily Davis",
        email: "emily.d@email.com",
        subject: "Account issue",
        category: "Account",
        message: "I can't log into my account. It says my password is incorrect but I'm sure it's right.",
        status: "resolved",
        priority: "medium",
        date: "2024-03-14 11:20",
    },
    {
        id: "MSG-005",
        name: "David Wilson",
        email: "david.w@email.com",
        subject: "Shipping question",
        category: "Shipping",
        message: "Do you ship to international addresses? If yes, what are the shipping rates?",
        status: "open",
        priority: "low",
        date: "2024-03-13 14:00",
    },
]

const categoryColors: Record<string, string> = {
    "Order Issues": "bg-blue-100 text-blue-700 border-blue-200",
    "Seller Inquiry": "bg-purple-100 text-purple-700 border-purple-200",
    "Refunds": "bg-red-100 text-red-700 border-red-200",
    "Account": "bg-orange-100 text-orange-700 border-orange-200",
    "Shipping": "bg-cyan-100 text-cyan-700 border-cyan-200",
}

const priorityColors: Record<string, string> = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
}

const statusColors: Record<string, string> = {
    open: "bg-red-100 text-red-700 border-red-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    in_progress: "bg-blue-100 text-blue-700 border-blue-200",
    resolved: "bg-green-100 text-green-700 border-green-200",
}

export default function ContactsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 5

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 ml-64">
                <AdminHeader title="Contacts" subtitle="Manage customer support messages" />

                <main className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Messages</p>
                                        <p className="text-2xl font-bold text-gray-900">1,234</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-blue-100">
                                        <MessageSquare className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Open</p>
                                        <p className="text-2xl font-bold text-red-600">45</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-red-100">
                                        <AlertCircle className="h-5 w-5 text-red-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">In Progress</p>
                                        <p className="text-2xl font-bold text-blue-600">23</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-blue-100">
                                        <Clock className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Resolved</p>
                                        <p className="text-2xl font-bold text-green-600">1,166</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-green-100">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
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
                                        placeholder="Search messages..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <select
                                        className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="All">All Status</option>
                                        <option value="open">Open</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                    <Button variant="outline">
                                        <Filter className="h-4 w-4 mr-2" />
                                        More Filters
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Messages */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Messages List */}
                        <Card className="lg:col-span-1 border-0 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-semibold">Messages</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            onClick={() => setSelectedMessage(message)}
                                            className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedMessage?.id === message.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''}`}
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <User className="h-4 w-4 text-gray-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{message.name}</p>
                                                        <p className="text-xs text-gray-500">{message.date}</p>
                                                    </div>
                                                </div>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[message.status]}`}>
                                                    {message.status.replace("_", " ")}
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-medium text-gray-900 mb-1">{message.subject}</h4>
                                            <p className="text-xs text-gray-500 line-clamp-2">{message.message}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${categoryColors[message.category]}`}>
                                                    {message.category}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${priorityColors[message.priority]}`}>
                                                    {message.priority}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="flex items-center justify-between p-4 border-t">
                                    <p className="text-sm text-gray-500">Page {currentPage} of {totalPages}</p>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Message Detail */}
                        <Card className="lg:col-span-2 border-0 shadow-sm">
                            {selectedMessage ? (
                                <>
                                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                                        <div>
                                            <CardTitle className="text-lg font-semibold">{selectedMessage.subject}</CardTitle>
                                            <p className="text-sm text-gray-500">{selectedMessage.id}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Tag className="h-4 w-4 mr-2" />
                                                Categorize
                                            </Button>
                                            {selectedMessage.status !== "resolved" && (
                                                <Button className="bg-green-500 hover:bg-green-600" size="sm">
                                                    <CheckCircle className="h-4 w-4 mr-2" />
                                                    Mark Resolved
                                                </Button>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Contact Info */}
                                        <div className="flex items-center gap-6 p-4 rounded-lg bg-gray-50">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                <User className="h-6 w-6 text-gray-500" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">{selectedMessage.name}</p>
                                                <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">Received</p>
                                                <p className="text-sm font-medium text-gray-900">{selectedMessage.date}</p>
                                            </div>
                                        </div>

                                        {/* Message Content */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
                                            <div className="p-4 rounded-lg border">
                                                <p className="text-gray-900">{selectedMessage.message}</p>
                                            </div>
                                        </div>

                                        {/* Reply */}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500 mb-2">Reply</h3>
                                            <textarea
                                                className="w-full min-h-[120px] p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                                placeholder="Type your reply..."
                                            />
                                            <div className="flex justify-between mt-2">
                                                <Button variant="outline" size="sm">
                                                    Attach File
                                                </Button>
                                                <Button className="bg-orange-500 hover:bg-orange-600">
                                                    <Send className="h-4 w-4 mr-2" />
                                                    Send Reply
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </>
                            ) : (
                                <CardContent className="flex items-center justify-center h-96">
                                    <div className="text-center">
                                        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">Select a message to view details</p>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
