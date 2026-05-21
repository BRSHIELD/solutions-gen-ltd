import { motion } from "framer-motion";
import { ArrowRight, Zap, Sun, Shield, Wifi, Lock, Code, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  // Hero Images (kept as fallback) - Not used in current version
  const heroImages = [
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/hero-solar-panels-4c6Ho7bh8WnuPHwxJNzaP7.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/hero-electrical-engineering-b6t2TwgVtKmjn68WK3Qp3m.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/hero-security-systems-hMNq4cKafjsfpKBfrWerRL.webp",
  ];

  const services = [
    {
      title: "Electrical Engineering",
      description: "Expert electrical installations, maintenance, and system design for commercial and industrial applications.",
    },
    {
      title: "Solar & Green Energy",
      description: "Sustainable solar power solutions and renewable energy systems for businesses and communities.",
    },
    {
      title: "Security Systems",
      description: "Advanced CCTV and security solutions with 24/7 monitoring and access control systems.",
    },
    {
      title: "Networking & Communication",
      description: "Robust networking infrastructure and communication systems for seamless connectivity.",
    },
    {
      title: "Access Control Systems",
      description: "Modern access control and biometric security solutions for enhanced facility protection.",
    },
    {
      title: "ICT Solutions",
      description: "Comprehensive IT infrastructure, cloud solutions, and digital transformation services.",
    },
  ];

  const serviceImages = [
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/service-electrical-engineering-o8rWkt4bLrHi88Q2CmNbQg.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/service-solar-green-energy-2Yh2YQ6DNp9JaTnx55qZMw.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/service-security-systems-BXH8QsiCs39t3FNeoZGtdQ.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/service-networking-communication-bYyowKL4YKKyHp3MiDLo9F.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/service-access-control-AuMmvhwSovWkY2GCW62pYW.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/service-ict-solutions-Prei2sFUthrrGDfXaQtMxt.webp",
  ];

  const stats = [
    { value: 500, label: "Projects Completed" },
    { value: 98, label: "Client Satisfaction %" },
    { value: 50, label: "Expert Engineers" },
    { value: 15, label: "Years Experience" },
  ];

  const testimonials = [
    {
      name: "John Mwangi",
      company: "TechCorp Kenya",
      text: "Solutions Gen Ltd transformed our facility with their professional electrical engineering services. Highly recommended!",
      rating: 5,
    },
    {
      name: "Sarah Kipchoge",
      company: "Green Energy Ltd",
      text: "Their solar energy solutions have reduced our operational costs significantly. Excellent team!",
      rating: 5,
    },
    {
      name: "Michael Ochieng",
      company: "SecureNet Solutions",
      text: "Professional, reliable, and innovative. Solutions Gen is our trusted partner for all security needs.",
      rating: 5,
    },
  ];

  const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = value / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start > value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 30);
      return () => clearInterval(timer);
    }, [value]);

    return (
      <div className="text-center">
        <div className="text-5xl font-bold text-[#00D084] mb-2">{count}+</div>
        <p className="text-gray-600">{label}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="https://videos.pexels.com/video-files/16499745/16499745-hd_1920_1080_24fps.mp4"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Premium Engineering & Smart Technology Solutions
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Delivering excellence in electrical engineering, solar energy, security systems, and ICT solutions across East Africa.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 208, 132, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00D084] text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#00B870] transition-colors"
                >
                  Get Started <ArrowRight size={20} />
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1E3A5F] transition-colors"
                >
                  Learn More
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Overview Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#2A5A7F] text-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src="/manus-storage/EnhancedOriginalLogo_20c92336.png"
                alt="Solutions General Ltd Logo"
                className="w-32 h-32 mb-6 object-contain"
                whileHover={{ scale: 1.05 }}
              />
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-4xl font-bold">About Solutions Gen Ltd</h2>
                <span className="text-lg text-[#00D084] font-semibold">Since 2006</span>
              </div>
              <p className="text-gray-200 mb-4 leading-relaxed">
                Founded in 2006, Solutions General Ltd has been a leading provider of engineering and technology solutions across East Africa. With over 15 years of experience, we've successfully completed 500+ projects and maintained a 98% client satisfaction rate.
              </p>
              <p className="text-gray-200 leading-relaxed">
                Our team of 50+ expert engineers is dedicated to delivering innovative, reliable, and cost-effective solutions that drive business growth and operational excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { number: "15+", label: "Years Experience" },
                { number: "500+", label: "Projects" },
                { number: "50+", label: "Engineers" },
                { number: "98%", label: "Satisfaction" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur p-6 rounded-lg text-center cursor-pointer border border-white/20"
                >
                  <div className="text-3xl font-bold text-[#00D084] mb-2">
                    {item.number}
                  </div>
                  <p className="text-gray-200">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
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
              Our Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive solutions tailored to your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-lg shadow-md border border-gray-100 cursor-pointer group overflow-hidden"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-full h-48 overflow-hidden"
                >
                  <img
                    src={serviceImages[index]}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="p-8 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#1E3A5F] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 mt-6">
                    <Link href={`/contact?service=${service.title}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-[#00D084] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#00B870] transition-colors"
                      >
                        Request a Quote
                      </motion.button>
                    </Link>
                    <Link href={`/services?service=${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-[#00D084] font-semibold flex items-center gap-2 hover:text-[#00B870] transition-colors"
                      >
                        Request for Site Visit <ArrowRight size={16} />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-[#1E3A5F] text-center mb-16"
          >
            Why Choose Solutions Gen?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "✓", title: "Expert Team", description: "50+ experienced engineers with proven track record" },
              { icon: "✓", title: "Quality Assurance", description: "ISO certified processes and quality standards" },
              { icon: "✓", title: "On-Time Delivery", description: "Committed to project timelines and deadlines" },
              { icon: "✓", title: "24/7 Support", description: "Dedicated customer support and maintenance" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md text-center cursor-pointer"
              >
                <div className="text-4xl font-bold text-[#00D084] mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Clients Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-[#1E3A5F] text-center mb-16"
          >
            Our Clients
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/AeroClubofEastafrica-Uh8jZgKZhpJBKmvJnWpfBm.webp",
              "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/ASL-7sBJKzQVCvXJYzZhVQg.webp",
              null, null, null, null,
              null, null, null, null, null, null,
            ].map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-gray-50 rounded-lg p-6 flex items-center justify-center min-h-[120px] border border-gray-200 cursor-pointer group"
              >
                {logo ? (
                  <img
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="max-w-full max-h-20 object-contain group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <p className="text-sm font-semibold">Your Logo Here</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#2A5A7F] text-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-16"
          >
            What Our Clients Say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur p-8 rounded-lg border border-white/20 cursor-pointer"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#FFD700] text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-200 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-gray-300 text-sm">{testimonial.company}</p>
                </div>
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
        className="py-20 bg-[#00D084]"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Contact us today for a free consultation and discover how Solutions Gen can help you achieve your goals.
          </motion.p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#00D084] px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Get In Touch
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
