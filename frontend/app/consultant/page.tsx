'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth-context';

export default function ConsultantDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/consultant');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { label: 'Total Referrals', value: '127', change: '+12%' },
    { label: 'Active Customers', value: '89', change: '+5%' },
    { label: 'Commission Earned', value: 'GH₵ 4,230', change: '+18%' },
    { label: 'Pending Payouts', value: 'GH₵ 560', change: '' },
  ];

  const recentReferrals = [
    { id: 'REF-001', customer: 'John Doe', product: 'iPhone 15 Pro', commission: 'GH₵ 150', status: 'Completed' },
    { id: 'REF-002', customer: 'Sarah Smith', product: 'MacBook Air', commission: 'GH₵ 320', status: 'Pending' },
    { id: 'REF-003', customer: 'Mike Johnson', product: 'AirPods Pro', commission: 'GH₵ 45', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">Consultant Dashboard</h1>
          <p className="text-white/90">Welcome back, {user.name}!</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              {stat.change && (
                <p className="text-sm font-medium text-green-600">{stat.change} this month</p>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Recent Referrals</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentReferrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{referral.customer}</p>
                    <p className="text-sm text-gray-600">{referral.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{referral.commission}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      referral.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {referral.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
