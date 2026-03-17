'use client';

import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function CustomerAddresses() {
  const addresses = [
    {
      id: 1,
      name: 'Home',
      street: '123 Main Street',
      city: 'Accra',
      region: 'Accra',
      zip: '00100',
      phone: '+233 24 XXX XXXX',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Office',
      street: '456 Business Ave',
      city: 'Accra',
      region: 'Accra',
      zip: '00200',
      phone: '+233 30 XXX XXXX',
      isDefault: false,
    },
    {
      id: 3,
      name: 'Parents House',
      street: '789 Oak Road',
      city: 'Kumasi',
      region: 'Ashanti',
      zip: '00300',
      phone: '+233 24 YYY YYYY',
      isDefault: false,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <CustomerSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
            <Button className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2">
              <Plus size={18} />
              Add New Address
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div key={address.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{address.name}</h3>
                    {address.isDefault && (
                      <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded inline-block mt-1">
                        Default Address
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="text-gray-700 space-y-1 text-sm">
                  <p>{address.street}</p>
                  <p>{address.city}, {address.region} {address.zip}</p>
                  <p className="text-gray-600">{address.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
