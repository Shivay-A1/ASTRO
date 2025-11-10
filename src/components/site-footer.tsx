import { Sparkles } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2d1f0f] text-gray-300 py-12 mt-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">AstroNova</h3>
            <p className="text-sm leading-relaxed">
              Your trusted destination for authentic astrological tools — from sacred Rudraksha and
              gemstones to divine yantras and spiritual guidance. Align your energy with the cosmos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-accent">Home</Link></li>
              <li><Link href="/products" className="hover:text-accent">Products</Link></li>
              <li><Link href="/about" className="hover:text-accent">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>Rudraksha</li>
              <li>Gemstones</li>
              <li>Yantras</li>
              <li>Bracelets</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <p className="text-sm">📍 12 Galaxy Street, Delhi, India</p>
            <p className="text-sm">📞 +91 9876543210</p>
            <p className="text-sm">✉️ support@astronova.com</p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} AstroNova. All rights reserved.
        </div>
      </footer>
  );
}
