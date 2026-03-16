'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function UpdateProfilePage() {
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+233 50 123 4567',
        address: '123 Main Street',
        city: 'Accra',
        region: 'Greater Accra',
        postalCode: '00233',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href="/help" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Help Center
                </Link>

                {/* Page Header */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <User className="h-8 w-8 text-orange-500" />
                        How to Update Your Profile
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Learn how to update your personal information on Fynza
                    </p>
                </div>

                {/* Guide Sections */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Guide</h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">1</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Log in to Your Account</h3>
                                <p className="text-gray-600 mt-1">
                                    Sign in to your Fynza account using your email and password.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">2</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Go to Account Settings</h3>
                                <p className="text-gray-600 mt-1">
                                    Click on your profile icon in the top right corner and select "Account Settings" from the dropdown menu.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">3</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Edit Your Information</h3>
                                <p className="text-gray-600 mt-1">
                                    Click on the "Edit Profile" button to modify your personal details such as name, phone number, and address.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <span className="text-orange-600 font-semibold">4</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Save Your Changes</h3>
                                <p className="text-gray-600 mt-1">
                                    After making your changes, click the "Save" button to update your profile. You'll receive a confirmation message once the changes are saved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Update Form Preview */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">What You Can Update</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <User className="h-5 w-5 text-orange-500" />
                            <div>
                                <p className="font-medium text-gray-900">Personal Information</p>
                                <p className="text-sm text-gray-600">Name, date of birth</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <Mail className="h-5 w-5 text-orange-500" />
                            <div>
                                <p className="font-medium text-gray-900">Email Address</p>
                                <p className="text-sm text-gray-600">Primary email</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <Phone className="h-5 w-5 text-orange-500" />
                            <div>
                                <p className="font-medium text-gray-900">Phone Number</p>
                                <p className="text-sm text-gray-600">Contact number</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                            <MapPin className="h-5 w-5 text-orange-500" />
                            <div>
                                <p className="font-medium text-gray-900">Shipping Address</p>
                                <p className="text-sm text-gray-600">Delivery address</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-3">Important Tips</h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                        <li>Make sure your email address is always up to date for order notifications</li>
                        <li>Your phone number is used for delivery coordination</li>
                        <li>Having an accurate address ensures timely delivery of your orders</li>
                        <li>You can only change your email address once every 30 days</li>
                    </ul>
                </div>

                {/* Contact Support */}
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Need More Help?</h3>
                    <p className="text-gray-600 mb-4">Our support team is here to assist you</p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contact">
                            <Button className="bg-orange-500 hover:bg-orange-600">Contact Us</Button>
                        </Link>
                        <Link href="/help">
                            <Button variant="outline">Back to Help Center</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
