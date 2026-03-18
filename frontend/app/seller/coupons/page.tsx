"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Tag,
    Plus,
    X,
    Copy,
    Trash2,
    Edit2,
    Calendar,
    Users,
    Package,
    DollarSign,
    TrendingUp,
} from "lucide-react";

interface Coupon {
    id: string;
    code: string;
    name: string;
    type: "percentage" | "fixed";
    value: number;
    minPurchase?: number;
    maxUses?: number;
    usedCount: number;
    startDate: string;
    endDate: string;
    status: "active" | "scheduled" | "expired" | "paused";
    applicableProducts: string[];
}

export default function SellerCoupons() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        code: "",
        name: "",
        type: "percentage" as "percentage" | "fixed",
        value: "",
        minPurchase: "",
        maxUses: "",
        startDate: "",
        endDate: "",
    });

    const coupons: Coupon[] = [
        {
            id: "COUP-001",
            code: "WELCOME10",
            name: "Welcome Discount",
            type: "percentage",
            value: 10,
            minPurchase: 50,
            maxUses: 100,
            usedCount: 45,
            startDate: "Dec 1, 2024",
            endDate: "Dec 31, 2024",
            status: "active",
            applicableProducts: ["All Products"],
        },
        {
            id: "COUP-002",
            code: "SAVE20",
            name: "GH₵ 20 Off",
            type: "fixed",
            value: 20,
            minPurchase: 100,
            maxUses: 50,
            usedCount: 28,
            startDate: "Dec 10, 2024",
            endDate: "Dec 20, 2024",
            status: "expired",
            applicableProducts: ["Selected Products"],
        },
        {
            id: "COUP-003",
            code: "FREESHIP",
            name: "Free Shipping",
            type: "fixed",
            value: 15,
            minPurchase: 75,
            maxUses: 200,
            usedCount: 156,
            startDate: "Dec 15, 2024",
            endDate: "Jan 15, 2025",
            status: "active",
            applicableProducts: ["All Products"],
        },
        {
            id: "COUP-004",
            code: "VIP25",
            name: "VIP 25% Off",
            type: "percentage",
            value: 25,
            minPurchase: 200,
            maxUses: 20,
            usedCount: 8,
            startDate: "Jan 1, 2025",
            endDate: "Jan 31, 2025",
            status: "scheduled",
            applicableProducts: ["VIP Customers Only"],
        },
    ];

    const stats = {
        totalCoupons: coupons.length,
        activeCoupons: coupons.filter(c => c.status === "active").length,
        totalUsage: coupons.reduce((sum, c) => sum + c.usedCount, 0),
        revenueGenerated: 12450,
    };

    const filteredCoupons = coupons.filter(coupon =>
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-700">Active</Badge>;
            case "scheduled":
                return <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>;
            case "expired":
                return <Badge className="bg-gray-100 text-gray-700">Expired</Badge>;
            case "paused":
                return <Badge className="bg-yellow-100 text-yellow-700">Paused</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const copyToClipboard = (code: string) => {
        navigator.clipboard.writeText(code);
        alert("Coupon code copied!");
    };

    const handleCreateCoupon = () => {
        console.log("Creating coupon:", newCoupon);
        setShowCreateModal(false);
        setNewCoupon({
            code: "",
            name: "",
            type: "percentage",
            value: "",
            minPurchase: "",
            maxUses: "",
            startDate: "",
            endDate: "",
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SellerSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
            
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
                            <p className="text-sm text-gray-600">Create and manage your discount coupons</p>
                        </div>
                        <Button
                            className="bg-orange-500 hover:bg-orange-600"
                            onClick={() => setShowCreateModal(true)}
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Create Coupon
                        </Button>
                    </div>
                </header>

                <main className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Coupons</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalCoupons}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-blue-100">
                                        <Tag className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Active Coupons</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.activeCoupons}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-green-100">
                                        <Users className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Usage</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsage}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-purple-100">
                                        <Package className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Revenue Generated</p>
                                        <p className="text-2xl font-bold text-green-600">GH₵ {stats.revenueGenerated.toLocaleString()}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-green-100">
                                        <DollarSign className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Search */}
                    <Card className="border-0 shadow-sm mb-6">
                        <CardContent className="p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search coupons..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Coupons List */}
                    <div className="space-y-4">
                        {filteredCoupons.map((coupon) => (
                            <Card key={coupon.id} className="border-0 shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold text-gray-900">{coupon.name}</h3>
                                                {getStatusBadge(coupon.status)}
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-4 text-sm mb-3">
                                                <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded">
                                                    <code className="font-mono font-semibold text-gray-900">{coupon.code}</code>
                                                    <button 
                                                        onClick={() => copyToClipboard(coupon.code)}
                                                        className="text-gray-500 hover:text-gray-700"
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <span className={`font-semibold ${coupon.type === 'percentage' ? 'text-blue-600' : 'text-green-600'}`}>
                                                    {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `GH₵ ${coupon.value} OFF`}
                                                </span>
                                                {coupon.minPurchase && (
                                                    <span className="text-gray-500">
                                                        Min: GH₵ {coupon.minPurchase}
                                                    </span>
                                                )}
                                                {coupon.maxUses && (
                                                    <span className="text-gray-500">
                                                        {coupon.usedCount}/{coupon.maxUses} used
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{coupon.startDate} - {coupon.endDate}</span>
                                                </div>
                                                <Badge variant="outline" className="text-xs">
                                                    {coupon.applicableProducts.join(", ")}
                                                </Badge>
                                            </div>
                                        </div>
                                        
                                        {/* Progress bar for usage */}
                                        {coupon.maxUses && (
                                            <div className="w-full lg:w-48 mb-4 lg:mb-0">
                                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                    <span>Usage</span>
                                                    <span>{Math.round((coupon.usedCount / coupon.maxUses) * 100)}%</span>
                                                </div>
                                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full rounded-full ${
                                                            coupon.usedCount / coupon.maxUses > 0.8 
                                                                ? 'bg-red-500' 
                                                                : coupon.usedCount / coupon.maxUses > 0.5 
                                                                    ? 'bg-orange-500' 
                                                                    : 'bg-green-500'
                                                        }`}
                                                        style={{ width: `${(coupon.usedCount / coupon.maxUses) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="flex gap-2">
                                            {coupon.status === "active" && (
                                                <Button variant="outline" size="sm">
                                                    Pause
                                                </Button>
                                            )}
                                            {coupon.status === "paused" && (
                                                <Button variant="outline" size="sm" className="text-green-600">
                                                    Activate
                                                </Button>
                                            )}
                                            <Button variant="outline" size="sm">
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="sm" className="text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredCoupons.length === 0 && (
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-12 text-center">
                                <Tag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No coupons found</h3>
                                <p className="text-gray-600 mb-4">Create your first coupon to attract customers!</p>
                                <Button 
                                    className="bg-orange-500 hover:bg-orange-600"
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Create Coupon
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </main>
            </div>

            {/* Create Coupon Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-lg mx-4">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Create Coupon</h2>
                                <button 
                                    onClick={() => setShowCreateModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Coupon Name
                                    </label>
                                    <Input
                                        placeholder="e.g., Summer Sale Discount"
                                        value={newCoupon.name}
                                        onChange={(e) => setNewCoupon({...newCoupon, name: e.target.value})}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Coupon Code
                                    </label>
                                    <Input
                                        placeholder="e.g., SUMMER20"
                                        value={newCoupon.code}
                                        onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Customers will enter this code at checkout</p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Type
                                        </label>
                                        <select
                                            value={newCoupon.type}
                                            onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value as "percentage" | "fixed"})}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Fixed Amount (GH₵)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount Value
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder={newCoupon.type === "percentage" ? "10" : "20"}
                                            value={newCoupon.value}
                                            onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})}
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Minimum Purchase (GH₵)
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={newCoupon.minPurchase}
                                            onChange={(e) => setNewCoupon({...newCoupon, minPurchase: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Max Uses
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder="Unlimited"
                                            value={newCoupon.maxUses}
                                            onChange={(e) => setNewCoupon({...newCoupon, maxUses: e.target.value})}
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Start Date
                                        </label>
                                        <Input
                                            type="date"
                                            value={newCoupon.startDate}
                                            onChange={(e) => setNewCoupon({...newCoupon, startDate: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            End Date
                                        </label>
                                        <Input
                                            type="date"
                                            value={newCoupon.endDate}
                                            onChange={(e) => setNewCoupon({...newCoupon, endDate: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 justify-end mt-6">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    className="bg-orange-500 hover:bg-orange-600"
                                    onClick={handleCreateCoupon}
                                    disabled={!newCoupon.code || !newCoupon.name || !newCoupon.value}
                                >
                                    Create Coupon
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
