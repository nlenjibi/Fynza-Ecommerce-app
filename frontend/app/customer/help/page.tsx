"use client";

import { useState } from "react";
import { CustomerSidebar } from "@/components/customer/customer-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Search,
  ChevronRight,
  FileText,
  Package,
  CreditCard,
  Truck,
  RotateCcw,
  User,
  Store,
  Send,
  Check
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

interface ContactOption {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  availability: string;
}

export default function HelpPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: "",
    orderId: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs: FAQ[] = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by going to 'My Orders' in your account dashboard. Click on the order you want to track and you'll see the current status and tracking information.",
      category: "orders",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be unused and in their original packaging. Some items like personal care products may not be eligible for return.",
      category: "returns",
    },
    {
      question: "How do I change my shipping address?",
      answer: "You can change your shipping address before your order is shipped by contacting the seller directly. Once the order is shipped, address changes may not be possible.",
      category: "orders",
    },
    {
      question: "How do I get a refund?",
      answer: "To request a refund, go to your order details and select 'Request Refund'. Once approved, the refund will be processed within 5-7 business days to your original payment method.",
      category: "returns",
    },
    {
      question: "How do I contact a seller?",
      answer: "You can contact a seller through the 'Messages' section in your account. Find your order and click 'Contact Seller' to start a conversation.",
      category: "account",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Mobile Money (MTN, Vodafone, AirtelTigo), credit/debit cards, and bank transfers. All payments are secure and encrypted.",
      category: "payment",
    },
    {
      question: "How do I update my profile information?",
      answer: "Go to 'Profile' in your account settings to update your name, email, phone number, and other personal information.",
      category: "account",
    },
    {
      question: "Where can I find my discount codes?",
      answer: "Discount codes are sent via email and can also be found in your account under 'Coupons' if you've saved any. Check your email notifications as well.",
      category: "payment",
    },
  ];

  const contactOptions: ContactOption[] = [
    {
      id: "chat",
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "Available 24/7",
    },
    {
      id: "email",
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      availability: "Response within 24 hours",
    },
    {
      id: "phone",
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      availability: "Mon-Fri, 9AM-6PM GMT",
    },
  ];

  const categories = [
    { id: "all", label: "All Topics" },
    { id: "orders", label: "Orders" },
    { id: "returns", label: "Returns & Refunds" },
    { id: "payment", label: "Payment" },
    { id: "account", label: "Account" },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitContact = () => {
    console.log("Submitting contact form:", contactForm);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowContactForm(false);
      setContactForm({ subject: "", orderId: "", message: "" });
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Help & Contact</h1>
            <p className="text-gray-600">Find answers or get in touch with our support team</p>
          </div>

          {/* Search */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for help..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {contactOptions.map((option) => (
              <Card 
                key={option.id} 
                className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setShowContactForm(true)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-orange-100">
                      <option.icon className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{option.title}</p>
                      <p className="text-sm text-gray-500">{option.availability}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form Modal */}
          {showContactForm && (
            <Card className="border-0 shadow-sm mb-6">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <select
                        id="subject"
                        className="w-full mt-1 px-3 py-2 border rounded-lg"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      >
                        <option value="">Select a topic</option>
                        <option value="order">Order Issue</option>
                        <option value="payment">Payment Problem</option>
                        <option value="return">Return Request</option>
                        <option value="account">Account Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="orderId">Order ID (optional)</Label>
                      <Input
                        id="orderId"
                        placeholder="e.g., ORD-12345"
                        value={contactForm.orderId}
                        onChange={(e) => setContactForm({...contactForm, orderId: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Describe your issue..."
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowContactForm(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={handleSubmitContact}
                        disabled={!contactForm.subject || !contactForm.message}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Category Filter */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className={selectedCategory === cat.id ? "bg-orange-500 hover:bg-orange-600" : ""}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                  <Badge variant="secondary" className="mt-3">
                    {categories.find(c => c.id === faq.category)?.label}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">Try different keywords or contact our support team</p>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => setShowContactForm(true)}
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Additional Help Links */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Package className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Track Order</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <RotateCcw className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Returns</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <CreditCard className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Payment Issues</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <Truck className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <p className="font-medium text-gray-900">Shipping Info</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
