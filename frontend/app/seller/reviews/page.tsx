"use client";

import { useState } from "react";
import { SellerSidebar } from "@/components/seller/seller-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Search,
    Star,
    Filter,
    MessageSquare,
    Check,
    X,
    ThumbsUp,
    ThumbsDown,
    MoreVertical,
    TrendingUp,
} from "lucide-react";

interface Review {
    id: string;
    productId: string;
    productName: string;
    productImage: string;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
    status: "pending" | "approved" | "replied";
    sellerReply?: string;
    helpful: number;
}

export default function SellerReviews() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [replyText, setReplyText] = useState("");
    const [showReplyModal, setShowReplyModal] = useState(false);

    const reviews: Review[] = [
        {
            id: "REV-001",
            productId: "PROD-123",
            productName: "Wireless Bluetooth Headphones",
            productImage: "/api/placeholder/60/60",
            customerName: "John Doe",
            rating: 5,
            comment: "Excellent product! The sound quality is amazing and the battery life is impressive. Fast shipping too!",
            date: "2 hours ago",
            verified: true,
            status: "pending",
            helpful: 12,
        },
        {
            id: "REV-002",
            productId: "PROD-124",
            productName: "Smart Watch Series 5",
            productImage: "/api/placeholder/60/60",
            customerName: "Sarah Johnson",
            rating: 4,
            comment: "Good watch overall. Some features are a bit complicated to set up but once done it works great.",
            date: "1 day ago",
            verified: true,
            status: "approved",
            sellerReply: "Thank you for your feedback! We're working on improving the setup process.",
            helpful: 8,
        },
        {
            id: "REV-003",
            productId: "PROD-125",
            productName: "Laptop Stand Adjustable",
            productImage: "/api/placeholder/60/60",
            customerName: "Michael Brown",
            rating: 3,
            comment: "Decent product but the adjustability mechanism feels a bit loose. Might need to tighten it often.",
            date: "2 days ago",
            verified: true,
            status: "replied",
            sellerReply: "We apologize for the inconvenience. Please contact our support for a replacement.",
            helpful: 5,
        },
        {
            id: "REV-004",
            productId: "PROD-126",
            productName: "USB-C Hub 7-in-1",
            productImage: "/api/placeholder/60/60",
            customerName: "Emily Davis",
            rating: 5,
            comment: "Perfect hub for my MacBook! All ports work flawlessly. Highly recommended!",
            date: "3 days ago",
            verified: true,
            status: "approved",
            helpful: 15,
        },
        {
            id: "REV-005",
            productId: "PROD-127",
            productName: "Wireless Mouse Ergonomic",
            productImage: "/api/placeholder/60/60",
            customerName: "David Wilson",
            rating: 2,
            comment: "The mouse is okay but the scroll wheel makes clicking sounds. Not what I expected for this price.",
            date: "4 days ago",
            verified: false,
            status: "pending",
            helpful: 3,
        },
    ];

    const stats = {
        total: 156,
        averageRating: 4.2,
        fiveStars: 89,
        fourStars: 42,
        threeStars: 15,
        twoStars: 6,
        oneStar: 4,
        pending: 12,
    };

    const filteredReviews = reviews.filter((review) => {
        const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
        const matchesStatus = statusFilter === "all" || review.status === statusFilter;
        return matchesSearch && matchesRating && matchesStatus;
    });

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={16}
                        className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                ))}
            </div>
        );
    };

    const handleReply = (review: Review) => {
        setSelectedReview(review);
        setReplyText(review.sellerReply || "");
        setShowReplyModal(true);
    };

    const submitReply = () => {
        console.log("Submitting reply:", replyText);
        setShowReplyModal(false);
        setReplyText("");
        setSelectedReview(null);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <SellerSidebar isOpen={sidebarOpen} onToggle={setSidebarOpen} />
            
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
                            <p className="text-sm text-gray-600">Manage product reviews and respond to customers</p>
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
                                        <p className="text-sm text-gray-500">Total Reviews</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
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
                                        <p className="text-sm text-gray-500">Average Rating</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        </div>
                                    </div>
                                    <div className="p-2 rounded-lg bg-yellow-100">
                                        <Star className="h-5 w-5 text-yellow-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">5-Star Reviews</p>
                                        <p className="text-2xl font-bold text-green-600">{stats.fiveStars}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-green-100">
                                        <TrendingUp className="h-5 w-5 text-green-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">Pending Reviews</p>
                                        <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-orange-100">
                                        <Filter className="h-5 w-5 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Rating Distribution */}
                    <Card className="border-0 shadow-sm mb-6">
                        <CardContent className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                            <div className="space-y-3">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = star === 5 ? stats.fiveStars : star === 4 ? stats.fourStars : star === 3 ? stats.threeStars : star === 2 ? stats.twoStars : stats.oneStar;
                                    const percentage = (count / stats.total) * 100;
                                    
                                    return (
                                        <div key={star} className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 w-16">
                                                <span className="text-sm text-gray-600">{star}</span>
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            </div>
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-yellow-400 rounded-full" 
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Filters */}
                    <Card className="border-0 shadow-sm mb-6">
                        <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search by product or customer..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <select
                                    value={ratingFilter}
                                    onChange={(e) => setRatingFilter(e.target.value)}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="all">All Ratings</option>
                                    <option value="5">5 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="2">2 Stars</option>
                                    <option value="1">1 Star</option>
                                </select>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="replied">Replied</option>
                                </select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {filteredReviews.map((review) => (
                            <Card key={review.id} className="border-0 shadow-sm">
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                                            <img 
                                                src={review.productImage} 
                                                alt={review.productName}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        
                                        {/* Review Content */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{review.productName}</h4>
                                                    <p className="text-sm text-gray-500">by {review.customerName} • {review.date}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {review.verified && (
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                                            Verified Purchase
                                                        </span>
                                                    )}
                                                    <span className={`px-2 py-1 text-xs rounded-full ${
                                                        review.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        review.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                        'bg-blue-100 text-blue-700'
                                                    }`}>
                                                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 mb-2">
                                                {renderStars(review.rating)}
                                            </div>
                                            
                                            <p className="text-gray-700 mb-3">{review.comment}</p>
                                            
                                            {review.sellerReply && (
                                                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                                                    <p className="text-xs text-gray-500 mb-1">Your Reply:</p>
                                                    <p className="text-sm text-gray-700">{review.sellerReply}</p>
                                                </div>
                                            )}
                                            
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                                                        <ThumbsUp className="h-4 w-4" />
                                                        <span>Helpful ({review.helpful})</span>
                                                    </button>
                                                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                                                        <ThumbsDown className="h-4 w-4" />
                                                        <span>Not Helpful</span>
                                                    </button>
                                                </div>
                                                
                                                {review.status === 'pending' && (
                                                    <div className="flex gap-2">
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            onClick={() => handleReply(review)}
                                                        >
                                                            <MessageSquare className="h-4 w-4 mr-1" />
                                                            Reply
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            <Check className="h-4 w-4 mr-1" />
                                                            Approve
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredReviews.length === 0 && (
                        <Card className="border-0 shadow-sm">
                            <CardContent className="p-12 text-center">
                                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
                                <p className="text-gray-600">Try adjusting your filters or search terms</p>
                            </CardContent>
                        </Card>
                    )}
                </main>
            </div>

            {/* Reply Modal */}
            {showReplyModal && selectedReview && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-lg mx-4">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Reply to Review</h2>
                                <button 
                                    onClick={() => setShowReplyModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <p className="text-sm text-gray-600 mb-2">Original Review:</p>
                                <p className="text-gray-900">{selectedReview.comment}</p>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Reply
                                </label>
                                <textarea
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Write your response to this review..."
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-[120px]"
                                />
                            </div>
                            
                            <div className="flex gap-3 justify-end">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setShowReplyModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={submitReply}
                                    disabled={!replyText.trim()}
                                >
                                    Submit Reply
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
