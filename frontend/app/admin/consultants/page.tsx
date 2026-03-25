"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye,
  Users,
  Store,
  Mail,
  Phone,
  MapPin,
  FileText,
  Loader2,
  RefreshCw
} from "lucide-react"

interface Application {
  id: string
  storeName: string
  businessType: string
  description: string
  phone: string
  idNumber: string
  address: string
  type: "seller" | "consultant"
  status: "pending" | "approved" | "rejected"
  submittedAt: string
}

export default function ConsultantsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "seller" | "consultant">("all")
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    let stored = localStorage.getItem("fynza_applications")
    
    // Add sample data if empty
    if (!stored) {
      const sampleData: Application[] = [
        {
          id: "APP-001",
          storeName: "TechZone Ghana",
          businessType: "company",
          description: "Electronics and gadgets",
          phone: "+233 50 123 4567",
          idNumber: "GHA-123456789",
          address: "Accra, Ghana",
          type: "seller",
          status: "pending",
          submittedAt: new Date().toISOString()
        },
        {
          id: "APP-002",
          storeName: "Sarah's Fashion Hub",
          businessType: "individual",
          description: "Women's clothing and accessories",
          phone: "+233 55 987 6543",
          idNumber: "GHA-987654321",
          address: "Kumasi, Ghana",
          type: "seller",
          status: "pending",
          submittedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: "APP-003",
          storeName: "John's Consulting Services",
          businessType: "individual",
          description: "Business and marketing consulting",
          phone: "+233 24 456 7890",
          idNumber: "GHA-456789123",
          address: "Takoradi, Ghana",
          type: "consultant",
          status: "pending",
          submittedAt: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: "APP-004",
          storeName: "Premium Electronics",
          businessType: "company",
          description: "Smartphones, laptops and accessories",
          phone: "+233 30 234 5678",
          idNumber: "GHA-321654987",
          address: "Tema, Ghana",
          type: "seller",
          status: "approved",
          submittedAt: new Date(Date.now() - 259200000).toISOString()
        },
        {
          id: "APP-005",
          storeName: "Beauty & Wellness Consultant",
          businessType: "sole proprietor",
          description: "Health and beauty product recommendations",
          phone: "+233 50 345 6789",
          idNumber: "GHA-654987321",
          address: "Cape Coast, Ghana",
          type: "consultant",
          status: "approved",
          submittedAt: new Date(Date.now() - 345600000).toISOString()
        }
      ]
      localStorage.setItem("fynza_applications", JSON.stringify(sampleData))
      stored = JSON.stringify(sampleData)
    }
    
    setApplications(JSON.parse(stored))
  }, [])

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.phone.includes(searchTerm)
    const matchesType = filterType === "all" || app.type === filterType
    const matchesStatus = filterStatus === "all" || app.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleApprove = (app: Application) => {
    setIsProcessing(true)
    setTimeout(() => {
      const updated = applications.map(a => 
        a.id === app.id ? { ...a, status: "approved" as const } : a
      )
      setApplications(updated)
      localStorage.setItem("fynza_applications", JSON.stringify(updated))
      setSelectedApp(null)
      setIsProcessing(false)
    }, 1000)
  }

  const handleReject = (app: Application) => {
    setIsProcessing(true)
    setTimeout(() => {
      const updated = applications.map(a => 
        a.id === app.id ? { ...a, status: "rejected" as const } : a
      )
      setApplications(updated)
      localStorage.setItem("fynza_applications", JSON.stringify(updated))
      setSelectedApp(null)
      setIsProcessing(false)
    }, 1000)
  }

  const pendingCount = applications.filter(a => a.status === "pending").length
  const sellerCount = applications.filter(a => a.type === "seller").length
  const consultantCount = applications.filter(a => a.type === "consultant").length

  const refreshData = () => {
    const stored = localStorage.getItem("fynza_applications")
    if (stored) {
      setApplications(JSON.parse(stored))
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Consultants & Sellers</h1>
              <p className="text-gray-600 mt-1">Manage seller and consultant applications</p>
            </div>
            <Button variant="outline" onClick={refreshData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{applications.length}</p>
                    <p className="text-sm text-gray-600">Total Applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingCount}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Store className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{sellerCount}</p>
                    <p className="text-sm text-gray-600">Sellers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{consultantCount}</p>
                    <p className="text-sm text-gray-600">Consultants</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search by name or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  className="px-3 py-2 border rounded-lg"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                >
                  <option value="all">All Types</option>
                  <option value="seller">Sellers</option>
                  <option value="consultant">Consultants</option>
                </select>
                <select
                  className="px-3 py-2 border rounded-lg"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <Card>
            <CardContent className="p-0">
              {filteredApps.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No applications found</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredApps.map((app) => (
                    <div key={app.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {app.type === "seller" ? (
                            <Store className="w-6 h-6 text-gray-600" />
                          ) : (
                            <Users className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{app.storeName}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="w-3 h-3" />
                            {app.phone}
                            <span className="mx-1">•</span>
                            {app.type === "seller" ? "Seller" : "Consultant"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={app.status === "pending" ? "secondary" : app.status === "approved" ? "default" : "destructive"}>
                          {app.status}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedApp(app)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Application Details</h2>
                <Badge variant={selectedApp.status === "pending" ? "secondary" : selectedApp.status === "approved" ? "default" : "destructive"}>
                  {selectedApp.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {selectedApp.type === "seller" ? (
                    <Store className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Users className="w-5 h-5 text-gray-600" />
                  )}
                  <div>
                    <p className="font-medium">{selectedApp.storeName}</p>
                    <p className="text-sm text-gray-500">{selectedApp.type === "seller" ? "Seller" : "Consultant"} Application</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Business Type</label>
                    <p className="font-medium capitalize">{selectedApp.businessType}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">ID Number</label>
                    <p className="font-medium">{selectedApp.idNumber}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="font-medium">{selectedApp.phone}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Address</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="font-medium">{selectedApp.address}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Description</label>
                  <p className="font-medium">{selectedApp.description}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Submitted</label>
                  <p className="font-medium">{new Date(selectedApp.submittedAt).toLocaleString()}</p>
                </div>
              </div>

              {selectedApp.status === "pending" && (
                <div className="flex gap-3 mt-6">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedApp)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Approve
                  </Button>
                  <Button 
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleReject(selectedApp)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-2" />
                    )}
                    Reject
                  </Button>
                </div>
              )}

              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
