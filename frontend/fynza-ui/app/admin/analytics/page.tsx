import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { AnalyticsOverview } from "@/components/admin/analytics-overview"
import { RevenueChart } from "@/components/admin/revenue-chart"
import { TopProducts } from "@/components/admin/top-products"
import { TrafficSources } from "@/components/admin/traffic-sources"

export const metadata: Metadata = {
  title: "Analytics - Admin Dashboard",
  description: "View platform analytics and insights",
}

export default function AdminAnalytics() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">Track your platform performance and insights</p>
          </div>

          <AnalyticsOverview />

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <TrafficSources />
          </div>

          <div className="mt-6">
            <TopProducts />
          </div>
        </main>
      </div>
    </div>
  )
}
