'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        <div className="bg-white rounded-lg shadow p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to Fynza. These Terms & Conditions govern your use of our platform and services. By accessing or using Fynza, 
              you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. User Accounts</h2>
            <p className="text-gray-700 mb-2">
              When creating an account on Fynza, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your password</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Product Information</h2>
            <p className="text-gray-700">
              We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product 
              information is accurate, complete, or error-free. Prices and availability are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Orders and Payments</h2>
            <p className="text-gray-700 mb-2">
              By placing an order on Fynza, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>You are legally able to enter into binding contracts</li>
              <li>All information provided is accurate and true</li>
              <li>You authorize payment for the order</li>
              <li>You accept our payment processing terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Return and Refund Policy</h2>
            <p className="text-gray-700 mb-2">
              Fynza offers a 30-day return policy on most items, subject to the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Items must be unused and in original packaging</li>
              <li>Return request must be initiated within 30 days of delivery</li>
              <li>Refunds are processed within 7-10 business days</li>
              <li>Return shipping costs may apply for certain items</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-700">
              To the maximum extent permitted by law, Fynza shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages, including lost profits, arising from your use of or inability to use the platform or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Termination</h2>
            <p className="text-gray-700">
              Fynza reserves the right to terminate or suspend your account at any time, with or without cause, and without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms & Conditions at any time. Your continued use of Fynza constitutes 
              acceptance of the updated terms.
            </p>
          </section>

          <div className="bg-orange-50 border border-orange-200 rounded p-4 mt-8">
            <p className="text-gray-700 text-sm">
              Last Updated: January 2024. For questions about these terms, please contact support@fynza.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
