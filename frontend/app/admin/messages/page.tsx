'use client'

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Search, 
  Send,
  MoreVertical,
  Check,
  CheckCheck,
  Star,
  Phone,
  Video,
  Image,
  Mail,
  User,
  Building2,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Archive,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface ChatMessage {
  id: string
  sender: "user" | "admin"
  text: string
  time: string
  read?: boolean
}

interface Conversation {
  id: string
  userId: string
  userName: string
  userType: "customer" | "seller" | "guest"
  userAvatar?: string
  email: string
  lastMessage: string
  time: string
  unread: number
  status: "open" | "pending" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  category: string
  messages: ChatMessage[]
}

export default function AdminMessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null)
  const [replyText, setReplyText] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const conversations: Conversation[] = [
    {
      id: "1",
      userId: "cust-1",
      userName: "John Doe",
      userType: "customer",
      email: "john.doe@email.com",
      lastMessage: "I can't complete my payment - it's showing an error",
      time: "10 min ago",
      unread: 2,
      status: "open",
      priority: "high",
      category: "Payment Issue",
      messages: [
        { id: "1", sender: "user", text: "Hi, I'm having trouble with my payment", time: "15 min ago" },
        { id: "2", sender: "user", text: "I can't complete my payment - it's showing an error", time: "10 min ago" },
      ]
    },
    {
      id: "2",
      userId: "seller-1",
      userName: "BEKIA FASHION",
      userType: "seller",
      email: "contact@bekiafashion.com",
      lastMessage: "My products are not appearing in search results",
      time: "1 hour ago",
      unread: 1,
      status: "pending",
      priority: "medium",
      category: "Product Issue",
      messages: [
        { id: "1", sender: "user", text: "My products are not appearing in search results", time: "1 hour ago" },
      ]
    },
    {
      id: "3",
      userId: "cust-2",
      userName: "Sarah Smith",
      userType: "customer",
      email: "sarah.smith@email.com",
      lastMessage: "Thank you for resolving my issue!",
      time: "2 hours ago",
      unread: 0,
      status: "resolved",
      priority: "low",
      category: "Order Inquiry",
      messages: [
        { id: "1", sender: "user", text: "Where is my order?", time: "3 hours ago" },
        { id: "2", sender: "admin", text: "Your order #FYN-2024-001245 has been shipped and is expected to arrive tomorrow.", time: "2 hours ago" },
        { id: "3", sender: "user", text: "Thank you for resolving my issue!", time: "2 hours ago" },
      ]
    },
    {
      id: "4",
      userId: "cust-3",
      userName: "Michael Brown",
      userType: "customer",
      email: "michael.b@email.com",
      lastMessage: "I want to return my order",
      time: "1 day ago",
      unread: 0,
      status: "closed",
      priority: "medium",
      category: "Return Request",
      messages: [
        { id: "1", sender: "user", text: "I want to return my order", time: "1 day ago" },
        { id: "2", sender: "admin", text: "I've initiated the return process. Please check your email for instructions.", time: "1 day ago" },
      ]
    },
    {
      id: "5",
      userId: "guest-1",
      userName: "Guest User",
      userType: "guest",
      email: "guest@email.com",
      lastMessage: "How do I become a seller on Fynza?",
      time: "2 days ago",
      unread: 0,
      status: "resolved",
      priority: "low",
      category: "General Inquiry",
      messages: [
        { id: "1", sender: "user", text: "How do I become a seller on Fynza?", time: "2 days ago" },
        { id: "2", sender: "admin", text: "You can sign up as a seller by visiting /seller and clicking 'Start Selling'. You'll need to verify your business documents.", time: "2 days ago" },
      ]
    },
  ]

  const filteredConversations = conversations.filter(chat => {
    const matchesSearch = chat.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || chat.status === filterStatus
    const matchesPriority = filterPriority === "all" || chat.priority === filterPriority
    return matchesSearch && matchesStatus && matchesPriority
  })

  const totalUnread = conversations.reduce((acc, chat) => acc + chat.unread, 0)
  const openTickets = conversations.filter(c => c.status === "open" || c.status === "pending").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "bg-green-100 text-green-700"
      case "pending": return "bg-yellow-100 text-yellow-700"
      case "resolved": return "bg-blue-100 text-blue-700"
      case "closed": return "bg-gray-100 text-gray-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-700"
      case "high": return "bg-orange-100 text-orange-700"
      case "medium": return "bg-yellow-100 text-yellow-700"
      case "low": return "bg-green-100 text-green-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "seller": return <Building2 className="h-4 w-4" />
      case "customer": return <User className="h-4 w-4" />
      default: return <Mail className="h-4 w-4" />
    }
  }

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log("Sending reply:", replyText)
      setReplyText("")
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onToggle={(open) => setSidebarOpen(open)} />
      
      <div className="flex-1 ml-64">
        <AdminHeader />
        
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Support Messages</h1>
              <p className="text-gray-600">
                {openTickets > 0 ? `${openTickets} open tickets` : "All tickets resolved"} · {totalUnread} unread
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archived
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader className="border-b pb-3">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="pending">Pending</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="all">All Priority</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredConversations.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-orange-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${chat.userType === 'seller' ? 'bg-purple-100' : chat.userType === 'customer' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          {getUserTypeIcon(chat.userType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm ${chat.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                              {chat.userName}
                            </p>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">{chat.time}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={`text-xs ${getStatusColor(chat.status)}`}>
                              {chat.status}
                            </Badge>
                            <Badge className={`text-xs ${getPriorityColor(chat.priority)}`}>
                              {chat.priority}
                            </Badge>
                          </div>
                          <p className={`text-sm truncate ${chat.unread > 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                            {chat.lastMessage}
                          </p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-medium">{chat.unread}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {filteredConversations.length === 0 && (
                  <div className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No messages found</p>
                  </div>
                )}
              </CardContent>
            </Card>

          {/* Chat Detail */}
          <Card className="lg:col-span-2">
            {selectedChat ? (
              <>
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${selectedChat.userType === 'seller' ? 'bg-purple-100' : selectedChat.userType === 'customer' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {getUserTypeIcon(selectedChat.userType)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedChat.userName}</CardTitle>
                        <p className="text-sm text-gray-500">{selectedChat.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(selectedChat.status)}`}>
                        {selectedChat.status}
                      </Badge>
                      <Badge className={`${getPriorityColor(selectedChat.priority)}`}>
                        {selectedChat.priority}
                      </Badge>
                      <Button variant="outline" size="icon">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-sm">
                    <span className="text-gray-500">Category: <span className="font-medium">{selectedChat.category}</span></span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Mark Resolved
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 flex flex-col h-[calc(100vh-420px)]">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {selectedChat.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            msg.sender === 'admin'
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <div className={`flex items-center gap-1 mt-2 text-xs ${
                            msg.sender === 'admin' ? 'text-orange-100' : 'text-gray-500'
                          }`}>
                            <span>{msg.time}</span>
                            {msg.sender === 'admin' && msg.read && (
                              <CheckCheck className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {["Thank you for contacting us!", "We'll look into this immediately", "Is there anything else I can help with?"].map((quick) => (
                      <Button
                        key={quick}
                        variant="outline"
                        size="sm"
                        className="whitespace-nowrap text-xs"
                        onClick={() => setReplyText(quick)}
                      >
                        {quick}
                      </Button>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex gap-2 items-end">
                      <Button variant="outline" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                      <Input
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                        className="flex-1"
                      />
                      <Button 
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center border-0 shadow-none">
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose a chat to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </Card>
        </div>
      </div>
    </div>
    </div>
  )
}
