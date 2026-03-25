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
    Check,
    Filter,
    Package,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

interface TagItem {
    id: string;
    name: string;
    slug: string;
    productCount: number;
    status: "active" | "inactive";
    trend?: "up" | "down";
}

interface ProductTag {
    productId: string;
    productName: string;
    tags: string[];
}

export default function SellerTags() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductTag | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const availableTags: TagItem[] = [
        { id: "1", name: "New Arrival", slug: "new-arrival", productCount: 45, status: "active", trend: "up" },
        { id: "2", name: "Best Seller", slug: "best-seller", productCount: 32, status: "active", trend: "up" },
        { id: "3", name: "Sale", slug: "sale", productCount: 28, status: "active" },
        { id: "4", name: "Featured", slug: "featured", productCount: 22, status: "active", trend: "up" },
        { id: "5", name: "Limited Edition", slug: "limited-edition", productCount: 15, status: "active" },
        { id: "6", name: "Clearance", slug: "clearance", productCount: 12, status: "active" },
        { id: "7", name: "Trending", slug: "trending", productCount: 18, status: "active", trend: "up" },
        { id: "8", name: "Popular", slug: "popular", productCount: 35, status: "active" },
        { id: "9", name: "Seasonal", slug: "seasonal", productCount: 8, status: "inactive" },
        { id: "10", name: "Bundle", slug: "bundle", productCount: 6, status: "active" },
    ];

    const productsWithTags: ProductTag[] = [
        { productId: "PROD-001", productName: "Wireless Bluetooth Headphones", tags: ["New Arrival", "Best Seller"] },
        { productId: "PROD-002", productName: "Smart Watch Series 5", tags: ["Featured", "Trending"] },
        { productId: "PROD-003", productName: "Laptop Stand Adjustable", tags: ["Sale"] },
        { productId: "PROD-004", productName: "USB-C Hub 7-in-1", tags: ["New Arrival", "Popular"] },
        { productId: "PROD-005", productName: "Wireless Mouse Ergonomic", tags: [] },
        { productId: "PROD-006", productName: "Mechanical Keyboard RGB", tags: ["Best Seller", "Trending"] },
    ];

    const stats = {
        totalTags: availableTags.length,
        activeTags: availableTags.filter(t => t.status === "active").length,
        totalTaggedProducts: productsWithTags.filter(p => p.tags.length > 0).length,
        mostUsedTag: availableTags.sort((a, b) => b.productCount - a.productCount)[0],
    };

    const filteredTags = availableTags.filter(tag => 
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tag.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleTag = (tagName: string) => {
        setSelectedTags(prev => 
            prev.includes(tagName) 
                ? prev.filter(t => t !== tagName)
                : [...prev, tagName]
        );
    };

    const assignTags = () => {
        console.log("Assigning tags:", selectedTags, "to product:", selectedProduct?.productName);
        setShowAssignModal(false);
        setSelectedTags([]);
        setSelectedProduct(null);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SellerSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
            
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Tags</h1>
                            <p className="text-sm text-gray-600">Assign tags to products to improve visibility</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                {stats.mostUsedTag.name} - Most Used
                            </Badge>
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Total Tags</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalTags}</p>
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
                                        <p className="text-sm text-gray-500">Active Tags</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.activeTags}</p>
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
                                        <p className="text-sm text-gray-500">Tagged Products</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.totalTaggedProducts}</p>
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
                                        <p className="text-sm text-gray-500">Top Tag</p>
                                        <p className="text-lg font-bold text-orange-600">{stats.mostUsedTag.name}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-orange-100">
                                        <TrendingUp className="h-5 w-5 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Available Tags */}
                    <Card className="border-0 shadow-sm mb-6">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">Available Tags</h3>
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search tags..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredTags.map((tag) => (
                                    <div 
                                        key={tag.id}
                                        className={`p-4 border rounded-lg transition-colors ${
                                            tag.status === 'active' 
                                                ? 'border-gray-200 hover:border-orange-300 hover:bg-orange-50' 
                                                : 'border-gray-100 bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge className={`${
                                                tag.trend === 'up' ? 'bg-green-100 text-green-700' :
                                                tag.trend === 'down' ? 'bg-red-100 text-red-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {tag.name}
                                            </Badge>
                                            {tag.trend && (
                                                tag.trend === 'up' 
                                                    ? <TrendingUp className="h-4 w-4 text-green-500" />
                                                    : <TrendingDown className="h-4 w-4 text-red-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {tag.productCount} products
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">/{tag.slug}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products with Tags */}
                    <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Products & Tags</h3>
                            
                            <div className="space-y-4">
                                {productsWithTags.map((product) => (
                                    <div 
                                        key={product.productId}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                                    >
                                        <div>
                                            <h4 className="font-medium text-gray-900">{product.productName}</h4>
                                            <p className="text-sm text-gray-500">{product.productId}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-2">
                                                {product.tags.length > 0 ? (
                                                    product.tags.map((tag, idx) => (
                                                        <Badge key={idx} variant="secondary">
                                                            {tag}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-sm text-gray-400">No tags assigned</span>
                                                )}
                                            </div>
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setSelectedTags(product.tags);
                                                    setShowAssignModal(true);
                                                }}
                                            >
                                                <Tag className="h-4 w-4 mr-1" />
                                                Manage
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>

            {/* Assign Tags Modal */}
            {showAssignModal && selectedProduct && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-lg mx-4">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Assign Tags</h2>
                                <button 
                                    onClick={() => setShowAssignModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <p className="text-sm text-gray-600">Product:</p>
                                <p className="font-medium text-gray-900">{selectedProduct.productName}</p>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Tags
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {availableTags
                                        .filter(tag => tag.status === "active")
                                        .map((tag) => (
                                            <button
                                                key={tag.id}
                                                onClick={() => toggleTag(tag.name)}
                                                className={`p-3 border rounded-lg text-left transition-colors ${
                                                    selectedTags.includes(tag.name)
                                                        ? 'border-orange-500 bg-orange-50'
                                                        : 'border-gray-200 hover:border-orange-300'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium">{tag.name}</span>
                                                    {selectedTags.includes(tag.name) && (
                                                        <Check className="h-4 w-4 text-orange-500" />
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">{tag.productCount} products</p>
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 mb-2">Selected tags:</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedTags.length > 0 ? (
                                        selectedTags.map((tag, idx) => (
                                            <Badge key={idx} className="bg-orange-100 text-orange-700">
                                                {tag}
                                                <button 
                                                    onClick={() => toggleTag(tag)}
                                                    className="ml-1 hover:text-orange-900"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-400">No tags selected</span>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex gap-3 justify-end">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setShowAssignModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={assignTags}
                                    disabled={selectedTags.length === 0}
                                >
                                    Assign Tags
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
