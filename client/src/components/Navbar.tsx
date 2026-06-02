import { motion } from "framer-motion";
import { Link } from "wouter";
import { Menu, X, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { user } = useAuth();

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
        <div 
          className="hidden md:flex items-center gap-8 ml-auto"
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => {
            setIsNavHovered(false);
            setHoveredItem(null);
          }}
        >
          {navItems.map((item) => (
            <motion.div 
              key={item.href} 
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              animate={{
                opacity: isNavHovered && hoveredItem !== item.href ? 0.4 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                href={item.href} 
                className="text-gray-700 font-medium relative group inline-block"
              >
                <motion.span
                  animate={{
                    color: hoveredItem === item.href ? "#00D084" : "#374151",
                    textShadow: hoveredItem === item.href 
                      ? "0 0 10px rgba(0, 208, 132, 0.5)" 
                      : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  className="block"
                >
                  {item.label}
                </motion.span>
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-[#00D084] rounded-full" 
                  animate={{
                    width: isNavHovered && hoveredItem === item.href ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}

          {/* Admin Panel Link */}
          {user && user.role === "admin" && (
            <motion.div
              onMouseEnter={() => setHoveredItem("admin")}
              onMouseLeave={() => setHoveredItem(null)}
              animate={{
                opacity: isNavHovered && hoveredItem !== "admin" ? 0.4 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/admin/certificates"
                className="text-gray-700 font-medium relative group inline-flex items-center gap-2"
              >
                <motion.div
                  animate={{
                    color: hoveredItem === "admin" ? "#00D084" : "#374151",
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                  title="Admin Panel"
                >
                  <Settings size={18} />
                </motion.div>
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 bg-[#00D084] rounded-full" 
                  animate={{
                    width: isNavHovered && hoveredItem === "admin" ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          )}
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

            {user && user.role === "admin" && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navItems.length * 0.05 }}>
                <Link
                  href="/admin/certificates"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-[#1E3A5F] transition-colors font-medium flex items-center gap-2"
                >
                  <Settings size={18} />
                  <span>Admin Panel</span>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
