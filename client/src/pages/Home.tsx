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
      <>
        <div className="text-4xl font-bold text-[#00D084]">{count}+</div>
        <p className="text-gray-100 font-medium mt-2">{label}</p>
      </>
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

      {/* Combined Company Overview & Statistics Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/manus-storage/solar-panels-bg_961116f3.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Powering Possibilities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-center md:text-left flex flex-col justify-center"
            >
              {/* Logo */}
              <motion.img
                src="/manus-storage/EnhancedOriginalLogo_20c92336.png"
                alt="Solutions General Ltd Logo"
                className="w-12 h-12 mb-3 object-contain md:mx-0 mx-auto"
                whileHover={{ scale: 1.05 }}
              />
              
              {/* Title */}
              <h2 className="text-xl font-bold mb-3">Powering Possibilities</h2>
              
              {/* First paragraph */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-gray-200 mb-2 leading-relaxed text-sm"
              >
                Founded in 1996, Solutions General Ltd has been a leading provider of engineering and technology solutions across East Africa. With over 30 years of experience, we've successfully completed 500+ projects and maintained a 98% client satisfaction rate.
              </motion.p>
              
              {/* Second paragraph */}
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-gray-200 leading-relaxed mb-4 text-sm"
              >
                Our team of 50+ expert engineers is dedicated to delivering innovative, reliable, and cost-effective solutions that drive business growth and operational excellence.
              </motion.p>
              
              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link href="/portfolio">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 208, 132, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#00D084] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#00B870] transition-colors inline-flex items-center gap-2 text-sm"
                  >
                    View Our Projects <ArrowRight size={16} />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Your Trusted Solution Partner (Statistics) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white flex flex-col justify-center"
            >
              {/* Graffiti-style heading */}
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-lg md:text-xl font-black text-white mb-6 italic skew-x-[-12deg] drop-shadow-lg"
                style={{
                  fontFamily: '"Georgia", serif',
                  letterSpacing: '-0.02em',
                  textShadow: '3px 3px 0px rgba(0, 208, 132, 0.4), 6px 6px 0px rgba(0, 0, 0, 0.3)',
                  fontWeight: '700',
                }}
              >
                Your Trusted Solution Partner
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 208, 132, 0.3)" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur p-4 rounded-lg text-center border border-white/20 hover:border-[#00D084]/50 transition-colors"
                  >
                    <div className="text-2xl font-bold text-[#00D084] mb-2">
                      <AnimatedCounter value={stat.value} label={stat.label} />
                    </div>
                    <div className="text-xs text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto">
            {[
              "/manus-storage/Coop-Bank1_c603c3f5.jpg",
              "/manus-storage/KTRH-Logo-150x150_854cef46.jpg",
              "/manus-storage/NSSF_bd59c6c3.jpg",
              "/manus-storage/Windsor Club_ceaf4aee.jpg",
              "/manus-storage/world-vision-vector-logo_3c17469e.jpg",
              "/manus-storage/Cytonn_7292fed0.png",
              "/manus-storage/Equity_Bank_Logo_32b829a6.png",
              "/manus-storage/KCB Group_83f3da37.png",
              "/manus-storage/Muthaiga country club_fdadb19e.png",
              "/manus-storage/Tangaza-University-College_af6f9e4f.png",
              "/manus-storage/Transglobal_822ebf2e.png",
              "/manus-storage/Turkana basin institute_ec3920f7.png",
              "/manus-storage/co-operative-bank-of-kenya-logo-png_seeklogo-172668_01949a8f.png",
              "/manus-storage/united-nations-logo-png_seeklogo-247981_ef7521cf.png",
              "/manus-storage/British High commission_c668955c.jfif",
              "/manus-storage/Junction mall_44a194d4.jfif",
              "/manus-storage/Nairobi west_281009fe.jfif",
              "/manus-storage/Tatu city_14d7f18c.jfif",
              "/manus-storage/World bank logo_53d3de45.jfif",
              "/manus-storage/coast_general_c1ed967c.webp",
            ].map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="flex items-center justify-center cursor-pointer group bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg hover:border-gray-300 transition-all"
              >
                <img
                  src={logo}
                  alt={`Client ${index + 1}`}
                  className="w-[160px] md:w-[200px] h-[100px] md:h-[120px] object-contain group-hover:opacity-80 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* Industries We Serve Section */}
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
              Industries We Serve
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Solutions tailored for diverse sectors across East Africa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
            {[
              { name: "Mechanical & Electrical", image: "/manus-storage/manufacturing_92b6a132.jpg", description: "Industrial automation and electrical systems" },
              { name: "Construction", image: "/manus-storage/hospitality_62e06c23.jpg", description: "Infrastructure and construction solutions" },
              { name: "Manufacturing", image: "/manus-storage/education_f2cf0230.jpg", description: "Industrial automation and electrical systems" },
              { name: "Hospitality", image: "/manus-storage/retail_5df6e4bc.jpg", description: "Security and energy solutions for hotels" },
              { name: "Education", image: "/manus-storage/finance_cb085ca9.jpg", description: "Campus-wide networking and security" },
              { name: "Real Estate", image: "/manus-storage/government_68a3ad3a.jpg", description: "Smart building systems and security infrastructure" },
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 208, 132, 0.15)" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#00D084] transition-all group cursor-pointer h-full flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {industry.description}
                    </p>
                  </div>
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
