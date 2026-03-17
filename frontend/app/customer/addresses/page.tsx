'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Edit2, Trash2, Plus, Check } from 'lucide-react';
import { useState } from 'react';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      phone: '+233 24 XXX XXXX',
      address: '123 Main Street',
      city: 'Accra',
      state: 'Greater Accra',
      zipCode: '00233',
      country: 'Ghana',
      isDefault: true,
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      phone: '+233 24 XXX XXXX',
      address: '456 Business Avenue',
      city: 'Accra',
      state: 'Greater Accra',
      zipCode: '00233',
      country: 'Ghana',
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const removeAddress = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const setDefaultAddress = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        <CustomerSidebar />

        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Addresses</h1>
                <p className="text-gray-600">Manage your delivery addresses</p>
              </div>
              <Button
                className="bg-orange-500 hover:bg-orange-600 gap-2"
                onClick={() => {
                  setShowForm(!showForm);
                  setEditingId(null);
                }}
              >
                <Plus className="h-4 w-4" />
                Add New Address
              </Button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  {editingId ? 'Edit Address' : 'Add New Address'}
                </h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <Input placeholder="+233 24 XXX XXXX" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                      <option>Home</option>
                      <option>Office</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <Input placeholder="123 Main Street" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <Input placeholder="Accra" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State/Region</label>
                      <Input placeholder="Greater Accra" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <Input placeholder="00233" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <Input placeholder="Ghana" />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="default" className="rounded" />
                    <label htmlFor="default" className="text-sm text-gray-700">Set as default address</label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      {editingId ? 'Update Address' : 'Save Address'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Addresses List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div key={address.id} className="bg-white rounded-lg shadow p-6 relative">
                  {/* Default Badge */}
                  {address.isDefault && (
                    <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Default
                    </div>
                  )}

                  {/* Address Type */}
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold text-gray-900">{address.type}</span>
                  </div>

                  {/* Address Details */}
                  <div className="space-y-2 mb-6">
                    <p className="font-medium text-gray-900">{address.name}</p>
                    <p className="text-gray-600 text-sm">{address.address}</p>
                    <p className="text-gray-600 text-sm">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-gray-600 text-sm">{address.country}</p>
                    <p className="text-gray-600 text-sm">{address.phone}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => setEditingId(address.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setDefaultAddress(address.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <button
                      onClick={() => removeAddress(address.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {addresses.length === 0 && !showForm && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No addresses yet</h2>
                <p className="text-gray-600 mb-6">Add your first address to get started</p>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 gap-2"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add Address
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
