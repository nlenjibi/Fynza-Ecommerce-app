'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Trash2, Plus, Check, Lock } from 'lucide-react';
import { useState } from 'react';

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit_card',
      name: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'credit_card',
      name: 'Mastercard',
      last4: '5555',
      expiry: '08/26',
      isDefault: false,
    },
  ]);

  const setDefault = (id: number) => {
    setPaymentMethods(methods => 
      methods.map(m => ({ ...m, isDefault: m.id === id }))
    );
  };

  const removePaymentMethod = (id: number) => {
    setPaymentMethods(methods => methods.filter(m => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CustomerSidebar />
          
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6">Payment Methods</h1>
              
              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className={`border rounded-lg p-4 flex items-center justify-between ${
                      method.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-gray-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{method.name}</span>
                          <span className="text-gray-500">•••• {method.last4}</span>
                          {method.isDefault && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDefault(method.id)}
                        >
                          Set as Default
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removePaymentMethod(method.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg flex items-center gap-2 text-sm text-gray-600">
                <Lock className="h-4 w-4" />
                Your payment information is secure and encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
