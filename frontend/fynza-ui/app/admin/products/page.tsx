import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProductsTable } from "@/components/admin/products-table"
import { ProductsStats } from "@/components/admin/products-stats"

export const metadata: Metadata = {
  title: "Products - Admin Dashboard",
  description: "Manage your products",
}

export default function AdminProducts() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="mt-1 text-sm text-gray-500">Manage your product inventory and pricing</p>
            </div>
            <div className="flex gap-3">
              <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Export
              </button>
              <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
                Add Product
              </button>
            </div>
          </div>

          <ProductsStats />
          <ProductsTable />
        </main>
      </div>
    </div>
  )
}
