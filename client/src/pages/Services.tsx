import { motion } from "framer-motion";
import { Zap, Sun, Shield, Wifi, Lock, Code, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const serviceDetails = [
    {
      icon: Zap,
      title: "Electrical Engineering",
      description: "Comprehensive electrical solutions for commercial and industrial applications",
      benefits: [
        "Expert system design and installation",
        "High-voltage electrical systems",
        "Maintenance and troubleshooting",
        "Compliance with international standards",
      ],
    },
    {
      icon: Sun,
      title: "Solar & Green Energy",
      description: "Sustainable renewable energy solutions for businesses",
      benefits: [
        "Solar panel installation and design",
        "Energy efficiency optimization",
        "Cost reduction strategies",
        "Environmental sustainability",
      ],
    },
    {
      icon: Shield,
      title: "CCTV & Security Systems",
      description: "Advanced surveillance and security monitoring solutions",
      benefits: [
        "HD CCTV camera installation",
        "24/7 monitoring services",
        "Real-time alerts and notifications",
        "Cloud-based recording systems",
      ],
    },
    {
      icon: Wifi,
      title: "Networking & Communication",
      description: "Robust network infrastructure for seamless connectivity",
      benefits: [
        "Network design and implementation",
        "Fiber optic installation",
        "Wireless solutions",
        "Network security and optimization",
      ],
    },
    {
      icon: Lock,
      title: "Access Control Systems",
      description: "Modern security solutions for facility protection",
      benefits: [
        "Biometric access systems",
        "Card-based access control",
        "Real-time access logs",
        "Integration with security systems",
      ],
    },
    {
      icon: Code,
      title: "ICT Solutions",
      description: "Comprehensive IT infrastructure and digital transformation",
      benefits: [
        "Cloud infrastructure setup",
        "Data center solutions",
        "Cybersecurity implementation",
        "IT consulting and support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F] text-white py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              Comprehensive engineering and technology solutions tailored to your business needs
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className={`grid md:grid-cols-2 gap-0 items-center ${isEven ? "" : "md:grid-flow-dense"}`}>
                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="p-8 md:p-12"
                    >
                      <motion.div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-lg flex items-center justify-center mb-6" whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 10px 25px rgba(0, 208, 132, 0.3)" }}>
                        <Icon size={32} className="text-white" />
                      </motion.div>
                      <h3 className="text-3xl font-bold text-[#1E3A5F] mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-700 text-lg mb-6">
                        {service.description}
                      </p>
                      <h4 className="font-bold text-[#1E3A5F] mb-4">Key Benefits:</h4>
                      <ul className="space-y-3 mb-8">
                        {service.benefits.map((benefit, i) => (
                          <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3 cursor-pointer group">
                            <motion.div whileHover={{ scale: 1.2, rotate: 360 }}>
                              <CheckCircle
                                size={20}
                                className="text-[#00D084] flex-shrink-0 mt-1 group-hover:text-[#FF6B35] transition-colors"
                              />
                            </motion.div>
                            <span className="text-gray-700 group-hover:text-[#1E3A5F] transition-colors">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <Link href={`/contact?service=${encodeURIComponent(service.title)}&type=site-visit#contact-form`} className="inline-block w-full">
                        <motion.button whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(0, 208, 132, 0.3)" }} whileTap={{ scale: 0.95 }} className="w-full bg-[#00D084] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#0FA55F] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
                          Request for Site Visit
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </Link>
                    </motion.div>

                    {/* Service Image */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="h-64 md:h-full overflow-hidden"
                    >
                      <motion.img
                        src={[
                          "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/services-electrical-SdMnP3spt8TQAzvdyzgw8h.webp",
                          "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/services-solar-MEtDeWUTugeBuSj388mU6r.webp",
                          "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/services-security-GCvfCrxGWkqjTgQKK9g73F.webp",
                        ][index % 3]}
                        alt={service.title}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Our Services */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We combine expertise, innovation, and customer-centric approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Team",
                description: "50+ experienced engineers with proven track records",
              },
              {
                title: "Quality Assurance",
                description: "ISO certified processes and international standards",
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock customer service and maintenance",
              },
              {
                title: "Innovative Solutions",
                description: "Latest technology and best industry practices",
              },
              {
                title: "Competitive Pricing",
                description: "Value for money without compromising quality",
              },
              {
                title: "Fast Turnaround",
                description: "Efficient project delivery within agreed timelines",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
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
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F]"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project requirements and discover how we can help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#1E3A5F] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Contact Us
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#1E3A5F] transition-all duration-300">
                Send Message
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
