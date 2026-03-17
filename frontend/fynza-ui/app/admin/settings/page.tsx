import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { SettingsTabs } from "@/components/admin/settings-tabs"

export const metadata: Metadata = {
  title: "Settings - Admin Dashboard",
  description: "Configure your platform settings",
}

export default function AdminSettings() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">Manage your platform configuration</p>
          </div>

          <SettingsTabs />
        </main>
      </div>
    </div>
  )
}
