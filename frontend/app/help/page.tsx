'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Search, Phone, MessageCircle, Mail, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const helpCategories = [
    {
        title: 'Account & Settings',
        icon: '👤',
        topics: [
            { question: 'How do I create an account?', link: '/help/create-account' },
            { question: 'How do I change my password?', link: '/help/change-password' },
            { question: 'How do I update my profile?', link: '/help/update-profile' },
            { question: 'How do I manage notification settings?', link: '/help/notifications' },
        ]
    },
    {
        title: 'Ordering',
        icon: '🛒',
        topics: [
            { question: 'How do I place an order?', link: '/help/place-order' },
            { question: 'Can I modify my order after placing it?', link: '/help/modify-order' },
            { question: 'How do I cancel my order?', link: '/help/cancel-order' },
            { question: 'Where can I view my order history?', link: '/help/order-history' },
        ]
    },
    {
        title: 'Delivery',
        icon: '🚚',
        topics: [
            { question: 'How long does delivery take?', link: '/help/delivery-time' },
            { question: 'How much does delivery cost?', link: '/help/delivery-cost' },
            { question: 'How do I track my order?', link: '/help/track-order' },
            { question: 'What if my order is delayed?', link: '/help/delayed-order' },
        ]
    },
    {
        title: 'Returns & Refunds',
        icon: '↩️',
        topics: [
            { question: 'How do I return a product?', link: '/help/return-product' },
            { question: 'What is the return policy?', link: '/help/return-policy' },
            { question: 'How long do refunds take?', link: '/help/refund-time' },
            { question: 'What items cannot be returned?', link: '/help/non-returnable' },
        ]
    },
    {
        title: 'Payments',
        icon: '💳',
        topics: [
            { question: 'What payment methods are accepted?', link: '/help/payment-methods' },
            { question: 'Is Cash on Delivery available?', link: '/help/cod' },
            { question: 'How do I get a refund?', link: '/help/get-refund' },
            { question: 'Are my payment details secure?', link: '/help/payment-security' },
        ]
    },
    {
        title: 'Selling on Fynza',
        icon: '🏪',
        topics: [
            { question: 'How do I become a seller?', link: '/help/become-seller' },
            { question: 'How do I list my products?', link: '/help/list-products' },
            { question: 'How do I manage my orders?', link: '/help/manage-orders' },
            { question: 'When do I get paid?', link: '/help/seller-payment' },
        ]
    },
];

const faqItems = [
    {
        question: 'How do I track my order?',
        answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You will find tracking information for each order. You can also track your order using the tracking number sent to your email.',
    },
    {
        question: 'What is the delivery timeframe?',
        answer: 'Delivery times vary depending on your location. Standard delivery typically takes 3-7 business days. Express delivery is available for selected items and takes 1-3 business days.',
    },
    {
        question: 'How do I return a product?',
        answer: 'To return a product, go to "My Orders", select the order containing the item you want to return, and click "Return Item". Fill in the return form and our team will contact you within 24-48 hours.',
    },
    {
        question: 'Is Cash on Delivery available?',
        answer: 'Yes, Cash on Delivery (COD) is available for most locations in Ghana. You can select this payment option at checkout.',
    },
    {
        question: 'How do I contact customer support?',
        answer: 'You can contact our customer support team via phone at 030 274 0642, through live chat, or by sending an email. Our team is available 24/7 to assist you.',
    },
];

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 mb-8 text-white">
                    <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
                    <p className="text-orange-100 mb-6">Search our knowledge base or browse categories below</p>
                    <div className="relative max-w-xl">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />
                    </div>
                </div>

                {/* Contact Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
                        <div className="bg-orange-100 p-3 rounded-full">
                            <Phone className="h-6 w-6 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Call Us</h3>
                            <p className="text-sm text-gray-600">030 274 0642</p>
                            <p className="text-xs text-gray-500">Mon-Sat: 8am-8pm</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full">
                            <MessageCircle className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Live Chat</h3>
                            <p className="text-sm text-gray-600">Chat with us</p>
                            <p className="text-xs text-gray-500">Available 24/7</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <Mail className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900">Email Support</h3>
                            <p className="text-sm text-gray-600">support@fynza.com</p>
                            <p className="text-xs text-gray-500">Reply within 24 hours</p>
                        </div>
                    </div>
                </div>

                {/* Help Categories */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {helpCategories.map((category, index) => (
                        <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="bg-orange-500 p-4">
                                <h3 className="font-semibold text-white flex items-center gap-2">
                                    <span className="text-2xl">{category.icon}</span>
                                    {category.title}
                                </h3>
                            </div>
                            <div className="p-4">
                                <ul className="space-y-2">
                                    {category.topics.map((topic, topicIndex) => (
                                        <li key={topicIndex}>
                                            <Link href={topic.link} className="text-sm text-gray-600 hover:text-orange-500 flex items-center gap-2">
                                                <ChevronRight className="h-4 w-4" />
                                                {topic.question}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="bg-white rounded-lg shadow divide-y">
                    {faqItems.map((faq, index) => (
                        <div key={index} className="p-4">
                            <button
                                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                className="w-full text-left flex items-center justify-between"
                            >
                                <span className="font-medium text-gray-900">{faq.question}</span>
                                <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${expandedFAQ === index ? 'rotate-90' : ''}`} />
                            </button>
                            {expandedFAQ === index && (
                                <p className="mt-3 text-gray-600">{faq.answer}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Still Need Help */}
                <div className="mt-8 bg-gray-100 rounded-lg p-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Still need help?</h3>
                    <p className="text-gray-600 mb-4">Our customer support team is here to assist you</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contact">
                            <Button className="bg-orange-500 hover:bg-orange-600">Contact Us</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
