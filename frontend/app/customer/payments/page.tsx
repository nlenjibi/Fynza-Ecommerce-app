'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CustomerSidebar } from '@/components/customer/customer-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Trash2, Plus, Check, Lock, X, Smartphone, Building, Wallet } from 'lucide-react';
import { useState } from 'react';

interface PaymentMethod {
  id: number;
  type: 'card' | 'mobile_money' | 'bank_transfer';
  name: string;
  last4?: string;
  phone?: string;
  accountNumber?: string;
  bankName?: string;
  expiry?: string;
  isDefault: boolean;
}

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: 'card',
      name: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
    },
    {
      id: 2,
      type: 'mobile_money',
      name: 'MTN Mobile Money',
      phone: '*** *** 4567',
      isDefault: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'card' | 'mobile_money' | 'bank_transfer'>('card');
  const [formData, setFormData] = useState({
    // Card
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    cardType: 'Visa',
    // Mobile Money
    network: 'MTN',
    phoneNumber: '',
    // Bank Transfer
    bankName: '',
    accountNumber: '',
    accountHolder: '',
  });

  const setDefault = (id: number) => {
    setPaymentMethods(methods => 
      methods.map(m => ({ ...m, isDefault: m.id === id }))
    );
  };

  const removePaymentMethod = (id: number) => {
    setPaymentMethods(methods => methods.filter(m => m.id !== id));
  };

  const getNetworkIcon = (network: string) => {
    return <Smartphone className="h-5 w-5" />;
  };

  const handleAddPaymentMethod = () => {
    let newMethod: PaymentMethod;
    const newId = Math.max(...paymentMethods.map(p => p.id), 0) + 1;

    if (paymentType === 'card') {
      if (!formData.cardNumber || !formData.cardHolder || !formData.expiry || !formData.cvv) {
        alert('Please fill in all card details');
        return;
      }
      if (formData.cardNumber.length < 16) {
        alert('Please enter a valid 16-digit card number');
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        alert('Please enter expiry in MM/YY format');
        return;
      }
      if (formData.cvv.length < 3) {
        alert('Please enter a valid CVV');
        return;
      }

      newMethod = {
        id: newId,
        type: 'card',
        name: formData.cardType,
        last4: formData.cardNumber.slice(-4),
        expiry: formData.expiry,
        isDefault: paymentMethods.length === 0,
      };
    } else if (paymentType === 'mobile_money') {
      if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
        alert('Please enter a valid phone number');
        return;
      }

      const networkNames: Record<string, string> = {
        'MTN': 'MTN Mobile Money',
        'Vodafone': 'Vodafone Cash',
        'AirtelTigo': 'AirtelTigo Money',
      };

      newMethod = {
        id: newId,
        type: 'mobile_money',
        name: networkNames[formData.network],
        phone: '*** *** ' + formData.phoneNumber.slice(-4),
        isDefault: paymentMethods.length === 0,
      };
    } else {
      if (!formData.bankName || !formData.accountNumber || !formData.accountHolder) {
        alert('Please fill in all bank details');
        return;
      }
      if (formData.accountNumber.length < 10) {
        alert('Please enter a valid account number');
        return;
      }

      newMethod = {
        id: newId,
        type: 'bank_transfer',
        name: formData.bankName,
        accountNumber: '****' + formData.accountNumber.slice(-4),
        accountHolder: formData.accountHolder,
        isDefault: paymentMethods.length === 0,
      };
    }

    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddModal(false);
    setFormData({
      cardNumber: '',
      cardHolder: '',
      expiry: '',
      cvv: '',
      cardType: 'Visa',
      network: 'MTN',
      phoneNumber: '',
      bankName: '',
      accountNumber: '',
      accountHolder: '',
    });
  };

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard className="h-6 w-6" />;
      case 'mobile_money': return <Smartphone className="h-6 w-6" />;
      case 'bank_transfer': return <Building className="h-6 w-6" />;
      default: return <Wallet className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CustomerSidebar />
          
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6"> Payment Methods</h1>
              
              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.id} 
                    className={`border rounded-lg p-4 flex items-center justify-between ${
                      method.isDefault ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getMethodIcon(method.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{method.name}</span>
                          {method.last4 && <span className="text-gray-500">•••• {method.last4}</span>}
                          {method.phone && <span className="text-gray-500">{method.phone}</span>}
                          {method.accountNumber && <span className="text-gray-500">{method.accountNumber}</span>}
                          {method.isDefault && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {method.type === 'card' && `Expires ${method.expiry}`}
                          {method.type === 'mobile_money' && 'Mobile Money'}
                          {method.type === 'bank_transfer' && `Account: ${method.accountHolder}`}
                        </p>
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

            {/* Payment Type Tabs */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={paymentType === 'card' ? 'default' : 'outline'}
                className={paymentType === 'card' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                onClick={() => setPaymentType('card')}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Card
              </Button>
              <Button
                variant={paymentType === 'mobile_money' ? 'default' : 'outline'}
                className={paymentType === 'mobile_money' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                onClick={() => setPaymentType('mobile_money')}
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Mobile Money
              </Button>
              <Button
                variant={paymentType === 'bank_transfer' ? 'default' : 'outline'}
                className={paymentType === 'bank_transfer' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                onClick={() => setPaymentType('bank_transfer')}
              >
                <Building className="mr-2 h-4 w-4" />
                Bank
              </Button>
            </div>

            {/* Card Form */}
            {paymentType === 'card' && (
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
                  <p className="text-xs text-gray-500 mt-1">Enter 16-digit card number</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Card Holder Name</label>
                  <Input
                    placeholder="JOHN DOE"
                    value={formData.cardHolder}
                    onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value.toUpperCase() })}
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
            )}

            {/* Mobile Money Form */}
            {paymentType === 'mobile_money' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.network}
                    onChange={(e) => setFormData({ ...formData, network: e.target.value })}
                  >
                    <option value="MTN">MTN Mobile Money</option>
                    <option value="Vodafone">Vodafone Cash</option>
                    <option value="AirtelTigo">AirtelTigo Money</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    placeholder="233 24 123 4567"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    maxLength={10}
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number (without 0)</p>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> You will receive a prompt on your phone to authorize the payment.
                  </p>
                </div>
              </div>
            )}

            {/* Bank Transfer Form */}
            {paymentType === 'bank_transfer' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  >
                    <option value="">Select Bank</option>
                    <option value=" Ghana Commercial Bank">Ghana Commercial Bank (GCB)</option>
                    <option value="Ecobank">Ecobank</option>
                    <option value="Access Bank">Access Bank</option>
                    <option value="UT Bank">UT Bank</option>
                    <option value="Fidelity Bank">Fidelity Bank</option>
                    <option value="Stanbic Bank">Stanbic Bank</option>
                    <option value="First Bank of Nigeria">First Bank</option>
                    <option value="Agricultural Development Bank">ADB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <Input
                    placeholder="1234567890"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '').slice(0, 13) })}
                    maxLength={13}
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter 10-13 digit account number</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                  <Input
                    placeholder="JOHN DOE"
                    value={formData.accountHolder}
                    onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value.toUpperCase() })}
                  />
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Account details will be shown after placing your order for bank transfer payment.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                onClick={handleAddPaymentMethod}
              >
                Add Payment Method
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
