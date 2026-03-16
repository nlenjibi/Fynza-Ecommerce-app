'use client';

import React from "react"

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-8">We'd love to hear from you. Get in touch with our team.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-4 mb-6">
              <Phone className="text-orange-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-600">+233 30 XXX XXXX</p>
                <p className="text-gray-600">+233 24 XXX XXXX</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-6">
              <Mail className="text-orange-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <p className="text-gray-600">support@fynza.com</p>
                <p className="text-gray-600">sales@fynza.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="text-orange-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                <p className="text-gray-600">123 Commerce Street</p>
                <p className="text-gray-600">Accra, Ghana</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-orange-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              />
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                required
              >
                <option value="">Select Subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Customer Support</option>
                <option value="seller">Become a Seller</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500 resize-none"
                required
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Send Message</Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
