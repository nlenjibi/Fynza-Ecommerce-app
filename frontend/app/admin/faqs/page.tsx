"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
    Search,
    Plus,
    X,
    Edit2,
    Trash2,
    Eye,
    EyeOff,
    HelpCircle,
    ChevronDown,
    ChevronUp,
    MessageSquare,
    Check
} from "lucide-react";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    status: "active" | "draft";
    views: number;
    createdAt: string;
    order: number;
}

export default function FAQsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
    
    const [newFaq, setNewFaq] = useState({
        question: "",
        answer: "",
        category: "General",
    });

    const [faqs, setFaqs] = useState<FAQ[]>([
        {
            id: "FAQ-001",
            question: "How do I track my order?",
            answer: "You can track your order by logging into your account and navigating to 'My Orders'. Click on the order you want to track to see the current status and tracking information. You can also track using the tracking number sent to your email.",
            category: "Orders",
            status: "active",
            views: 1250,
            createdAt: "2024-01-15",
            order: 1,
        },
        {
            id: "FAQ-002",
            question: "What is the return policy?",
            answer: "We offer a 30-day return policy for most items. Products must be unused, in original packaging, and with all tags attached. Some items like personal care products, intimate apparel, and digital goods are not eligible for return.",
            category: "Returns",
            status: "active",
            views: 980,
            createdAt: "2024-01-15",
            order: 2,
        },
        {
            id: "FAQ-003",
            question: "How do I become a seller on Fynza?",
            answer: "To become a seller, click on 'Sell on Fynza' at the bottom of the page or go to /seller/register. You'll need to provide business documents, identity verification, and agree to our seller terms. Approval typically takes 2-3 business days.",
            category: "Selling",
            status: "active",
            views: 756,
            createdAt: "2024-01-20",
            order: 3,
        },
        {
            id: "FAQ-004",
            question: "What payment methods are accepted?",
            answer: "We accept Mobile Money (MTN, Vodafone, AirtelTigo), Visa/Mastercard credit and debit cards, and bank transfers. All payments are processed securely through our payment partners.",
            category: "Payments",
            status: "active",
            views: 654,
            createdAt: "2024-01-22",
            order: 4,
        },
        {
            id: "FAQ-005",
            question: "How do I get a refund?",
            answer: "To request a refund, go to your order details and click 'Request Refund'. Select the reason for return and optionally add photos. Once approved, refunds are processed within 5-7 business days to your original payment method.",
            category: "Refunds",
            status: "active",
            views: 542,
            createdAt: "2024-02-01",
            order: 5,
        },
        {
            id: "FAQ-006",
            question: "How can I contact a seller?",
            answer: "You can contact sellers through our messaging system. Go to your order details and click 'Contact Seller'. For general inquiries, you can also use the 'Help & Contact' page.",
            category: "General",
            status: "draft",
            views: 0,
            createdAt: "2024-02-10",
            order: 6,
        },
    ]);

    const categories = ["General", "Orders", "Returns", "Payments", "Refunds", "Selling", "Account", "Shipping"];

    const stats = {
        total: faqs.length,
        active: faqs.filter(f => f.status === "active").length,
        draft: faqs.filter(f => f.status === "draft").length,
        totalViews: faqs.reduce((sum, f) => sum + f.views, 0),
    };

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || faq.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleSaveFaq = () => {
        if (editingFaq) {
            setFaqs(faqs.map(f => f.id === editingFaq.id ? { ...f, ...newFaq } : f));
            setEditingFaq(null);
        } else {
            const newId = `FAQ-${String(faqs.length + 1).padStart(3, '0')}`;
            setFaqs([...faqs, {
                ...newFaq,
                id: newId,
                status: "draft",
                views: 0,
                createdAt: new Date().toISOString().split('T')[0],
                order: faqs.length + 1,
            }]);
        }
        setNewFaq({ question: "", answer: "", category: "General" });
        setShowAddModal(false);
    };

    const toggleFaqStatus = (id: string) => {
        setFaqs(faqs.map(f => f.id === id ? { 
            ...f, 
            status: f.status === "active" ? "draft" : "active" 
        } : f));
    };

    const deleteFaq = (id: string) => {
        if (confirm("Are you sure you want to delete this FAQ?")) {
            setFaqs(faqs.filter(f => f.id !== id));
        }
    };

    const openEditModal = (faq: FAQ) => {
        setEditingFaq(faq);
        setNewFaq({
            question: faq.question,
            answer: faq.answer,
            category: faq.category,
        });
        setShowAddModal(true);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 ml-64">
                <AdminHeader title="FAQs" subtitle="Manage frequently asked questions" />
                
                <main className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total FAQs</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-blue-100">
                                        <HelpCircle className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Active</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-green-100">
                                        <Check className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Drafts</p>
                                        <p className="text-2xl font-bold text-yellow-600">{stats.draft}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-yellow-100">
                                        <Edit2 className="h-5 w-5 text-yellow-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Views</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-purple-100">
                                        <Eye className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Filters & Actions */}
                    <Card className="border-0 shadow-sm mb-6">
                        <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row gap-4 justify-between">
                                <div className="flex-1 flex gap-4">
                                    <div className="relative flex-1 max-w-md">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search FAQs..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <Button 
                                    className="bg-orange-500 hover:bg-orange-600"
                                    onClick={() => {
                                        setEditingFaq(null);
                                        setNewFaq({ question: "", answer: "", category: "General" });
                                        setShowAddModal(true);
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add FAQ
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* FAQs List */}
                    <div className="space-y-4">
                        {filteredFaqs.map((faq) => (
                            <Card key={faq.id} className="border-0 shadow-sm">
                                <CardContent className="p-0">
                                    <div 
                                        className="p-4 cursor-pointer"
                                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge variant="secondary">{faq.category}</Badge>
                                                    <Badge className={faq.status === "active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                                                        {faq.status}
                                                    </Badge>
                                                </div>
                                                <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {expandedFaq === faq.id ? faq.answer : `${faq.answer.substring(0, 100)}...`}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Eye className="h-4 w-4" />
                                                    {faq.views}
                                                </span>
                                                {expandedFaq === faq.id ? (
                                                    <ChevronUp className="h-5 w-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {expandedFaq === faq.id && (
                                        <div className="border-t px-4 py-3 bg-gray-50 flex items-center justify-between">
                                            <div className="text-sm text-gray-500">
                                                Created: {faq.createdAt} • Order: {faq.order}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => toggleFaqStatus(faq.id)}
                                                >
                                                    {faq.status === "active" ? (
                                                        <>
                                                            <EyeOff className="h-4 w-4 mr-1" />
                                                            Deactivate
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            Activate
                                                        </>
                                                    )}
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => openEditModal(faq)}
                                                >
                                                    <Edit2 className="h-4 w-4 mr-1" />
                                                    Edit
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="text-red-600 hover:text-red-700"
                                                    onClick={() => deleteFaq(faq.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredFaqs.length === 0 && (
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-12 text-center">
                                <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No FAQs found</h3>
                                <p className="text-gray-600 mb-4">Create your first FAQ to help customers</p>
                                <Button 
                                    className="bg-orange-500 hover:bg-orange-600"
                                    onClick={() => setShowAddModal(true)}
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add FAQ
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </main>
            </div>

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <CardTitle>{editingFaq ? "Edit FAQ" : "Add New FAQ"}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Category
                                </label>
                                <select
                                    value={newFaq.category}
                                    onChange={(e) => setNewFaq({...newFaq, category: e.target.value})}
                                    className="w-full px-3 py-2 border rounded-lg"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Question
                                </label>
                                <Textarea
                                    placeholder="Enter the question..."
                                    value={newFaq.question}
                                    onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                                    rows={2}
                                />
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">
                                    Answer
                                </label>
                                <Textarea
                                    placeholder="Enter the answer..."
                                    value={newFaq.answer}
                                    onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                                    rows={6}
                                />
                            </div>
                            
                            <div className="flex gap-3 justify-end pt-4">
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setShowAddModal(false);
                                        setEditingFaq(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    className="bg-orange-500 hover:bg-orange-600"
                                    onClick={handleSaveFaq}
                                    disabled={!newFaq.question || !newFaq.answer}
                                >
                                    {editingFaq ? "Update FAQ" : "Create FAQ"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
