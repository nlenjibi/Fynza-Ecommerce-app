'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'How do I place an order on Fynza?',
      answer: 'Browse our products, add items to your cart, and proceed to checkout. Fill in your delivery details, choose a payment method, and place your order.',
    },
    {
      question: 'What payment methods does Fynza accept?',
      answer: 'We accept Credit/Debit Cards, Mobile Money, and Cash on Delivery. All payments are secured with industry-standard encryption.',
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days within Accra and major cities. Express delivery is available for next-day delivery in select areas.',
    },
    {
      question: 'Can I return or exchange items?',
      answer: 'Yes, we offer a 30-day return policy on most items. Items must be unused and in original packaging. Contact our support team to initiate a return.',
    },
    {
      question: 'How do I track my order?',
      answer: 'You can track your order in real-time through the order details page on your account. You\'ll receive email notifications for each step of the delivery.',
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Yes, we use SSL encryption and comply with international data protection standards to keep your information secure.',
    },
    {
      question: 'How can I become a seller on Fynza?',
      answer: 'Visit our "Sell on Fynza" page and complete the registration process. You\'ll need to verify your business details and comply with our seller policies.',
    },
    {
      question: 'What should I do if I receive a defective item?',
      answer: 'Contact our customer support immediately with photos of the defective item. We\'ll arrange for a replacement or full refund.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">Find answers to common questions about shopping on Fynza</p>

        <div className="bg-white rounded-lg shadow divide-y">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b last:border-b-0">
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-gray-900 text-left">{faq.question}</h3>
                <ChevronDown
                  size={24}
                  className={`text-orange-500 flex-shrink-0 transition ${
                    expanded === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {expanded === index && (
                <div className="px-6 py-4 bg-gray-50 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
          <p className="text-gray-700 mb-4">Can't find the answer you're looking for? Contact our support team.</p>
          <a href="/contact" className="inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded">
            Contact Support
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
