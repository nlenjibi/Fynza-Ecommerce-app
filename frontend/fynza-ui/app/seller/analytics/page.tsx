'use client';

import { SellerSidebar } from '@/components/seller/seller-sidebar';
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign } from 'lucide-react';

export default function SellerAnalytics() {
  const metrics = [
    {
      label: 'Total Revenue',
      value: 'GH₵ 45,230',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total Orders',
      value: '1,245',
      change: '+12.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total Customers',
      value: '856',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      label: 'Avg Order Value',
      value: 'GH₵ 36.35',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown,
      color: 'bg-red-100 text-red-600',
    },
  ];

  const monthlySales = [
    { month: 'Jan', sales: 4200 },
    { month: 'Feb', sales: 3800 },
    { month: 'Mar', sales: 5200 },
    { month: 'Apr', sales: 4900 },
    { month: 'May', sales: 6100 },
    { month: 'Jun', sales: 5800 },
  ];

  const maxSales = Math.max(...monthlySales.map(d => d.sales));

  return (
    <div className="flex h-screen bg-gray-50">
      <SellerSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics & Reports</h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                  <div className={`${metric.color} rounded-lg p-3`}>
                    <metric.icon size={20} />
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Monthly Sales</h2>
              <div className="space-y-4">
                {monthlySales.map((item) => (
                  <div key={item.month}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.month}</span>
                      <span className="text-sm font-bold text-gray-900">GH₵ {item.sales}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                        style={{ width: `${(item.sales / maxSales) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Categories */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Sales by Category</h2>
              <div className="space-y-4">
                {[
                  { name: 'Electronics', sales: '35%', color: 'bg-blue-500' },
                  { name: 'Accessories', sales: '28%', color: 'bg-green-500' },
                  { name: 'Gadgets', sales: '22%', color: 'bg-orange-500' },
                  { name: 'Others', sales: '15%', color: 'bg-purple-500' },
                ].map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm font-bold text-gray-900">{category.sales}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${category.color} h-2 rounded-full`}
                        style={{ width: category.sales }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
