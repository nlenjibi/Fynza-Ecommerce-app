import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Company Info - New from draft */}
        <div className="mb-8 pb-8 border-b border-white/10">
          <Link href="/" className="text-2xl font-bold text-white">
            Fynza
          </Link>
          <p className="mt-3 text-gray-400 text-sm max-w-md">
            Your one-stop destination for quality products at affordable prices. Shop with confidence on our secure platform.
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Need Help */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">NEED HELP?</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Chat with us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/help/delivery" className="text-gray-300 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/help/return-product" className="text-gray-300 hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* About Fynza */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">ABOUT FYNZA</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Make Money with Fynza */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">MAKE MONEY WITH FYNZA</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/sell" className="text-gray-300 hover:text-white transition-colors">
                  Sell on Fynza
                </Link>
              </li>
              <li>
                <Link href="/vendor-hub" className="text-gray-300 hover:text-white transition-colors">
                  Vendor hub
                </Link>
              </li>
              <li>
                <Link href="/become-consultant" className="text-gray-300 hover:text-white transition-colors">
                  Become a Sales Consultant
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Trust - New from draft */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">SECURITY & TRUST</h3>
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <span className="text-gray-400 text-sm">SSL Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <span className="text-gray-400 text-sm">Payment Security</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                <span className="text-gray-400 text-sm">Trust Badge</span>
              </div>
            </div>
          </div>

          {/* Newsletter - New from draft */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">NEWSLETTER</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive deals and special offers delivered to your inbox.
            </p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-3 py-2 bg-white/10 text-white text-sm rounded border border-white/20 focus:outline-none focus:border-white/40 placeholder:text-gray-500"
              />
              <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Fynza International */}
        <div className="mb-8 pb-8 border-b border-white/10">
          <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">FYNZA INTERNATIONAL</h3>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link href="/gh" className="text-gray-300 hover:text-white transition-colors">Ghana</Link>
            <Link href="/ng" className="text-gray-300 hover:text-white transition-colors">Nigeria</Link>
            <Link href="/ke" className="text-gray-300 hover:text-white transition-colors">Kenya</Link>
            <Link href="/eg" className="text-gray-300 hover:text-white transition-colors">Egypt</Link>
          </div>
        </div>

        {/* Social Links & Payment Methods */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold mb-3">JOIN US ON</h4>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-orange-400 transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">PAYMENT METHODS</h4>
              <div className="flex gap-3">
                <div className="bg-white rounded px-2 py-1 text-xs text-gray-900 font-semibold">VISA</div>
                <div className="bg-white rounded px-2 py-1 text-xs text-gray-900 font-semibold">MTN</div>
                <div className="bg-white rounded px-2 py-1 text-xs text-gray-900 font-semibold">VODAFONE</div>
                <div className="bg-white rounded px-2 py-1 text-xs text-gray-900 font-semibold">Mastercard</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Support Status */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-400">© 2026 Fynza. Your Market. Your Way.</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-gray-400">Support is <span className="text-green-400">Online</span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function GeneralFooter() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="hidden md:grid grid-cols-4 gap-8 mb-12">
            {/* Column 1: Company Info & Social */}
            <div className="space-y-8">
              <div>
                <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
                  Fynza
                </Link>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                  Your one-stop destination for quality products at affordable prices. Shop with confidence on our secure platform.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-4">Follow Us</h4>
                <div className="flex flex-wrap gap-3">
                  <Link href="#" className="inline-flex items-center justify-center p-2.5 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                    <Facebook className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="inline-flex items-center justify-center p-2.5 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="inline-flex items-center justify-center p-2.5 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="inline-flex items-center justify-center p-2.5 rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                    <Youtube className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 2: Customer Service */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Customer Service</h3>
              <ul className="space-y-2.5">
                <li><Link href="/help" className="text-gray-400 text-sm hover:text-blue-400">Help Center</Link></li>
                <li><Link href="/contact" className="text-gray-400 text-sm hover:text-blue-400">Contact Us</Link></li>
                <li><Link href="/help" className="text-gray-400 text-sm hover:text-blue-400">FAQ</Link></li>
                <li><Link href="/help/delivery" className="text-gray-400 text-sm hover:text-blue-400">Shipping Info</Link></li>
                <li><Link href="/help/return-product" className="text-gray-400 text-sm hover:text-blue-400">Returns & Refunds</Link></li>
              </ul>
            </div>

            {/* Column 3: Security & Trust */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Security & Trust</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  <span className="text-gray-400 text-sm">SSL Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span className="text-gray-400 text-sm">Payment Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  <span className="text-gray-400 text-sm">Trust Badge</span>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Payment Methods</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800 rounded text-xs text-gray-400"><span>💳</span><span className="font-medium">Visa</span></div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800 rounded text-xs text-gray-400"><span>💳</span><span className="font-medium">Mastercard</span></div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800 rounded text-xs text-gray-400"><span>🔐</span><span className="font-medium">PayPal</span></div>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-800 rounded text-xs text-gray-400"><span>📱</span><span className="font-medium">MTN</span></div>
              </div>
            </div>

            {/* Column 4: Newsletter & Legal */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Newsletter</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Get exclusive deals, new arrivals, and special offers delivered to your inbox.
              </p>
              <div className="flex gap-2 mb-8">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">Subscribe</button>
              </div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 text-xs hover:text-blue-400">Terms of Use</Link></li>
                <li><Link href="/privacy" className="text-gray-400 text-xs hover:text-blue-400">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-gray-400 text-xs hover:text-blue-400">Cookie Preferences</Link></li>
              </ul>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-6">
            <div>
              <Link href="/" className="text-2xl font-bold text-blue-400">Fynza</Link>
              <p className="mt-3 text-gray-400 text-sm">Your one-stop destination for quality products at affordable prices.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 text-sm">Help Center</Link></li>
                <li><Link href="/contact" className="text-gray-400 text-sm">Contact Us</Link></li>
                <li><Link href="/help" className="text-gray-400 text-sm">FAQ</Link></li>
                <li><Link href="/help/delivery" className="text-gray-400 text-sm">Shipping Info</Link></li>
                <li><Link href="/help/return-product" className="text-gray-400 text-sm">Returns & Refunds</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Newsletter</h3>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 bg-gray-800 text-white text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800"></div>

        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-xs">© 2026 Fynza. Your Market. Your Way.</p>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-gray-400">Support is <span className="text-green-400">Online</span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
