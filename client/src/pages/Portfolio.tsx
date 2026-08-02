import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = [
    {
      id: 3,
      title: "Electrical Infrastructure",
      category: "Electrical",
      client: "Industrial Manufacturing Ltd",
      description: "High-voltage electrical system design and installation for production facility",
      results: "Zero downtime during implementation, full compliance",
      image: "from-[#00D084] to-[#FF6B35]",
    },
    {
      id: 4,
      title: "Network Infrastructure",
      category: "Networking",
      client: "TeleCom Solutions",
      description: "Fiber optic network installation and wireless mesh system deployment",
      results: "1Gbps connectivity, 99.95% availability",
      image: "from-[#1E3A5F] to-[#FF6B35]",
    },
    {
      id: 6,
      title: "ICT Infrastructure",
      category: "ICT",
      client: "Financial Services Group",
      description: "Cloud infrastructure setup and cybersecurity implementation",
      results: "ISO 27001 certified, zero security incidents",
      image: "from-[#00D084] to-[#1E3A5F]",
    },
    {
      id: 1,
      title: "Commercial Solar Installation",
      category: "Solar Energy",
      client: "TechCorp Kenya",
      description: "Large-scale solar panel installation for a major retail chain with 500kW capacity",
      results: "40% reduction in energy costs, 2-year ROI",
      image: "from-[#1E3A5F] to-[#00D084]",
    },
    {
      id: 2,
      title: "Security System Upgrade",
      category: "Security",
      client: "SecureNet Solutions",
      description: "Complete CCTV and access control system for corporate offices spanning 5 floors",
      results: "24/7 monitoring, 99.9% uptime achieved",
      image: "from-[#FF6B35] to-[#1E3A5F]",
    },
    {
      id: 5,
      title: "Access Control System",
      category: "Security",
      client: "Corporate Plaza",
      description: "Biometric and card-based access control for multi-tenant building",
      results: "Real-time access logs, 5000+ users managed",
      image: "from-[#FF6B35] to-[#00D084]",
    },
  ];

  const categories = ["All", "Electrical", "Networking", "ICT", "Solar Energy", "Security"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F] text-white py-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 95, 0.3), rgba(15, 165, 95, 0.3)), url('https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              Showcase of our successful projects and client achievements
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Category Filter */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedCategory === category ? "bg-[#00D084] text-white shadow-lg" : "bg-white text-[#1E3A5F] border-2 border-[#1E3A5F] hover:bg-[#00D084] hover:text-white hover:border-[#00D084]"}`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Grid - Coming Soon */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-4">Portfolio Coming Soon</h2>
            <p className="text-gray-600 text-lg mb-8">We're preparing detailed case studies of our recent projects. Check back soon!</p>
            
            {/* Notify Me Email Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email to be notified"
                  className="px-6 py-3 rounded-lg border-2 border-[#1E3A5F] focus:outline-none focus:border-[#00D084] transition-all duration-300 flex-1 sm:flex-initial"
                />
                <button className="bg-[#00D084] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0FA55F] transition-all duration-300">
                  Notify Me
                </button>
              </div>
            </motion.div>
            
            {/* View Our Services Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a href="/services" className="inline-block bg-[#1E3A5F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0FA55F] transition-all duration-300">
                View Our Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F]"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "10+", label: "Experienced Engineers" },
              { number: "15+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {stat.number && <div className="text-5xl font-bold mb-2">{stat.number}</div>}
                <p className="text-gray-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#1E3A5F] mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let us help you achieve your goals with our proven expertise and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1E3A5F] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0FA55F] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Contact Us
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" className="border-2 border-[#1E3A5F] text-[#1E3A5F] px-8 py-4 rounded-lg font-bold hover:bg-[#1E3A5F] hover:text-white transition-all duration-300">
                Send Message
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
