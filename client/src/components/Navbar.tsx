import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SG</span>
            </div>
            <span className="font-bold text-lg text-[#1E3A5F] hidden sm:inline">
              Solutions Gen
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a className="text-gray-700 hover:text-[#1E3A5F] transition-colors font-medium">
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1E3A5F] text-white px-6 py-2 rounded-lg hover:bg-[#0FA55F] transition-all duration-300 font-medium"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 hover:text-[#1E3A5F]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-[#1E3A5F] transition-colors font-medium"
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E3A5F] text-white px-6 py-2 rounded-lg hover:bg-[#0FA55F] transition-all duration-300 font-medium text-center"
            >
              Get Started
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
