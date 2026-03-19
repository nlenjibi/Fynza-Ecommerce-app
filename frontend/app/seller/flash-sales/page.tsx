"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Zap,
    Plus,
    X,
    Check,
    Clock,
    Package,
    TrendingUp,
    DollarSign,
    Timer,
} from "lucide-react";

interface FlashSale {
    id: string;
    name: string;
    description: string;
    discountPercent: number;
    maxProducts: number;
    startDate: string;
    endDate: string;
    status: "active" | "upcoming" | "ended";
    category: string;
    sellerApplied: boolean;
    myProductsCount: number;
    slotsLeft: number;
}

interface AppliedFlashSale {
    id: string;
    flashSaleName: string;
    appliedDate: string;
    productsCount: number;
    ordersGenerated: number;
    revenueGenerated: number;
    status: "active" | "ended";
    timeRemaining: string;
}

export default function SellerFlashSales() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState<"available" | "applied">("available");
    const [searchTerm, setSearchTerm] = useState("");
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState<FlashSale | null>(null);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const flashSales: FlashSale[] = [
        {
            id: "FLASH-001",
            name: "Weekend Flash Sale",
            description: "Super quick deals! Limited time only. Maximum 50% off on selected items.",
            discountPercent: 50,
            maxProducts: 10,
            startDate: "Dec 21, 2024",
            endDate: "Dec 22, 2024",
            status: "upcoming",
            category: "All Categories",
            sellerApplied: false,
            myProductsCount: 0,
            slotsLeft: 15,
        },
        {
            id: "FLASH-002",
            name: "Christmas Eve Special",
            description: "Last minute Christmas deals! Quick 24-hour flash sale with up to 70% off!",
            discountPercent: 70,
            maxProducts: 20,
            startDate: "Dec 24, 2024",
            endDate: "Dec 25, 2024",
            status: "upcoming",
            category: "All Categories",
            sellerApplied: false,
            myProductsCount: 0,
            slotsLeft: 25,
        },
        {
            id: "FLASH-003",
            name: "New Year Countdown",
            description: "Start the year with amazing deals! Ring in the new year with massive discounts!",
            discountPercent: 40,
            maxProducts: 15,
            startDate: "Dec 31, 2024",
            endDate: "Jan 1, 2025",
            status: "upcoming",
            category: "Electronics",
            sellerApplied: false,
            myProductsCount: 0,
            slotsLeft: 8,
        },
        {
            id: "FLASH-004",
            name: "Midnight Madness",
            description: "Late night deals! Shop after midnight for exclusive discounts. 12 hours only!",
            discountPercent: 35,
            maxProducts: 8,
            startDate: "Dec 15, 2024",
            endDate: "Dec 15, 2024",
            status: "active",
            category: "All Categories",
            sellerApplied: true,
            myProductsCount: 6,
            slotsLeft: 2,
        },
    ];

    const appliedSales: AppliedFlashSale[] = [
        {
            id: "APPLIED-001",
            flashSaleName: "Midnight Madness",
            appliedDate: "Dec 14, 2024",
            productsCount: 6,
            ordersGenerated: 42,
            revenueGenerated: 8750,
            status: "active",
            timeRemaining: "8 hours left",
        },
    ];

    const stats = {
        activeFlashSales: flashSales.filter(s => s.status === "active" && s.sellerApplied).length,
        upcomingFlashSales: flashSales.filter(s => s.status === "upcoming").length,
        totalOrders: appliedSales.reduce((sum, s) => sum + s.ordersGenerated, 0),
        totalRevenue: appliedSales.reduce((sum, s) => sum + s.revenueGenerated, 0),
    };

    const filteredSales = flashSales.filter(sale =>
        sale.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-100 text-green-700"><Zap className="h-3 w-3 mr-1" />Active</Badge>;
            case "upcoming":
                return <Badge className="bg-blue-100 text-blue-700"><Clock className="h-3 w-3 mr-1" />Upcoming</Badge>;
            case "ended":
                return <Badge className="bg-gray-100 text-gray-700">Ended</Badge>;
            default:
                return <Badge>{status}</Badge>;
        }
    };

    const handleApply = (sale: FlashSale) => {
        setSelectedSale(sale);
        setShowApplyModal(true);
    };

    const submitApplication = () => {
        console.log("Applying to flash sale:", selectedSale?.name, "with products:", selectedProducts);
        setShowApplyModal(false);
        setSelectedProducts([]);
        setSelectedSale(null);
    };

    const myProducts = [
        { id: "1", name: "Wireless Bluetooth Headphones", price: 150, selected: false },
        { id: "2", name: "Smart Watch Series 5", price: 350, selected: false },
        { id: "3", name: "USB-C Hub 7-in-1", price: 89, selected: false },
        { id: "4", name: "Laptop Stand Adjustable", price: 120, selected: false },
        { id: "5", name: "Wireless Mouse Ergonomic", price: 75, selected: false },
        { id: "6", name: "Mechanical Keyboard RGB", price: 280, selected: false },
    ];

    const toggleProduct = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SellerSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
            
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Flash Sales</h1>
                            <p className="text-sm text-gray-600">Apply to time-limited flash sales for quick sales boosts</p>
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Active Flash Sales</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.activeFlashSales}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-green-100">
                                        <Zap className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Upcoming Sales</p>
                                        <p className="text-2xl font-bold text-blue-600">{stats.upcomingFlashSales}</p>
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
                                        <p className="text-sm text-gray-500">Orders Generated</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-purple-100">
                                        <TrendingUp className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Revenue Generated</p>
                                        <p className="text-2xl font-bold text-green-600">GH₵ {stats.totalRevenue.toLocaleString()}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-green-100">
                                        <DollarSign className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <Button
                            variant={activeTab === "available" ? "default" : "outline"}
                            onClick={() => setActiveTab("available")}
                            className={activeTab === "available" ? "bg-orange-500 hover:bg-orange-600" : ""}
                        >
                            Available Flash Sales
                        </Button>
                        <Button
                            variant={activeTab === "applied" ? "default" : "outline"}
                            onClick={() => setActiveTab("applied")}
                            className={activeTab === "applied" ? "bg-orange-500 hover:bg-orange-600" : ""}
                        >
                            My Applied Sales
                        </Button>
                    </div>

                    {activeTab === "available" ? (
                        <>
                            {/* Search */}
                            <Card className="border-0 shadow-sm mb-6">
                                <CardContent className="p-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <Input
                                            placeholder="Search flash sales..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Available Flash Sales */}
                            <div className="space-y-4">
                                {filteredSales.map((sale) => (
                                    <Card key={sale.id} className={`border-0 shadow-sm ${sale.status === 'active' ? 'ring-2 ring-orange-300' : ''}`}>
                                        <CardContent className="p-6">
                                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <Zap className="h-5 w-5 text-orange-500" />
                                                            <h3 className="font-semibold text-gray-900">{sale.name}</h3>
                                                        </div>
                                                        {getStatusBadge(sale.status)}
                                                        {sale.sellerApplied && (
                                                            <Badge className="bg-green-100 text-green-700">
                                                                <Check className="h-3 w-3 mr-1" />
                                                                Applied
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    
                                                    <p className="text-gray-600 text-sm mb-3">{sale.description}</p>
                                                    
                                                    <div className="flex flex-wrap gap-4 text-sm">
                                                        <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                                                            <Zap className="h-4 w-4" />
                                                            <span className="font-semibold">{sale.discountPercent}% OFF</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-gray-600">
                                                            <Clock className="h-4 w-4" />
                                                            <span>{sale.startDate} - {sale.endDate}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-gray-600">
                                                            <Package className="h-4 w-4" />
                                                            <span>Max {sale.maxProducts} products</span>
                                                        </div>
                                                        {sale.slotsLeft > 0 && (
                                                            <Badge variant="outline" className="text-orange-600 border-orange-300">
                                                                {sale.slotsLeft} slots left
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex flex-col items-end gap-2">
                                                    {sale.sellerApplied ? (
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-500">{sale.myProductsCount} products applied</p>
                                                            <Button variant="outline" size="sm" className="mt-2">
                                                                Manage Products
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button 
                                                            className="bg-orange-500 hover:bg-orange-600"
                                                            onClick={() => handleApply(sale)}
                                                            disabled={sale.slotsLeft === 0}
                                                        >
                                                            <Plus className="h-4 w-4 mr-1" />
                                                            Apply Now
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            {appliedSales.length > 0 ? (
                                <div className="space-y-4">
                                    {appliedSales.map((sale) => (
                                        <Card key={sale.id} className="border-0 shadow-sm">
                                            <CardContent className="p-6">
                                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Zap className="h-5 w-5 text-orange-500" />
                                                            <h3 className="font-semibold text-gray-900">{sale.flashSaleName}</h3>
                                                            {getStatusBadge(sale.status)}
                                                        </div>
                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                            <span>Applied on {sale.appliedDate}</span>
                                                            <Badge variant="outline" className="text-orange-600">
                                                                <Timer className="h-3 w-3 mr-1" />
                                                                {sale.timeRemaining}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-3 gap-6">
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold text-gray-900">{sale.productsCount}</p>
                                                            <p className="text-xs text-gray-500">Products</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold text-gray-900">{sale.ordersGenerated}</p>
                                                            <p className="text-xs text-gray-500">Orders</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-2xl font-bold text-green-600">GH₵ {sale.revenueGenerated.toLocaleString()}</p>
                                                            <p className="text-xs text-gray-500">Revenue</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <Button variant="outline" size="sm">
                                                        Manage Products
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card className="border-0 shadow-sm">
                                    <CardContent className="p-12 text-center">
                                        <Zap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No flash sales applied yet</h3>
                                        <p className="text-gray-600 mb-4">Apply to upcoming flash sales for quick sales boosts!</p>
                                        <Button 
                                            className="bg-orange-500 hover:bg-orange-600"
                                            onClick={() => setActiveTab("available")}
                                        >
                                            View Available Flash Sales
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    )}
                </main>
            </div>

            {/* Apply Modal */}
            {showApplyModal && selectedSale && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-lg mx-4">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Apply to Flash Sale</h2>
                                <button 
                                    onClick={() => setShowApplyModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <div className="bg-orange-50 p-4 rounded-lg mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="h-5 w-5 text-orange-500" />
                                    <h3 className="font-semibold text-orange-900">{selectedSale.name}</h3>
                                </div>
                                <p className="text-sm text-orange-700 mb-2">{selectedSale.description}</p>
                                <div className="flex items-center gap-4 text-sm text-orange-800">
                                    <span className="font-semibold">{selectedSale.discountPercent}% OFF</span>
                                    <span>•</span>
                                    <span>{selectedSale.startDate} - {selectedSale.endDate}</span>
                                    <span>•</span>
                                    <span>Max {selectedSale.maxProducts} products</span>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Products (max {selectedSale.maxProducts})
                                </label>
                                <p className="text-xs text-gray-500 mb-3">
                                    Choose up to {selectedSale.maxProducts} products for this flash sale
                                </p>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {myProducts.slice(0, selectedSale.maxProducts).map((product) => (
                                        <label
                                            key={product.id}
                                            className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                                                selectedProducts.includes(product.id)
                                                    ? 'border-orange-500 bg-orange-50'
                                                    : 'border-gray-200 hover:border-orange-300'
                                            }`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => toggleProduct(product.id)}
                                                disabled={selectedProducts.length >= selectedSale.maxProducts && !selectedProducts.includes(product.id)}
                                                className="h-4 w-4 text-orange-500"
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                <p className="text-xs text-gray-500">GH₵ {product.price} • After discount: GH₵ {(product.price * (1 - selectedSale.discountPercent / 100)).toFixed(2)}</p>
                                            </div>
                                            <Zap className="h-4 w-4 text-orange-500" />
                                        </label>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {selectedProducts.length}/{selectedSale.maxProducts} products selected
                                </p>
                            </div>
                            
                            <div className="flex gap-3 justify-end">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setShowApplyModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    className="bg-orange-500 hover:bg-orange-600"
                                    onClick={submitApplication}
                                    disabled={selectedProducts.length === 0}
                                >
                                    Apply with {selectedProducts.length} Products
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
