'use client';

import { SellerSidebar } from '@/components/seller/seller-sidebar';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Eye, Plus, Search, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function SellerProducts() {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      sku: 'WH-001',
      price: 299.99,
      stock: 45,
      sales: 156,
      rating: 4.8,
      status: 'Active',
    },
    {
      id: 2,
      name: 'USB-C Hub',
      sku: 'USB-002',
      price: 49.99,
      stock: 120,
      sales: 89,
      rating: 4.5,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Phone Case Set',
      sku: 'PC-003',
      price: 29.99,
      stock: 0,
      sales: 234,
      rating: 4.6,
      status: 'Out of Stock',
    },
    {
      id: 4,
      name: 'Screen Protector',
      sku: 'SP-004',
      price: 19.99,
      stock: 200,
      sales: 512,
      rating: 4.9,
      status: 'Active',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
            <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
              <Plus size={18} />
              Add Product
            </Button>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="flex items-center gap-2">
              <Search className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Sales</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Rating</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">{product.sku}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">GH₵ {product.price}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-900">{product.sales}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-gray-900 font-medium">{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Eye size={18} />
                        </button>
                        <button className="p-1 text-orange-600 hover:bg-orange-50 rounded">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
