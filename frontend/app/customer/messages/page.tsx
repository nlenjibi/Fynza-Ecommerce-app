"use client";

import { useState } from "react";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  Send,
  MoreVertical,
  Check,
  CheckCheck,
  Star,
  Package,
  Store,
  HelpCircle,
  Shield
} from "lucide-react";

interface Message {
  id: string;
  type: "seller" | "support" | "system";
  sender: string;
  avatar?: string;
  subject: string;
  preview: string;
  time: string;
  read: boolean;
  pinned: boolean;
  messages: {
    id: string;
    sender: "user" | "them";
    text: string;
    time: string;
    read?: boolean;
  }[];
}

export default function MessagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showNewMessage, setShowNewMessage] = useState(false);

  const messages: Message[] = [
    {
      id: "1",
      type: "seller",
      sender: "TechStore Ghana",
      subject: "Re: Order #ORD-7821",
      preview: "Thank you for your order. The item is currently being prepared...",
      time: "2 hours ago",
      read: false,
      pinned: true,
      messages: [
        { id: "1", sender: "them", text: "Thank you for your order #ORD-7821. Your item is currently being prepared and will be shipped within 24 hours.", time: "2 hours ago" },
      ]
    },
    {
      id: "2",
      type: "support",
      sender: "Fynza Support",
      subject: "Re: Payment Issue",
      preview: "We have reviewed your payment issue and resolved it...",
      time: "1 day ago",
      read: true,
      pinned: false,
      messages: [
        { id: "1", sender: "them", text: "We have reviewed your payment issue and resolved it. The amount has been refunded to your original payment method.", time: "1 day ago" },
      ]
    },
    {
      id: "3",
      type: "system",
      sender: "Fynza System",
      subject: "Order Delivered",
      preview: "Your order #ORD-7815 has been delivered successfully...",
      time: "2 days ago",
      read: true,
      pinned: false,
      messages: [
        { id: "1", sender: "them", text: "Your order #ORD-7815 has been delivered successfully. Thank you for shopping with us!", time: "2 days ago" },
      ]
    },
    {
      id: "4",
      type: "seller",
      sender: "Fashion Hub",
      subject: "Re: Size Exchange Request",
      preview: "We would be happy to exchange your item for a larger size...",
      time: "3 days ago",
      read: true,
      pinned: false,
      messages: [
        { id: "1", sender: "them", text: "We would be happy to exchange your item for a larger size. Please confirm your shipping address.", time: "3 days ago" },
      ]
    },
  ];

  const filteredMessages = messages.filter(msg =>
    msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter(m => !m.read).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "seller": return <Store className="h-4 w-4" />;
      case "support": return <HelpCircle className="h-4 w-4" />;
      case "system": return <Shield className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "seller": return "bg-blue-100 text-blue-600";
      case "support": return "bg-purple-100 text-purple-600";
      case "system": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log("Sending reply:", replyText);
      setReplyText("");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread messages` : "All caught up!"}
            </p>
          </div>
          <Button 
            onClick={() => setShowNewMessage(true)}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <Card className="border-0 shadow-sm lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-orange-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getTypeColor(message.type)}`}>
                        {getTypeIcon(message.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className={`text-sm ${!message.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                            {message.sender}
                          </p>
                          <div className="flex items-center gap-1">
                            {message.pinned && <Star className="h-3 w-3 text-orange-500 fill-orange-500" />}
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                        </div>
                        <p className={`text-sm truncate ${!message.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {message.preview}
                        </p>
                      </div>
                      {!message.read && (
                        <div className="h-2 w-2 bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {filteredMessages.length === 0 && (
                <div className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No messages found</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Message Detail */}
          <Card className="border-0 shadow-sm lg:col-span-2">
            {selectedMessage ? (
              <>
                <CardHeader className="border-b pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getTypeColor(selectedMessage.type)}`}>
                        {getTypeIcon(selectedMessage.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{selectedMessage.sender}</CardTitle>
                        <p className="text-sm text-gray-500">{selectedMessage.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4 mb-6">
                    {selectedMessage.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            msg.sender === 'user'
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <div className={`flex items-center gap-1 mt-2 text-xs ${
                            msg.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                          }`}>
                            <span>{msg.time}</span>
                            {msg.sender === 'user' && msg.read && (
                              <CheckCheck className="h-3 w-3" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input */}
                  <div className="border-t pt-4">
                    <div className="flex gap-2">
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
              <CardContent className="flex items-center justify-center h-96">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a message</h3>
                  <p className="text-gray-500">Choose a conversation to view details</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader>
              <CardTitle>New Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">To</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-lg">
                  <option>Fynza Support</option>
                  <option>Select a seller...</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <Input placeholder="Enter subject" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea 
                  placeholder="Type your message..."
                  className="w-full mt-1 px-3 py-2 border rounded-lg min-h-[120px]"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowNewMessage(false)}>
                  Cancel
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
