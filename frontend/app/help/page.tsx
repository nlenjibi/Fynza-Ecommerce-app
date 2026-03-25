'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Search, Phone, MessageCircle, Mail, ChevronRight } from 'lucide-react';
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

    const filteredCategories = helpCategories.map(category => ({
        ...category,
        topics: category.topics.filter(topic =>
            topic.question.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.topics.length > 0);

    const filteredFAQs = faqItems.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const showCategories = searchQuery === '' || filteredCategories.length > 0;
    const showFAQs = searchQuery === '' || filteredFAQs.length > 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 md:p-8 mb-6 text-white shadow-lg">
                    <h1 className="text-2xl md:text-3xl font-bold mb-3">How can we help you today?</h1>
                    <p className="text-orange-200 mb-4 text-sm md:text-base">Find answers quickly by searching our help center</p>
                    <div className="relative max-w-2xl">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for help articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 border border-gray-100">
                        <div className="bg-orange-50 p-3 rounded-full">
                            <Phone className="h-5 w-5 text-orange-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Phone Support</h3>
                            <p className="text-xs text-orange-500 font-medium">030 274 0642</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 border border-gray-100">
                        <div className="bg-blue-50 p-3 rounded-full">
                            <MessageCircle className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Live Chat</h3>
                            <p className="text-xs text-gray-600">Available 24/7</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 border border-gray-100">
                        <div className="bg-green-50 p-3 rounded-full">
                            <Mail className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 text-sm">Email Support</h3>
                            <p className="text-xs text-gray-600">support@fynza.com</p>
                        </div>
                    </div>
                </div>

                {showCategories && (
                    <>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                            {searchQuery ? 'Search Results' : 'Browse Help Topics'}
                        </h2>
                        {filteredCategories.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                {(searchQuery ? filteredCategories : helpCategories).map((category, index) => (
                                    <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100">
                                        <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4">
                                            <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                                                <span className="text-lg">{category.icon}</span>
                                                <span>{category.title}</span>
                                            </h3>
                                        </div>
                                        <div className="p-4">
                                            <ul className="space-y-2">
                                                {category.topics.map((topic, topicIndex) => (
                                                    <li key={topicIndex}>
                                                        <Link href={topic.link} className="text-xs text-gray-600 hover:text-orange-400 flex items-center gap-2 transition-colors">
                                                            <ChevronRight className="h-3 w-3" />
                                                            <span>{topic.question}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 mb-6">
                                <p className="text-gray-500 text-sm">No help topics found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </>
                )}

                {showFAQs && (
                    <>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                            {searchQuery && filteredCategories.length === 0 ? 'Search Results' : 'Frequently Asked Questions'}
                        </h2>
                        {filteredFAQs.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-sm divide-y border border-gray-100 mb-6">
                                {(searchQuery ? filteredFAQs : faqItems).map((faq, index) => (
                                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                                        <button
                                            onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                            className="w-full text-left flex items-center justify-between gap-3"
                                        >
                                            <span className="font-semibold text-gray-900 text-sm">{faq.question}</span>
                                            <ChevronRight className={`h-4 w-4 text-orange-400 transition-transform flex-shrink-0 ${expandedFAQ === index ? 'rotate-90' : ''}`} />
                                        </button>
                                        {expandedFAQ === index && (
                                            <p className="mt-3 text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 mb-6">
                                <p className="text-gray-500 text-sm">No FAQs found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </>
                )}

                {searchQuery && !showCategories && !showFAQs && (
                    <div className="text-center py-10">
                        <div className="text-gray-400 mb-3">
                            <Search className="h-10 w-10 mx-auto" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-600 mb-4 text-sm">We couldn't find anything matching "{searchQuery}"</p>
                        <Button
                            onClick={() => setSearchQuery('')}
                            className="bg-orange-400 hover:bg-orange-500 text-white text-sm"
                        >
                            Clear Search
                        </Button>
                    </div>
                )}

                <div className="bg-orange-50 rounded-xl p-6 text-center border border-orange-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Still need assistance?</h3>
                    <p className="text-gray-600 mb-4 text-sm">Our support team is ready to help</p>
                    <Link href="/contact">
                        <Button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all">Contact Support</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
