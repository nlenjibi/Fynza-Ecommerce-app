"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  FileText,
  Download,
  Calendar,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Filter,
  Eye
} from "lucide-react"

const reports = [
  {
    id: 1,
    name: "Sales Report",
    description: "Detailed breakdown of all sales transactions",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
    lastGenerated: "2024-03-15",
    frequency: "Daily",
  },
  {
    id: 2,
    name: "Revenue Report",
    description: "Revenue breakdown by category, seller, and period",
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-600",
    lastGenerated: "2024-03-15",
    frequency: "Daily",
  },
  {
    id: 3,
    name: "Order Report",
    description: "Complete order details and status tracking",
    icon: ShoppingCart,
    color: "bg-purple-100 text-purple-600",
    lastGenerated: "2024-03-14",
    frequency: "Daily",
  },
  {
    id: 4,
    name: "Seller Performance",
    description: "Seller metrics including sales, ratings, and activity",
    icon: Users,
    color: "bg-orange-100 text-orange-600",
    lastGenerated: "2024-03-13",
    frequency: "Weekly",
  },
  {
    id: 5,
    name: "Product Performance",
    description: "Top performing products, inventory, and sales data",
    icon: Package,
    color: "bg-cyan-100 text-cyan-600",
    lastGenerated: "2024-03-12",
    frequency: "Weekly",
  },
  {
    id: 6,
    name: "Refund Report",
    description: "Refund requests, reasons, and resolution times",
    icon: RefreshCw,
    color: "bg-red-100 text-red-600",
    lastGenerated: "2024-03-11",
    frequency: "Weekly",
  },
  {
    id: 7,
    name: "Customer Analytics",
    description: "Customer acquisition, retention, and behavior",
    icon: BarChart3,
    color: "bg-indigo-100 text-indigo-600",
    lastGenerated: "2024-03-10",
    frequency: "Monthly",
  },
  {
    id: 8,
    name: "Category Performance",
    description: "Sales and revenue by product category",
    icon: FileText,
    color: "bg-pink-100 text-pink-600",
    lastGenerated: "2024-03-09",
    frequency: "Monthly",
  },
]

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null)
  const [dateRange, setDateRange] = useState({ from: "", to: "" })
  const [exportFormat, setExportFormat] = useState("pdf")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Reports" subtitle="Generate and download platform reports" />
        
        <main className="p-6">
          {/* Filters */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                    <Input 
                      type="date" 
                      value={dateRange.from}
                      onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                    <Input 
                      type="date" 
                      value={dateRange.to}
                      onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select 
                    className="h-10 px-3 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                  >
                    <option value="pdf">PDF</option>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                  </select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {reports.map((report) => {
              const Icon = report.icon
              return (
                <Card key={report.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedReport(report)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${report.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{report.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.lastGenerated}
                      </div>
                      <span className="bg-gray-100 px-2 py-1 rounded">{report.frequency}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Scheduled Reports */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Scheduled Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sales Report", schedule: "Every day at 11:00 PM", recipients: 3, status: "active" },
                  { name: "Weekly Summary", schedule: "Every Monday at 9:00 AM", recipients: 5, status: "active" },
                  { name: "Monthly Revenue", schedule: "1st of every month", recipients: 2, status: "paused" },
                ].map((scheduled, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <Calendar className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{scheduled.name}</p>
                        <p className="text-sm text-gray-500">{scheduled.schedule}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{scheduled.recipients} recipients</p>
                        <p className={`text-xs font-medium ${scheduled.status === "active" ? "text-green-600" : "text-gray-500"}`}>
                          {scheduled.status}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Report Generation Modal */}
        {selectedReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl">
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Generate Report</h2>
                  <p className="text-sm text-gray-500">{selectedReport.name}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>
                  ×
                </Button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input type="date" placeholder="From" />
                    <Input type="date" placeholder="To" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
                  <div className="flex gap-4">
                    {["PDF", "CSV", "Excel"].map((format) => (
                      <label key={format} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="format" 
                          value={format.toLowerCase()}
                          checked={exportFormat === format.toLowerCase()}
                          onChange={(e) => setExportFormat(e.target.value)}
                          className="accent-orange-500"
                        />
                        <span className="text-sm">{format}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Recipients (optional)</label>
                  <Input placeholder="email@example.com, another@example.com" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedReport(null)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                    <Download className="h-4 w-4 mr-2" />
                    Generate & Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
