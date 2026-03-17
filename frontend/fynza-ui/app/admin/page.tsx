import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { DashboardMetrics } from "@/components/admin/dashboard-metrics"
import { ContentPerformance } from "@/components/admin/content-performance"
import { ContentByCategory } from "@/components/admin/content-by-category"
import { SystemHistory } from "@/components/admin/system-history"
import { UserActivity } from "@/components/admin/user-activity"

export const metadata: Metadata = {
  title: "Admin Dashboard - Fynza",
  description: "Manage your Fynza e-commerce platform",
}

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fynza Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your e-commerce platform and track performance</p>
            </div>
            <div className="flex gap-3">
              <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Import Content
              </button>
              <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
                New Article
              </button>
            </div>
          </div>

          <DashboardMetrics />

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <ContentPerformance />
            <ContentByCategory />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <SystemHistory />
            <UserActivity />
          </div>
        </main>
      </div>
    </div>
  )
}
