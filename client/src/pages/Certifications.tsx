import { motion, AnimatePresence } from "framer-motion";
import { Award, Download, Calendar, X } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  // Sample certificates data
  const certificates = [
    {
      id: 1,
      title: "ISO 9001:2015",
      issuer: "International Organization for Standardization",
      category: "EPRA",
      issueDate: new Date("2020-03-15"),
      expiryDate: new Date("2030-03-15"),
      description: "Quality Management Systems Certification",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/iso-9001-cert.webp",
    },
    {
      id: 2,
      title: "ISO 27001:2013",
      issuer: "International Organization for Standardization",
      category: "NCA",
      issueDate: new Date("2021-06-20"),
      expiryDate: new Date("2027-06-20"),
      description: "Information Security Management Systems",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/iso-27001-cert.webp",
    },
    {
      id: 3,
      title: "OHSAS 18001:2007",
      issuer: "Occupational Health and Safety Assessment Series",
      category: "KRA",
      issueDate: new Date("2019-09-10"),
      expiryDate: new Date("2029-09-10"),
      description: "Occupational Health and Safety Management",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/ohsas-cert.webp",
    },
    {
      id: 4,
      title: "Electrical Contractor License",
      issuer: "Kenya Energy and Petroleum Regulatory Authority",
      category: "EPRA",
      issueDate: new Date("2018-01-15"),
      expiryDate: new Date("2028-01-15"),
      description: "Licensed Electrical Contractor in Kenya",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/electrical-license.webp",
    },
    {
      id: 5,
      title: "Solar Installation Certification",
      issuer: "Kenya Renewable Energy Association",
      category: "EPRA",
      issueDate: new Date("2021-05-20"),
      expiryDate: new Date("2030-05-20"),
      description: "Certified Solar Energy Installation Specialist",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/solar-cert.webp",
    },
    {
      id: 6,
      title: "Cisco Certified Network Associate",
      issuer: "Cisco Systems Inc.",
      category: "Others",
      issueDate: new Date("2020-11-10"),
      expiryDate: new Date("2029-11-10"),
      description: "CCNA Routing and Switching Certification",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/ccna-cert.webp",
    },
    {
      id: 7,
      title: "Microsoft Certified Solutions Associate",
      issuer: "Microsoft Corporation",
      category: "Others",
      issueDate: new Date("2021-02-15"),
      expiryDate: new Date("2030-02-15"),
      description: "MCSA Windows Server 2016 Certification",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/mcsa-cert.webp",
    },
    {
      id: 8,
      title: "CCTV Security System Certification",
      issuer: "British Standards Institution",
      category: "NCA",
      issueDate: new Date("2020-08-05"),
      expiryDate: new Date("2029-08-05"),
      description: "Certified CCTV System Designer and Installer",
      imageUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/cctv-cert.webp",
    },
  ];

  const categories = ["All", "EPRA", "NCA", "KRA", "Others"];

  const isExpired = (expiryDate: Date | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const filteredCertificates = useMemo(() => {
    return selectedCategory === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (!autoScroll || filteredCertificates.length === 0) return;
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 300;
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [autoScroll, filteredCertificates.length]);

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
            className="flex items-center gap-6"
          >
            <Award size={48} />
            <div>
              <h1 className="text-5xl font-bold mb-4">Certifications & Licenses</h1>
              <p className="text-xl text-gray-100">
                Our professional credentials and regulatory compliance
              </p>
            </div>
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
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-[#1E3A5F] mb-8 text-center"
          >
            Filter by Category
          </motion.h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-[#00D084] text-white shadow-lg"
                    : "bg-white text-[#1E3A5F] border-2 border-gray-200 hover:border-[#00D084]"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certificates Gallery */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          {filteredCertificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Award size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">
                No certificates available in this category
              </p>
            </motion.div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth" ref={scrollContainerRef} onMouseEnter={() => setAutoScroll(false)} onMouseLeave={() => setAutoScroll(true)}>
              {filteredCertificates.map((cert, index) => {
                const expired = isExpired(cert.expiryDate);
                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, scale: 1.08, boxShadow: "0 20px 40px rgba(0, 208, 132, 0.2)" }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex-shrink-0 w-64 bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#00D084] transition-all group cursor-pointer relative"
                  >
                    {/* Certificate Image */}
                    <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="text-center">
                          <Award size={32} className="mx-auto text-[#00D084] mb-2 opacity-50" />
                          <p className="text-gray-600 font-semibold text-xs px-2 line-clamp-2">
                            {cert.title}
                          </p>
                        </div>
                      </motion.div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        {expired ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold"
                          >
                            EXPIRED
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold"
                          >
                            ACTIVE
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="p-3 relative">
                      <div className="mb-2">
                        <h3 className="text-sm font-bold text-[#1E3A5F] mb-1 line-clamp-1">
                          {cert.title}
                        </h3>
                        <p className="text-xs text-gray-600 mb-0.5 line-clamp-1">{cert.issuer}</p>
                        <p className="text-xs text-gray-500 italic line-clamp-1">{cert.description}</p>
                      </div>

                      {/* Category Badge */}
                      <div className="mb-2">
                        <span className="inline-block bg-[#00D084]/10 text-[#00D084] px-2 py-0.5 rounded-full text-xs font-semibold">
                          {cert.category}
                        </span>
                      </div>

                      {/* Dates */}
                      <div className="space-y-1 mb-3 text-xs text-gray-600 border-t border-gray-200 pt-2">
                        {cert.issueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className="text-[#00D084]" />
                            <span className="line-clamp-1">
                              Issued: {new Date(cert.issueDate).toLocaleDateString("en-US", {
                                year: "2-digit",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                        {cert.expiryDate && (
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className={expired ? "text-red-500" : "text-[#00D084]"} />
                            <span className={`line-clamp-1 ${expired ? "text-red-600 font-semibold" : ""}`}>
                              Exp: {new Date(cert.expiryDate).toLocaleDateString("en-US", {
                                year: "2-digit",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* View Certificate Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCertificate(cert)}
                        className="w-full inline-flex items-center justify-center gap-1 bg-[#00D084] text-white px-2 py-2 rounded text-xs font-semibold hover:bg-[#0FA55F] transition-colors"
                      >
                        <Download size={12} />
                        View
                      </motion.button>

                      {/* Hover Description Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-[#1E3A5F] via-[#1E3A5F]/85 to-[#1E3A5F]/40 rounded-lg p-3 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      >
                        <p className="text-white text-xs leading-tight font-medium mb-2">
                          {cert.description}
                        </p>
                        <p className="text-[#00D084] text-xs font-semibold flex items-center gap-1">
                          <span>Learn more</span>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            →
                          </motion.span>
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Credentials Summary */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F] text-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Our Commitment to Excellence
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur p-8 rounded-lg border border-white/20"
            >
              <Award size={40} className="mb-4 text-[#00D084]" />
              <h3 className="text-2xl font-bold mb-3">Quality Assured</h3>
              <p className="text-gray-100">
                ISO 9001:2015 certified processes ensuring consistent quality in all our projects and services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/10 backdrop-blur p-8 rounded-lg border border-white/20"
            >
              <Award size={40} className="mb-4 text-[#00D084]" />
              <h3 className="text-2xl font-bold mb-3">Security Focused</h3>
              <p className="text-gray-100">
                ISO 27001:2013 certified information security management protecting client data and privacy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur p-8 rounded-lg border border-white/20"
            >
              <Award size={40} className="mb-4 text-[#00D084]" />
              <h3 className="text-2xl font-bold mb-3">Safety Compliant</h3>
              <p className="text-gray-100">
                OHSAS 18001:2007 certified occupational health and safety management systems.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Certificate Modal Viewer */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1E3A5F]">
                    {selectedCertificate.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedCertificate.issuer}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </motion.button>
              </div>

              <div className="p-6">
                {/* Certificate Image */}
                <div className="mb-6 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedCertificate.imageUrl}
                    alt={selectedCertificate.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Certificate Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">
                      Description
                    </h3>
                    <p className="text-gray-700">
                      {selectedCertificate.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        CATEGORY
                      </p>
                      <p className="text-lg font-bold text-[#1E3A5F]">
                        {selectedCertificate.category}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        STATUS
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          isExpired(selectedCertificate.expiryDate)
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {isExpired(selectedCertificate.expiryDate)
                          ? "EXPIRED"
                          : "ACTIVE"}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        ISSUED DATE
                      </p>
                      <p className="text-lg font-bold text-[#1E3A5F]">
                        {new Date(
                          selectedCertificate.issueDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-gray-600 mb-1">
                        EXPIRY DATE
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          isExpired(selectedCertificate.expiryDate)
                            ? "text-red-600"
                            : "text-[#1E3A5F]"
                        }`}
                      >
                        {new Date(
                          selectedCertificate.expiryDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <motion.a
                  href={selectedCertificate.imageUrl}
                  download={`${selectedCertificate.title.replace(
                    /\s+/g,
                    "_"
                  )}_certificate.webp`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#00D084] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0FA55F] transition-colors"
                >
                  <Download size={18} />
                  Download Certificate
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
