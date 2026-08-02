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
    { 
      label: "Services", 
      href: "/services",
      submenu: [
        { label: "Electrical Engineering", href: "/services#electrical" },
        { label: "Solar & Green Energy", href: "/services#solar" },
        { label: "CCTV & Security Systems", href: "/services#security" },
        { label: "Networking & Communication", href: "/services#networking" },
        { label: "Access Control Systems", href: "/services#access" },
        { label: "ICT Solutions", href: "/services#ict" },
      ]
    },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Gallery", href: "/gallery" },
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
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <img 
              src="/manus-storage/EnhancedOriginalLogo_20c92336.png" 
              alt="Solutions General Ltd Logo"
              className="w-9 h-9 md:w-10 md:h-10 object-contain"
              loading="lazy"
            />
            <span className="font-bold text-sm md:text-lg text-[#1E3A5F] hidden sm:inline">
              Solutions General Limited
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div 
          className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto"
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => {
            setIsNavHovered(false);
            setHoveredItem(null);
          }}
        >
          {navItems.map((item: any) => (
            <motion.div 
              key={item.href} 
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
              animate={{
                opacity: isNavHovered && hoveredItem !== item.href ? 0.4 : 1,
              }}
              transition={{ duration: 0.3 }}
              className="relative"
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
              
              {/* Dropdown Menu */}
              {item.submenu && hoveredItem === item.href && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 mt-0 w-56 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100"
                >
                  {item.submenu.map((subitem: any) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-[#f0f9f7] hover:text-[#00D084] transition-colors text-sm"
                    >
                      {subitem.label}
                    </Link>
                  ))}
                </motion.div>
              )}
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
                </motion.div>
          )}
        </div>



        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 hover:text-[#1E3A5F] ml-auto flex-shrink-0"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white border-t border-gray-100 max-h-[70vh] overflow-y-auto"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {navItems.map((item: any) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-[#1E3A5F] transition-colors font-medium block py-2 px-2 rounded"
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subitem: any) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        onClick={() => setIsOpen(false)}
                        className="text-gray-600 hover:text-[#00D084] transition-colors text-sm block py-1 px-2 rounded"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}


          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
