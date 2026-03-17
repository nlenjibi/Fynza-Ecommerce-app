'use client';

import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';

export default function PromotionsPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Promotions & Deals</h1>
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Promotions list will go here */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
