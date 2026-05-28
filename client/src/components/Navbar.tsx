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
    { label: "Gallery", href: "/gallery" },
    { label: "Certifications", href: "/certifications" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100"
    >
      <div className="container mx-auto px-4 py-4 flex items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <motion.img 
              src="/manus-storage/EnhancedOriginalLogo_20c92336.png" 
              alt="Solutions General Ltd Logo"
              className="w-10 h-10 object-contain"
              whileHover={{ boxShadow: "0 0 20px rgba(0, 208, 132, 0.4)" }}
            />
            <span className="font-bold text-lg text-[#1E3A5F] hidden sm:inline">
              Solutions Gen
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 ml-auto">
          {navItems.map((item) => (
            <motion.div key={item.href} whileHover={{ y: -2 }}>
              <Link href={item.href} className="text-gray-700 hover:text-[#1E3A5F] transition-colors font-medium relative group">
                {item.label}
                <motion.span className="absolute bottom-0 left-0 w-0 h-1 bg-[#00D084] group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <motion.a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(30, 58, 95, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#1E3A5F] text-white px-6 py-2 rounded-lg hover:bg-[#0FA55F] transition-all duration-300 font-medium inline-block cursor-pointer"
          >
            Get Started
          </motion.a>
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
            {navItems.map((item, index) => (
              <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-[#1E3A5F] transition-colors font-medium block"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1E3A5F] text-white px-6 py-2 rounded-lg hover:bg-[#0FA55F] transition-all duration-300 font-medium text-center cursor-pointer block"
            >
              Get Started
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
