"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  Clock,
  Users,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Activity,
  Database,
  HardDrive,
  Cpu,
  Trash2,
  RefreshCw,
  Zap,
  AlertTriangle,
  CheckCircle,
  Server,
  Layers,
  Shield,
  Gauge,
  Lock,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"

const contentData = [
  { month: "Jan", published: 45, views: 28 },
  { month: "Feb", published: 52, views: 32 },
  { month: "Mar", published: 48, views: 35 },
  { month: "Apr", published: 61, views: 38 },
  { month: "May", published: 55, views: 42 },
  { month: "Jun", published: 67, views: 45 },
  { month: "Jul", published: 72, views: 48 },
  { month: "Aug", published: 78, views: 52 },
  { month: "Sep", published: 84, views: 55 },
  { month: "Oct", published: 89, views: 58 },
  { month: "Nov", published: 85, views: 62 },
  { month: "Dec", published: 92, views: 68 },
]

const topContent = [
  { title: "Best Selling Products Guide", views: 45230, clicks: 12450, ctr: "27.5%", trend: "up" },
  { title: "Holiday Shopping Tips", views: 38920, clicks: 9870, ctr: "25.4%", trend: "up" },
  { title: "New Arrivals Collection", views: 32450, clicks: 8230, ctr: "25.4%", trend: "down" },
  { title: "Electronics Deals 2024", views: 29870, clicks: 7560, ctr: "25.3%", trend: "up" },
  { title: "Fashion Trends This Season", views: 27650, clicks: 6890, ctr: "24.9%", trend: "up" },
]

const categoryData = [
  { name: "Electronics", engagement: 85, avgTime: "4:32" },
  { name: "Fashion", engagement: 72, avgTime: "3:45" },
  { name: "Home & Living", engagement: 68, avgTime: "5:12" },
  { name: "Beauty", engagement: 65, avgTime: "3:15" },
  { name: "Sports", engagement: 58, avgTime: "2:48" },
]

const cacheData = [
  { name: "Token Cache", hits: 125430, misses: 23450, hitRate: 84.2, size: 45678 },
  { name: "Product Cache", hits: 89234, misses: 34567, hitRate: 72.1, size: 234567 },
  { name: "Category Cache", hits: 56789, misses: 12345, hitRate: 82.1, size: 34567 },
  { name: "User Session", hits: 45678, misses: 8901, hitRate: 83.7, size: 12345 },
]

const dbMetrics = {
  database: { productName: "PostgreSQL", driver: "psycopg2" },
  connectionPool: { active: 5, idle: 15, total: 20, max: 50, utilization: "33%", health: "HEALTHY" },
  queryPerformance: { totalQueries: 15234, slowQueries: 12, avgTime: "45ms", status: "EXCELLENT" },
}

const securityStats = {
  failedLogins: 23,
  hitRate: 94.5,
  accessLogSize: 45678,
  lockoutDuration: 30,
}

const systemMetrics = {
  heapUsed: 245,
  heapMax: 512,
  heapUsedPercent: 47.8,
  nonHeapUsed: 89,
  threadCount: 124,
  peakThreads: 156,
  daemonThreads: 98,
}

const rateLimitData = [
  { endpoint: "/api/products", total: 45678, perMin: 234, perSec: 12, errors: 3 },
  { endpoint: "/api/orders", total: 23456, perMin: 156, perSec: 8, errors: 1 },
  { endpoint: "/api/users", total: 12345, perMin: 89, perSec: 5, errors: 0 },
  { endpoint: "/api/auth", total: 34567, perMin: 178, perSec: 9, errors: 5 },
]

const contentMetrics = [
  {
    title: "Total Page Views",
    value: "1,245,678",
    change: "+18.4%",
    trend: "up",
    icon: Eye,
    color: "blue",
  },
  {
    title: "Total Clicks",
    value: "456,234",
    change: "+23.1%",
    trend: "up",
    icon: MousePointerClick,
    color: "green",
  },
  {
    title: "Avg. Time on Page",
    value: "3:42",
    change: "+8.2%",
    trend: "up",
    icon: Clock,
    color: "purple",
  },
  {
    title: "Unique Visitors",
    value: "234,567",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "orange",
  },
  {
    title: "Bounce Rate",
    value: "42.3%",
    change: "-5.2%",
    trend: "down",
    icon: TrendingDown,
    color: "red",
  },
  {
    title: "Articles Published",
    value: "728",
    change: "+12.5%",
    trend: "up",
    icon: FileText,
    color: "cyan",
  },
]

const colorMap: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  cyan: "bg-cyan-500",
}

const getMemoryColor = (usage: number) => {
  if (usage >= 90) return "text-red-600"
  if (usage >= 75) return "text-yellow-600"
  return "text-green-600"
}

const getMemoryBg = (usage: number) => {
  if (usage >= 90) return "bg-red-100"
  if (usage >= 75) return "bg-yellow-100"
  return "bg-green-100"
}

export default function PerformancePage() {
  const [dateRange, setDateRange] = useState("12months")
  const [selectedCache, setSelectedCache] = useState("")
  const [autoRefresh, setAutoRefresh] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader title="Performance" subtitle="System monitoring and content analytics" />

        <main className="p-6">
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList className="bg-white border-0 shadow-sm">
              <TabsTrigger value="content" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Content</TabsTrigger>
              <TabsTrigger value="system" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">System</TabsTrigger>
              <TabsTrigger value="cache" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Cache</TabsTrigger>
              <TabsTrigger value="database" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Database</TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <Button variant={dateRange === "7days" ? "default" : "outline"} size="sm" className={dateRange === "7days" ? "bg-orange-500" : ""} onClick={() => setDateRange("7days")}>Last 7 Days</Button>
                  <Button variant={dateRange === "30days" ? "default" : "outline"} size="sm" className={dateRange === "30days" ? "bg-orange-500" : ""} onClick={() => setDateRange("30days")}>Last 30 Days</Button>
                  <Button variant={dateRange === "12months" ? "default" : "outline"} size="sm" className={dateRange === "12months" ? "bg-orange-500" : ""} onClick={() => setDateRange("12months")}>Last 12 Months</Button>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Content Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Content</SelectItem>
                      <SelectItem value="articles">Articles</SelectItem>
                      <SelectItem value="products">Products</SelectItem>
                      <SelectItem value="categories">Categories</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
                {contentMetrics.map((metric) => (
                  <Card key={metric.title} className="border-0 shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${colorMap[metric.color].replace('bg-', 'bg-opacity-10 ')}`}>
                          <metric.icon className={`h-5 w-5 ${colorMap[metric.color].replace('bg-', 'text-')}`} />
                        </div>
                        <Badge variant="outline" className={metric.trend === "up" ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}>
                          {metric.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                          {metric.change}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card className="lg:col-span-2 border-0 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <CardTitle className="text-lg font-semibold">Content Performance Trend</CardTitle>
                    <Select defaultValue="12months">
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7days">Last 7 days</SelectItem>
                        <SelectItem value="30days">Last 30 days</SelectItem>
                        <SelectItem value="12months">Last 12 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={contentData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                          <YAxis stroke="#6b7280" fontSize={12} />
                          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                          <Legend wrapperStyle={{ fontSize: "14px" }} />
                          <Line type="monotone" dataKey="published" name="Articles Published" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} />
                          <Line type="monotone" dataKey="views" name="Page Views (K)" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 4 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Engagement by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis type="number" stroke="#6b7280" fontSize={12} />
                          <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={12} width={80} />
                          <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                          <Bar dataKey="engagement" name="Engagement %" fill="#f97316" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Top Performing Content</CardTitle>
                  <Button variant="ghost" size="sm" className="text-orange-600">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Content Title</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Page Views</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Clicks</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">CTR</th>
                          <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Trend</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {topContent.map((content, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 text-sm font-medium text-gray-900">{content.title}</td>
                            <td className="py-3 text-sm text-gray-600">{content.views.toLocaleString()}</td>
                            <td className="py-3 text-sm text-gray-600">{content.clicks.toLocaleString()}</td>
                            <td className="py-3 text-sm text-gray-600">{content.ctr}</td>
                            <td className="py-3">
                              {content.trend === "up" ? <ArrowUpRight className="h-4 w-4 text-green-600" /> : <ArrowDownRight className="h-4 w-4 text-red-600" />}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
                    Auto-refresh
                  </label>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh All
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <HardDrive className="h-5 w-5 text-blue-600" />
                      Memory Usage
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Max Memory</p>
                        <p className="text-2xl font-bold text-gray-900">{systemMetrics.heapMax} MB</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Used Memory</p>
                        <p className="text-2xl font-bold text-gray-900">{systemMetrics.heapUsed} MB</p>
                      </div>
                      <div className={`text-center p-4 rounded-lg ${getMemoryBg(systemMetrics.heapUsedPercent)}`}>
                        <p className="text-sm text-gray-500">Usage</p>
                        <p className={`text-2xl font-bold ${getMemoryColor(systemMetrics.heapUsedPercent)}`}>{systemMetrics.heapUsedPercent}%</p>
                      </div>
                    </div>
                    <div className="relative pt-2">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div style={{ width: `${systemMetrics.heapUsedPercent}%` }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${systemMetrics.heapUsedPercent >= 90 ? 'bg-red-500' : systemMetrics.heapUsedPercent >= 75 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                      </div>
                    </div>
                    {systemMetrics.heapUsedPercent >= 75 && (
                      <div className="flex items-center gap-2 text-red-600 text-sm mt-3">
                        <AlertTriangle className="h-4 w-4" />
                        <span>High memory usage detected!</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <Cpu className="h-5 w-5 text-purple-600" />
                      CPU & Threads
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-500">Thread Count</p>
                        <p className="text-2xl font-bold text-blue-600">{systemMetrics.threadCount}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-gray-500">Peak Threads</p>
                        <p className="text-2xl font-bold text-purple-600">{systemMetrics.peakThreads}</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-500">Daemon Threads</p>
                        <p className="text-2xl font-bold text-green-600">{systemMetrics.daemonThreads}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Non-Heap Memory</span>
                        <span className="text-sm font-medium text-gray-900">{systemMetrics.nonHeapUsed} MB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Server className="h-5 w-5 text-green-600" />
                    Server Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-600">Running</p>
                      <p className="text-sm text-gray-500">All systems operational</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-yellow-600" />
                    Rate Limiting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rateLimitData.map((endpoint, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{endpoint.endpoint}</span>
                          <span className="text-sm text-gray-500">{endpoint.perMin}/min</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-sm">
                          <div className="text-center p-2 bg-white rounded">
                            <span className="text-gray-500 block text-xs">Total</span>
                            <span className="font-medium text-blue-600">{endpoint.total.toLocaleString()}</span>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <span className="text-gray-500 block text-xs">/Min</span>
                            <span className="font-medium text-purple-600">{endpoint.perMin}</span>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <span className="text-gray-500 block text-xs">/Sec</span>
                            <span className="font-medium text-orange-600">{endpoint.perSec}</span>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <span className="text-gray-500 block text-xs">Errors</span>
                            <span className="font-medium text-red-600">{endpoint.errors}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cache" className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100">
                    <Zap className="h-4 w-4 mr-2" />
                    Warmup Cache
                  </Button>
                  <Button variant="outline" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </div>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Layers className="h-5 w-5 text-orange-600" />
                    Cache Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clear Specific Cache</label>
                    <div className="flex gap-2">
                      <Select value={selectedCache} onValueChange={setSelectedCache}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Select a cache..." />
                        </SelectTrigger>
                        <SelectContent>
                          {cacheData.map((cache) => (
                            <SelectItem key={cache.name} value={cache.name}>{cache.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Clear</Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-gray-500 text-sm border-b">
                          <th className="pb-3 font-medium">Cache Name</th>
                          <th className="pb-3 font-medium text-right">Hits</th>
                          <th className="pb-3 font-medium text-right">Misses</th>
                          <th className="pb-3 font-medium text-right">Hit Rate</th>
                          <th className="pb-3 font-medium text-right">Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cacheData.map((cache) => (
                          <tr key={cache.name} className="border-b last:border-0">
                            <td className="py-3 font-medium text-gray-900">{cache.name}</td>
                            <td className="py-3 text-right text-green-600">{cache.hits.toLocaleString()}</td>
                            <td className="py-3 text-right text-orange-600">{cache.misses.toLocaleString()}</td>
                            <td className="py-3 text-right">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${cache.hitRate >= 80 ? 'bg-green-100 text-green-700' : cache.hitRate >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                {cache.hitRate}%
                              </span>
                            </td>
                            <td className="py-3 text-right text-gray-600">{cache.size.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Database className="h-5 w-5 text-indigo-600" />
                    Database Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Database Information</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-500">Product:</span> <span className="font-medium">{dbMetrics.database.productName}</span></div>
                      <div><span className="text-gray-500">Driver:</span> <span className="font-medium">{dbMetrics.database.driver}</span></div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-900">Connection Pool</span>
                      </div>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{dbMetrics.connectionPool.health}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-gray-500 text-xs">Active</p>
                        <p className="font-bold text-blue-600">{dbMetrics.connectionPool.active}</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-gray-500 text-xs">Idle</p>
                        <p className="font-bold text-green-600">{dbMetrics.connectionPool.idle}</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-gray-500 text-xs">Total</p>
                        <p className="font-bold text-gray-600">{dbMetrics.connectionPool.total}</p>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <p className="text-gray-500 text-xs">Max Pool</p>
                        <p className="font-bold text-purple-600">{dbMetrics.connectionPool.max}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Pool Utilization</span>
                        <span className="font-medium">{dbMetrics.connectionPool.utilization}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: dbMetrics.connectionPool.utilization }} />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="h-5 w-5 text-purple-600" />
                      <span className="font-medium text-purple-900">Query Performance</span>
                    </div>
                    <div className="mb-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">{dbMetrics.queryPerformance.status}</span>
                      <span className="ml-2 text-sm text-gray-600">Avg: {dbMetrics.queryPerformance.avgTime}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-500">Total Queries:</span> <span className="font-medium">{dbMetrics.queryPerformance.totalQueries.toLocaleString()}</span></div>
                      <div><span className="text-gray-500">Slow Queries:</span> <span className="font-medium text-red-600">{dbMetrics.queryPerformance.slowQueries}</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" />
                    Security Statistics
                  </CardTitle>
                  <Button variant="outline" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cleanup
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Failed Login Attempts</p>
                      <p className="text-2xl font-bold text-red-600">{securityStats.failedLogins}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Hit Rate</p>
                      <p className="text-2xl font-bold text-green-600">{securityStats.hitRate}%</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <FileText className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Access Log Size</p>
                      <p className="text-2xl font-bold text-gray-900">{securityStats.accessLogSize.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Lock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Lockout Duration</p>
                      <p className="text-2xl font-bold text-gray-900">{securityStats.lockoutDuration} min</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
