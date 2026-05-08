import { motion } from "framer-motion";
import { ArrowRight, Zap, Sun, Shield, Wifi, Lock, Code, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Home() {
  // Hero Images (kept as fallback)
  const heroImages = [
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/hero-solar-panels-4c6Ho7bh8WnuPHwxJNzaP7.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/hero-electrical-engineering-b6t2TwgVtKmjn68WK3Qp3m.webp",
    "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/hero-security-systems-hMNq4cKafjsfpKBfrWerRL.webp",
  ];

  const services = [
    {
      icon: Zap,
      title: "Electrical Engineering",
      description: "Expert electrical installations, maintenance, and system design for commercial and industrial applications.",
    },
    {
      icon: Sun,
      title: "Solar & Green Energy",
      description: "Sustainable solar power solutions and renewable energy systems for businesses and communities.",
    },
    {
      icon: Shield,
      title: "Security Systems",
      description: "Advanced CCTV and security solutions with 24/7 monitoring and access control systems.",
    },
    {
      icon: Wifi,
      title: "Networking & Communication",
      description: "Robust networking infrastructure and communication systems for seamless connectivity.",
    },
    {
      icon: Lock,
      title: "Access Control Systems",
      description: "Modern access control and biometric security solutions for enhanced facility protection.",
    },
    {
      icon: Code,
      title: "ICT Solutions",
      description: "Comprehensive IT infrastructure, cloud solutions, and digital transformation services.",
    },
  ];

  const stats = [
    { value: 500, label: "Projects Completed" },
    { value: 98, label: "Client Satisfaction %" },
    { value: 50, label: "Expert Engineers" },
    { value: 15, label: "Years Experience" },
  ];

  const projects = [
    {
      title: "Commercial Solar Installation",
      category: "Solar Energy",
      description: "Large-scale solar panel installation for a major retail chain.",
    },
    {
      title: "Security System Upgrade",
      category: "Security",
      description: "Complete CCTV and access control system for corporate offices.",
    },
    {
      title: "Electrical Infrastructure",
      category: "Electrical",
      description: "High-voltage electrical system design and installation.",
    },
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
        if (start >= value) {
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
        <div className="text-4xl md:text-5xl font-bold text-[#00D084] mb-2">
          {count}
          {label.includes("%") ? "%" : "+"}
        </div>
        <p className="text-gray-600">{label}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[600px] md:h-[700px] overflow-hidden"
      >
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source
              src="https://videos.pexels.com/video-files/8964378/8964378-sd_640_360_24fps.mp4"
              type="video/mp4"
            />
            {/* Fallback to first hero image if video doesn't load */}
            <img
              src={heroImages[0]}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Premium Engineering & Smart Technology Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-8">
              Delivering excellence in electrical engineering, solar energy, security systems, and ICT solutions across East Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/254722588932"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00D084] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0FA55F] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-[#1E3A5F] transition-all duration-300">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Overview */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-[#1E3A5F] mb-6">
                About Solutions Gen Ltd
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                With over 15 years of experience, Solutions Gen Ltd has established itself as a leading provider of premium engineering and smart technology solutions across East Africa.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                We specialize in delivering innovative, reliable, and sustainable solutions that drive business growth and operational excellence for our clients.
              </p>
              <Link href="/about" className="text-[#00D084] font-bold hover:text-[#0FA55F] transition-colors flex items-center gap-2">
                Learn more about us
                <ArrowRight size={20} />
              </Link>
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
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl font-bold text-[#00D084] mb-2">
                    {item.number}
                  </div>
                  <p className="text-gray-600">{item.label}</p>
                </div>
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
              Comprehensive solutions tailored to meet your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00D084]"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-lg flex items-center justify-center mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-[#1E3A5F] text-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Solutions Gen?</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We combine expertise, innovation, and commitment to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Expert Team: 50+ experienced engineers and technicians",
              "Proven Track Record: 500+ successful projects delivered",
              "Quality Assurance: ISO certified processes and standards",
              "24/7 Support: Round-the-clock customer service",
              "Innovative Solutions: Latest technology and best practices",
              "Competitive Pricing: Value for money without compromising quality",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-8 h-8 bg-[#00D084] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold">✓</span>
                </div>
                <p className="text-lg">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Animated Statistics */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AnimatedCounter value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects */}
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
              Featured Projects
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Showcase of our recent successful implementations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-[#FF6B35] rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">
                  {project.title}
                </h3>
                <p className="text-[#00D084] font-semibold mb-3">
                  {project.category}
                </p>
                <p className="text-gray-600">{project.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/portfolio" className="bg-[#1E3A5F] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0FA55F] transition-all duration-300 inline-flex items-center gap-2 group">
              View All Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">
              Client Testimonials
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              What our satisfied clients say about us
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#FF6B35]">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-[#1E3A5F]">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.company}</p>
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
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F]"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Get in touch with our team today and discover how Solutions Gen can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#1E3A5F] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Contact Us Now
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
