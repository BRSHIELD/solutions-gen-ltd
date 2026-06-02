import { motion, AnimatePresence } from "framer-motion";
import { Award, Download, Calendar, X } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import { trpc } from "@/lib/trpc";

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  // Fetch certificates from database
  const { data: certificates = [], isLoading } = trpc.certificates.list.useQuery();

  const categories = ["All", "EPRA", "NCA", "KRA", "Others"];

  const isExpired = (expiryDate: Date | null | undefined) => {
    if (!expiryDate) return false;
    const date = new Date(expiryDate);
    if (isNaN(date.getTime())) return false;
    return date < new Date();
  };

  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "N/A";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filteredCertificates = useMemo(() => {
    return selectedCategory === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);
  }, [selectedCategory, certificates]);

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
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Award size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">Loading certificates...</p>
            </motion.div>
          ) : filteredCertificates.length === 0 ? (
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
                    onClick={() => setSelectedCertificate(cert)}
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
                    <div className="p-4">
                      <h3 className="font-bold text-[#1E3A5F] mb-1 line-clamp-2 text-sm">
                        {cert.title}
                      </h3>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar size={14} />
                          <span>
                            {cert.issueDate
                              ? new Date(cert.issueDate).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                })
                              : "N/A"}
                          </span>
                      </div>
                    </div>

                    {/* View Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCertificate(cert);
                      }}
                      className="w-full bg-[#00D084] text-white py-2 font-semibold hover:bg-[#0FA55F] transition-colors text-sm"
                    >
                      View
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F] text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedCertificate.title}</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCertificate(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* PDF Preview */}
                <div className="mb-8 bg-gray-100 rounded-lg p-6 min-h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Award size={64} className="mx-auto text-[#00D084] mb-4" />
                    <p className="text-gray-600 font-semibold mb-4">
                      PDF Certificate Preview
                    </p>
                    <p className="text-gray-500 text-sm mb-6">
                      Click "Download Certificate" to view the full PDF
                    </p>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">ISSUER</p>
                    <p className="text-lg font-bold text-[#1E3A5F]">
                      {selectedCertificate.issuer}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">CATEGORY</p>
                    <p className="text-lg font-bold text-[#00D084]">
                      {selectedCertificate.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">ISSUE DATE</p>
                    <p className="text-lg font-bold text-[#1E3A5F]">
                      {formatDate(selectedCertificate.issueDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">
                      EXPIRY DATE
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        isExpired(selectedCertificate.expiryDate)
                          ? "text-red-600"
                          : "text-[#1E3A5F]"
                      }`}
                    >
                      {formatDate(selectedCertificate.expiryDate)}
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <motion.a
                  href={selectedCertificate.fileUrl}
                  download={`${selectedCertificate.title.replace(
                    /\s+/g,
                    "_"
                  )}_certificate.pdf`}
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
