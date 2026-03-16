'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 mb-2">
              Fynza collects information you provide directly, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Account information (name, email, phone number)</li>
              <li>Delivery addresses and payment information</li>
              <li>Purchase history and browsing activity</li>
              <li>Device information and IP addresses</li>
              <li>Communications and feedback you provide</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-2">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Process orders and deliver products</li>
              <li>Provide customer support and handle inquiries</li>
              <li>Improve our products and services</li>
              <li>Send promotional emails and updates (with your consent)</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Data Security</h2>
            <p className="text-gray-700">
              Fynza employs industry-standard security measures, including SSL encryption and secure payment processing, 
              to protect your personal information. However, no security system is impenetrable, and we cannot guarantee 
              absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Sharing Your Information</h2>
            <p className="text-gray-700 mb-2">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Sellers to process and deliver your orders</li>
              <li>Payment processors and financial institutions</li>
              <li>Delivery partners and logistics providers</li>
              <li>Service providers who assist us in operating Fynza</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Cookies and Tracking</h2>
            <p className="text-gray-700">
              Fynza uses cookies and similar tracking technologies to enhance your browsing experience, analyze site usage, 
              and personalize content. You can control cookie settings in your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 mb-2">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Access your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of promotional communications</li>
              <li>Request a copy of your data in portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Third-Party Links</h2>
            <p className="text-gray-700">
              Fynza may contain links to third-party websites. We are not responsible for the privacy practices of these sites. 
              Please review their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Children's Privacy</h2>
            <p className="text-gray-700">
              Fynza is not intended for users under 18 years of age. We do not knowingly collect personal information from children. 
              If we become aware of such collection, we will take steps to delete such information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
            <p className="text-gray-700">
              If you have questions about our privacy practices or wish to exercise your privacy rights, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-gray-100 rounded">
              <p className="font-semibold text-gray-900">Fynza Privacy Team</p>
              <p className="text-gray-700">Email: privacy@fynza.com</p>
              <p className="text-gray-700">Address: 123 Commerce Street, Accra, Ghana</p>
            </div>
          </section>

          <div className="bg-orange-50 border border-orange-200 rounded p-4 mt-8">
            <p className="text-gray-700 text-sm">
              Last Updated: January 2024. This policy may change periodically. Continued use of Fynza constitutes acceptance of changes.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
