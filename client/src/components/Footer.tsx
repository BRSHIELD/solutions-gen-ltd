import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E3A5F] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00D084] to-[#FF6B35] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SG</span>
              </div>
              <span className="font-bold text-lg">Solutions Gen Ltd</span>
            </div>
            <p className="text-gray-300 text-sm">
              Premium engineering and smart technology solutions for East Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#00D084] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00D084] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00D084] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#00D084] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#00D084] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-[#00D084] transition-colors">
                  Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="hover:text-[#00D084] transition-colors cursor-pointer">
                Electrical Engineering
              </li>
              <li className="hover:text-[#00D084] transition-colors cursor-pointer">
                Solar & Green Energy
              </li>
              <li className="hover:text-[#00D084] transition-colors cursor-pointer">
                Security Systems
              </li>
              <li className="hover:text-[#00D084] transition-colors cursor-pointer">
                ICT Solutions
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-1 flex-shrink-0 text-[#00D084]" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 flex-shrink-0 text-[#00D084]" />
                <span>info@solutionsgen.co.ke</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-[#00D084]" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Solutions Gen Ltd. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00D084] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00D084] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00D084] transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
