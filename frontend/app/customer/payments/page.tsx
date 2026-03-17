'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Trash2, Plus, Check, Lock, X } from 'lucide-react';
import { useState } from 'react';

interface PaymentMethod {
  id: number;
  type: string;
  name: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
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

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    cardType: 'Visa',
  });

  const setDefault = (id: number) => {
    setPaymentMethods(methods => 
      methods.map(m => ({ ...m, isDefault: m.id === id }))
    );
  };

  const removePaymentMethod = (id: number) => {
    setPaymentMethods(methods => methods.filter(m => m.id !== id));
  };

  const handleAddPaymentMethod = () => {
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiry || !formData.cvv) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.cardNumber.length < 16) {
      alert('Please enter a valid card number');
      return;
    }

    const last4 = formData.cardNumber.slice(-4);
    const newId = Math.max(...paymentMethods.map(p => p.id), 0) + 1;
    
    setPaymentMethods([...paymentMethods, {
      id: newId,
      type: 'credit_card',
      name: formData.cardType,
      last4,
      expiry: formData.expiry,
      isDefault: paymentMethods.length === 0,
    }]);

    setShowAddModal(false);
    setFormData({
      cardNumber: '',
      cardHolder: '',
      expiry: '',
      cvv: '',
      cardType: 'Visa',
    });
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

              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setShowAddModal(true)}
              >
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

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Add Payment Method</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowAddModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Type</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={formData.cardType}
                  onChange={(e) => setFormData({ ...formData, cardType: e.target.value })}
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="American Express">American Express</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) })}
                  maxLength={16}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder Name</label>
                <Input
                  placeholder="John Doe"
                  value={formData.cardHolder}
                  onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <Input
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      if (value.length > 2) {
                        value = value.slice(0, 2) + '/' + value.slice(2);
                      }
                      setFormData({ ...formData, expiry: value });
                    }}
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <Input
                    placeholder="123"
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                onClick={handleAddPaymentMethod}
              >
                Add Card
              </Button>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
