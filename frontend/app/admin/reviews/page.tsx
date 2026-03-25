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
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  CheckSquare,
  Star,
  MessageSquare,
} from "lucide-react"

type ReviewStatus = "all" | "pending" | "approved" | "rejected"

interface Review {
  id: number
  productName: string
  productId: number
  userName: string
  userEmail: string
  rating: number
  title: string
  comment: string
  status: ReviewStatus
  verifiedPurchase: boolean
  helpfulCount: number
  createdAt: string
}

const sampleReviews: Review[] = [
  {
    id: 1,
    productName: "iPhone 15 Pro Max",
    productId: 101,
    userName: "John Smith",
    userEmail: "john@example.com",
    rating: 5,
    title: "Amazing phone!",
    comment: "Best phone I've ever owned. The camera quality is incredible and the battery life is amazing. Highly recommend!",
    status: "approved",
    verifiedPurchase: true,
    helpfulCount: 45,
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    productName: "Samsung Galaxy S24",
    productId: 102,
    userName: "Sarah Johnson",
    userEmail: "sarah@example.com",
    rating: 4,
    title: "Great phone but pricey",
    comment: "The phone is great with excellent display. However, the price is a bit high compared to competitors.",
    status: "approved",
    verifiedPurchase: true,
    helpfulCount: 23,
    createdAt: "2024-03-14",
  },
  {
    id: 3,
    productName: "MacBook Pro 16",
    productId: 103,
    userName: "Mike Brown",
    userEmail: "mike@example.com",
    rating: 5,
    title: "Perfect for work",
    comment: "This laptop is a beast for professional work. The M3 chip handles everything smoothly.",
    status: "pending",
    verifiedPurchase: true,
    helpfulCount: 0,
    createdAt: "2024-03-13",
  },
  {
    id: 4,
    productName: "Nike Air Max 270",
    productId: 201,
    userName: "Emily Davis",
    userEmail: "emily@example.com",
    rating: 3,
    title: "Decent but not great",
    comment: "Comfortable but the quality could be better for this price point.",
    status: "rejected",
    verifiedPurchase: false,
    helpfulCount: 0,
    createdAt: "2024-03-12",
  },
  {
    id: 5,
    productName: "Sony WH-1000XM5",
    productId: 104,
    userName: "Alex Wilson",
    userEmail: "alex@example.com",
    rating: 5,
    title: "Best noise cancelling headphones",
    comment: "The noise cancellation is phenomenal. Perfect for commuting and travel.",
    status: "approved",
    verifiedPurchase: true,
    helpfulCount: 67,
    createdAt: "2024-03-11",
  },
  {
    id: 6,
    productName: "Adidas Ultraboost",
    productId: 202,
    userName: "Jennifer Lee",
    userEmail: "jennifer@example.com",
    rating: 4,
    title: "Great running shoes",
    comment: "Very comfortable for running. The boost technology really works well.",
    status: "pending",
    verifiedPurchase: true,
    helpfulCount: 0,
    createdAt: "2024-03-10",
  },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(sampleReviews)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<ReviewStatus>("all")
  const [selectedReviews, setSelectedReviews] = useState<number[]>([])

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: reviews.length,
    pending: reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
    averageRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
  }

  const handleStatusChange = (id: number, newStatus: ReviewStatus) => {
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status: newStatus } : r)))
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter((r) => r.id !== id))
    }
  }

  const handleBulkAction = (action: "approve" | "reject" | "delete") => {
    if (selectedReviews.length === 0) return
    if (!confirm(`${action} ${selectedReviews.length} selected reviews?`)) return

    if (action === "delete") {
      setReviews(reviews.filter((r) => !selectedReviews.includes(r.id)))
    } else {
      const newStatus = action === "approve" ? "approved" : "rejected"
      setReviews(
        reviews.map((r) =>
          selectedReviews.includes(r.id) ? { ...r, status: newStatus as ReviewStatus } : r
        )
      )
    }
    setSelectedReviews([])
  }

  const toggleSelection = (id: number) => {
    setSelectedReviews((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedReviews.length === filteredReviews.length) {
      setSelectedReviews([])
    } else {
      setSelectedReviews(filteredReviews.map((r) => r.id))
    }
  }

  const getStatusColor = (status: ReviewStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-700 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: ReviewStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />
      case "approved":
        return <CheckCircle className="h-3 w-3" />
      case "rejected":
        return <XCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Reviews" subtitle="Manage customer reviews and moderate content" />

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
                <p className="text-sm text-gray-500">Moderate customer reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Total Reviews</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Avg Rating</p>
                <p className="text-3xl font-bold text-purple-600">{stats.averageRating}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === "all" ? "default" : "outline"}
                    size="sm"
                    className={statusFilter === "all" ? "bg-orange-500" : ""}
                    onClick={() => setStatusFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={statusFilter === "pending" ? "default" : "outline"}
                    size="sm"
                    className={statusFilter === "pending" ? "bg-orange-500" : ""}
                    onClick={() => setStatusFilter("pending")}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={statusFilter === "approved" ? "default" : "outline"}
                    size="sm"
                    className={statusFilter === "approved" ? "bg-orange-500" : ""}
                    onClick={() => setStatusFilter("approved")}
                  >
                    Approved
                  </Button>
                  <Button
                    variant={statusFilter === "rejected" ? "default" : "outline"}
                    size="sm"
                    className={statusFilter === "rejected" ? "bg-orange-500" : ""}
                    onClick={() => setStatusFilter("rejected")}
                  >
                    Rejected
                  </Button>
                </div>
              </div>

              {selectedReviews.length > 0 && (
                <div className="flex gap-2 pt-4 mt-4 border-t">
                  <span className="text-sm text-gray-600 mr-2">
                    {selectedReviews.length} selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600 border-green-300"
                    onClick={() => handleBulkAction("approve")}
                  >
                    <CheckSquare className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300"
                    onClick={() => handleBulkAction("reject")}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-300"
                    onClick={() => handleBulkAction("delete")}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-12">
                  <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Found</h3>
                  <p className="text-gray-500">
                    {searchTerm || statusFilter !== "all"
                      ? "No reviews match your current filters."
                      : "No reviews have been submitted yet."}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 border-b">
                    <input
                      type="checkbox"
                      checked={selectedReviews.length === filteredReviews.length}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Select All ({filteredReviews.length})
                    </span>
                  </div>

                  {filteredReviews.map((review) => (
                    <div key={review.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedReviews.includes(review.id)}
                          onChange={() => toggleSelection(review.id)}
                          className="mt-1 h-4 w-4 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{review.userName}</span>
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                  review.status
                                )}`}
                              >
                                {getStatusIcon(review.status)}
                                {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                              </span>
                              {review.verifiedPurchase && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              {"⭐".repeat(review.rating)}
                              <span className="text-gray-400 ml-1">({review.rating}/5)</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            Product: <span className="font-medium">{review.productName}</span>
                          </p>
                          {review.title && (
                            <p className="font-medium text-gray-900 mb-1">{review.title}</p>
                          )}
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{review.createdAt}</span>
                              {review.helpfulCount > 0 && (
                                <span>{review.helpfulCount} found this helpful</span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              {review.status === "pending" && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600"
                                    onClick={() => handleStatusChange(review.id, "approved")}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600"
                                    onClick={() => handleStatusChange(review.id, "rejected")}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDelete(review.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
