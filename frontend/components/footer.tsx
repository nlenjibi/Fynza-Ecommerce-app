import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white mt-16">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Need Help */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">NEED HELP?</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-secondary transition-colors">
                  Chat with us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-secondary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* About Fynza */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">ABOUT FYNZA</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-secondary transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-secondary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-secondary transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-secondary transition-colors">
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
                <Link href="/sell" className="text-gray-300 hover:text-secondary transition-colors">
                  Sell on Fynza
                </Link>
              </li>
              <li>
                <Link href="/vendor-hub" className="text-gray-300 hover:text-secondary transition-colors">
                  Vendor hub
                </Link>
              </li>
              <li>
                <Link href="/become-consultant" className="text-gray-300 hover:text-secondary transition-colors">
                  Become a Sales Consultant
                </Link>
              </li>
            </ul>
          </div>

          {/* Fynza International */}
          <div>
            <h3 className="font-bold text-sm mb-4 uppercase tracking-wide">FYNZA INTERNATIONAL</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/gh" className="text-gray-300 hover:text-secondary transition-colors">
                  Ghana
                </Link>
              </li>
              <li>
                <Link href="/ng" className="text-gray-300 hover:text-secondary transition-colors">
                  Nigeria
                </Link>
              </li>
              <li>
                <Link href="/ke" className="text-gray-300 hover:text-secondary transition-colors">
                  Kenya
                </Link>
              </li>
              <li>
                <Link href="/eg" className="hover:text-[oklch(0.65_0.18_45)] transition-colors">
                  Egypt
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold mb-3">JOIN US ON</h4>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-[oklch(0.65_0.18_45)] transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-[oklch(0.65_0.18_45)] transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-[oklch(0.65_0.18_45)] transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="hover:text-[oklch(0.65_0.18_45)] transition-colors">
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">PAYMENT METHODS</h4>
              <div className="flex gap-3">
                <div className="bg-white rounded px-2 py-1 text-xs text-foreground font-semibold">VISA</div>
                <div className="bg-white rounded px-2 py-1 text-xs text-foreground font-semibold">MTN</div>
                <div className="bg-white rounded px-2 py-1 text-xs text-foreground font-semibold">VODAFONE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center text-sm">
          <p>© 2026 Fynza. Your Market. Your Way.</p>
        </div>
      </div>
    </footer>
  )
}
