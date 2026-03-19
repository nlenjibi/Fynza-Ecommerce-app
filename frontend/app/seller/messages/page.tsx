'use client'

import { useState } from "react"
import { SellerSidebar } from "@/components/seller/seller-sidebar"
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
  User,
  Headphones,
  AlertCircle,
  HelpCircle,
} from "lucide-react"

interface ChatMessage {
  id: string
  sender: "customer" | "seller" | "support"
  text: string
  time: string
  read?: boolean
}

interface Conversation {
  id: string
  customerId: string
  customerName: string
  customerAvatar?: string
  lastMessage: string
  time: string
  unread: number
  productName?: string
  orderId?: string
  messages: ChatMessage[]
  type?: "customer" | "support"
  category?: string
  priority?: string
  status?: "open" | "pending" | "resolved" | "closed"
}

export default function SellerMessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null)
  const [replyText, setReplyText] = useState("")
  const [showNewChat, setShowNewChat] = useState(false)
  const [showSupportModal, setShowSupportModal] = useState(false)
  const [supportCategory, setSupportCategory] = useState("")
  const [supportPriority, setSupportPriority] = useState("medium")
  const [supportSubject, setSupportSubject] = useState("")
  const [supportMessage, setSupportMessage] = useState("")

  const supportCategories = [
    { value: "payment", label: "Payment Issue" },
    { value: "order", label: "Order Issue" },
    { value: "product", label: "Product Issue" },
    { value: "account", label: "Account/Settings" },
    { value: "technical", label: "Technical Problem" },
    { value: "general", label: "General Inquiry" },
  ]

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ]

  const conversations: Conversation[] = [
    {
      id: "support-1",
      customerId: "support",
      customerName: "Fynza Support",
      lastMessage: "Your ticket has been received. We'll respond shortly.",
      time: "1 hour ago",
      unread: 1,
      type: "support",
      category: "Payment Issue",
      priority: "high",
      status: "pending",
      messages: [
        { id: "1", sender: "seller", text: "I'm having issues with my payouts. The last payment hasn't been processed.", time: "2 hours ago" },
        { id: "2", sender: "support", text: "Your ticket has been received. We'll respond shortly.", time: "1 hour ago" },
      ]
    },
    {
      id: "1",
      customerId: "cust-1",
      customerName: "John Doe",
      lastMessage: "Is this product available in size 42?",
      time: "2 hours ago",
      unread: 2,
      productName: "Women's Lace Up Canvas Sports Shoes",
      orderId: "FYN-2024-001245",
      messages: [
        { id: "1", sender: "customer", text: "Hi, I'm interested in your canvas shoes", time: "3 hours ago" },
        { id: "2", sender: "customer", text: "Is this product available in size 42?", time: "2 hours ago" },
      ]
    },
    {
      id: "2",
      customerId: "cust-2",
      customerName: "Sarah Smith",
      lastMessage: "Thank you for the quick response!",
      time: "1 day ago",
      unread: 0,
      messages: [
        { id: "1", sender: "customer", text: "I have a question about my order", time: "1 day ago" },
        { id: "2", sender: "seller", text: "Of course! How can I help you?", time: "1 day ago" },
        { id: "3", sender: "customer", text: "Thank you for the quick response!", time: "1 day ago" },
      ]
    },
    {
      id: "3",
      customerId: "cust-3",
      customerName: "Michael Brown",
      lastMessage: "Can I get a discount on bulk order?",
      time: "2 days ago",
      unread: 0,
      messages: [
        { id: "1", sender: "customer", text: "Can I get a discount on bulk order?", time: "2 days ago" },
      ]
    },
    {
      id: "4",
      customerId: "cust-4",
      customerName: "Emily Johnson",
      lastMessage: "When will my order be shipped?",
      time: "3 days ago",
      unread: 1,
      productName: "Premium Leather Women's Sandals",
      orderId: "FYN-2024-001230",
      messages: [
        { id: "1", sender: "customer", text: "When will my order be shipped?", time: "3 days ago" },
      ]
    },
  ]

  const filteredConversations = conversations.filter(chat =>
    chat.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const customerConversations = filteredConversations.filter(c => c.type !== "support")
  const supportConversations = filteredConversations.filter(c => c.type === "support")

  const totalUnread = conversations.reduce((acc, chat) => acc + chat.unread, 0)

  const getConversationIcon = (chat: Conversation) => {
    if (chat.type === "support") {
      return (
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Headphones className="text-purple-600 h-5 w-5" />
        </div>
      )
    }
    return (
      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-orange-600 font-semibold">
          {getInitials(chat.customerName)}
        </span>
      </div>
    )
  }

  const getStatusBadge = (chat: Conversation) => {
    if (chat.type === "support" && chat.status) {
      const statusColors: Record<string, string> = {
        open: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        resolved: "bg-blue-100 text-blue-700",
        closed: "bg-gray-100 text-gray-700",
      }
      return (
        <Badge className={`text-xs ${statusColors[chat.status] || "bg-gray-100"}`}>
          {chat.status}
        </Badge>
      )
    }
    if (chat.orderId) {
      return (
        <Badge variant="outline" className="text-xs mb-1">
          Order: {chat.orderId}
        </Badge>
      )
    }
    return null
  }

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log("Sending reply:", replyText)
      setReplyText("")
    }
  }

  const handleSendSupportMessage = () => {
    if (supportSubject.trim() && supportMessage.trim()) {
      console.log("Sending support ticket:", {
        category: supportCategory,
        priority: supportPriority,
        subject: supportSubject,
        message: supportMessage,
      })
      setShowSupportModal(false)
      setSupportSubject("")
      setSupportMessage("")
      setSupportCategory("")
      setSupportPriority("medium")
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar isOpen={sidebarOpen} onToggle={(open) => setSidebarOpen(open)} />

      <main className={`flex-1 overflow-hidden flex flex-col ${sidebarOpen ? 'lg:ml-0' : 'lg:ml-20'}`}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600">
                {totalUnread > 0 ? `${totalUnread} unread messages` : "All caught up!"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowSupportModal(true)}
                variant="outline"
                className="border-purple-500 text-purple-600 hover:bg-purple-50"
              >
                <Headphones className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button 
                onClick={() => setShowNewChat(true)}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                New Message
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Conversations List */}
          <Card className="w-full md:w-80 border-0 shadow-sm rounded-none border-r">
            <CardHeader className="pb-3 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-y-auto h-[calc(100vh-180px)]">
              {/* Support Conversations Section */}
              {supportConversations.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-purple-50 border-b">
                    <p className="text-xs font-semibold text-purple-700 flex items-center gap-1">
                      <Headphones className="h-3 w-3" />
                      Fynza Support
                    </p>
                  </div>
                  {supportConversations.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-b ${
                        selectedChat?.id === chat.id ? 'bg-orange-50' : ''
                      } ${chat.unread > 0 ? 'bg-purple-50/50' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        {getConversationIcon(chat)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm ${chat.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                              {chat.customerName}
                            </p>
                            <span className="text-xs text-gray-500">{chat.time}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusBadge(chat)}
                            {chat.category && (
                              <Badge variant="outline" className="text-xs">
                                {chat.category}
                              </Badge>
                            )}
                          </div>
                          <p className={`text-sm truncate ${chat.unread > 0 ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                            {chat.lastMessage}
                          </p>
                        </div>
                        {chat.unread > 0 && (
                          <div className="h-5 w-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-medium">{chat.unread}</span>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* Customer Conversations Section */}
              <div className="px-4 py-2 bg-gray-50 border-b">
                <p className="text-xs font-semibold text-gray-600">Customers</p>
              </div>
              {customerConversations.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-b ${
                    selectedChat?.id === chat.id ? 'bg-orange-50' : ''
                  } ${chat.unread > 0 ? 'bg-blue-50/50' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    {getConversationIcon(chat)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm ${chat.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {chat.customerName}
                        </p>
                        <span className="text-xs text-gray-500">{chat.time}</span>
                      </div>
                      {getStatusBadge(chat)}
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

              {filteredConversations.length === 0 && (
                <div className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No conversations found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chat Detail */}
          <Card className="flex-1 border-0 shadow-sm rounded-none">
            {selectedChat ? (
              <>
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {selectedChat.type === "support" ? (
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Headphones className="text-purple-600 h-5 w-5" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-orange-600 font-semibold">
                            {getInitials(selectedChat.customerName)}
                          </span>
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg">{selectedChat.customerName}</CardTitle>
                        <p className="text-sm text-gray-500">
                          {selectedChat.type === "support" 
                            ? selectedChat.category || "Support" 
                            : selectedChat.productName || "General Inquiry"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedChat.type !== "support" && (
                        <>
                          <Button variant="outline" size="icon">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Video className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {selectedChat.type === "support" && selectedChat.status && (
                        <Badge className={`text-xs ${
                          selectedChat.status === "open" ? "bg-green-100 text-green-700" :
                          selectedChat.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          selectedChat.status === "resolved" ? "bg-blue-100 text-blue-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {selectedChat.status}
                        </Badge>
                      )}
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {selectedChat.type === "support" && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Priority:</span>
                      <Badge variant="outline" className={`text-xs ${
                        selectedChat.priority === "urgent" ? "bg-red-100 text-red-700" :
                        selectedChat.priority === "high" ? "bg-orange-100 text-orange-700" :
                        selectedChat.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {selectedChat.priority}
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                
                {/* Order Info */}
                {selectedChat.orderId && (
                  <div className="px-6 py-3 bg-gray-50 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600">Regarding order:</span>
                      <span className="font-semibold">{selectedChat.orderId}</span>
                    </div>
                    <Button variant="link" size="sm" className="text-orange-500">
                      View Order
                    </Button>
                  </div>
                )}

                <CardContent className="p-4 flex flex-col h-[calc(100vh-320px)]">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {selectedChat.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            msg.sender === 'seller'
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <div className={`flex items-center gap-1 mt-2 text-xs ${
                            msg.sender === 'seller' ? 'text-orange-100' : 'text-gray-500'
                          }`}>
                            <span>{msg.time}</span>
                            {msg.sender === 'seller' && msg.read && (
                              <CheckCheck className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Responses */}
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {["Thanks for your message!", "I'll check and get back to you", "Your order has been shipped"].map((quick) => (
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

                  {/* Reply Input */}
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
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-500">Choose a chat to view details</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </main>

      {/* Contact Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-purple-600" />
                Contact Fynza Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select 
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  value={supportCategory}
                  onChange={(e) => setSupportCategory(e.target.value)}
                >
                  <option value="">Select a category</option>
                  {supportCategories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <div className="flex gap-2 mt-1">
                  {priorityOptions.map((pri) => (
                    <Button
                      key={pri.value}
                      variant={supportPriority === pri.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSupportPriority(pri.value)}
                      className={supportPriority === pri.value ? "bg-purple-500 hover:bg-purple-600" : ""}
                    >
                      {pri.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <Input 
                  placeholder="Brief description of your issue"
                  className="mt-1"
                  value={supportSubject}
                  onChange={(e) => setSupportSubject(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  placeholder="Describe your issue in detail..."
                  className="w-full mt-1 px-3 py-2 border rounded-lg min-h-[120px]"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="outline" onClick={() => setShowSupportModal(false)}>
                  Cancel
                </Button>
                <Button 
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={handleSendSupportMessage}
                  disabled={!supportSubject.trim() || !supportMessage.trim() || !supportCategory}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
