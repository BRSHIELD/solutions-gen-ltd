import { motion } from "framer-motion";
import { Download, FileText, Award } from "lucide-react";
import { useState } from "react";

export default function Certifications() {
  // Sample certificates data - these can be updated with actual PDFs
  const [certificates] = useState([
    {
      id: 1,
      title: "ISO 9001:2015",
      description: "Quality Management System Certification",
      category: "Quality",
      issuer: "International Organization for Standardization",
      issueDate: "2023-06-15",
      expiryDate: "2026-06-14",
      pdfUrl: "#", // Replace with actual PDF URL
    },
    {
      id: 2,
      title: "ISO 27001:2013",
      description: "Information Security Management System",
      category: "Security",
      issuer: "International Organization for Standardization",
      issueDate: "2023-08-20",
      expiryDate: "2026-08-19",
      pdfUrl: "#",
    },
    {
      id: 3,
      title: "OHSAS 18001",
      description: "Occupational Health and Safety Management",
      category: "Safety",
      issuer: "British Standards Institution",
      issueDate: "2023-04-10",
      expiryDate: "2026-04-09",
      pdfUrl: "#",
    },
    {
      id: 4,
      title: "Electrical Contractors License",
      description: "Professional Electrical Installation License",
      category: "Licensing",
      issuer: "Energy and Petroleum Regulatory Authority",
      issueDate: "2022-12-01",
      expiryDate: "2027-11-30",
      pdfUrl: "#",
    },
    {
      id: 5,
      title: "Solar Installation Certification",
      description: "Certified Solar Energy System Installer",
      category: "Solar",
      issuer: "Renewable Energy Association",
      issueDate: "2023-03-15",
      expiryDate: "2025-03-14",
      pdfUrl: "#",
    },
    {
      id: 6,
      title: "Network Security Certification",
      description: "Advanced Network Security Professional",
      category: "ICT",
      issuer: "CompTIA",
      issueDate: "2023-09-01",
      expiryDate: "2026-08-31",
      pdfUrl: "#",
    },
  ]);

  const categories = ["All", "Quality", "Security", "Safety", "Licensing", "Solar", "ICT"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCertificates =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((c) => c.category === selectedCategory);

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

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
            <h1 className="text-5xl font-bold mb-6">Our Certifications</h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              Industry-recognized certifications and credentials that demonstrate our commitment to excellence and compliance
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Info Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-blue-50 border-l-4 border-[#00D084] py-6"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4">
            <Award size={24} className="text-[#00D084] flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-[#1E3A5F] mb-2">Quality Assurance</h3>
              <p className="text-gray-700">
                All our certifications are current and regularly audited to ensure compliance with international standards. Download any certificate to verify authenticity.
              </p>
            </div>
          </div>
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
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#1E3A5F] text-white shadow-lg"
                    : "bg-white text-[#1E3A5F] border-2 border-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Certificates Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Certificate Header */}
                <div className="bg-gradient-to-r from-[#1E3A5F] to-[#00D084] p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileText size={32} />
                      <div>
                        <h3 className="text-xl font-bold">{cert.title}</h3>
                        <p className="text-sm text-gray-100">{cert.category}</p>
                      </div>
                    </div>
                    {isExpired(cert.expiryDate) && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        EXPIRED
                      </span>
                    )}
                    {!isExpired(cert.expiryDate) && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{cert.description}</p>

                  <div className="space-y-3 mb-6 text-sm">
                    <div>
                      <p className="text-gray-600 font-semibold">Issuer</p>
                      <p className="text-gray-800">{cert.issuer}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600 font-semibold">Issue Date</p>
                        <p className="text-gray-800">
                          {new Date(cert.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 font-semibold">Expiry Date</p>
                        <p className={isExpired(cert.expiryDate) ? "text-red-600 font-bold" : "text-gray-800"}>
                          {new Date(cert.expiryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <a
                    href={cert.pdfUrl}
                    download
                    className="w-full bg-[#1E3A5F] text-white py-3 rounded-lg font-semibold hover:bg-[#0FA55F] transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                    Download Certificate
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredCertificates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No certificates found in this category.</p>
            </motion.div>
          )}
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
          <div className="grid md:grid-cols-3 gap-8 text-white text-center">
            {[
              { number: certificates.length.toString(), label: "Active Certifications" },
              { number: certificates.filter(c => !isExpired(c.expiryDate)).length.toString(), label: "Current Credentials" },
              { number: "100%", label: "Compliance Rate" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-gray-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Upload Instructions */}
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
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">
              How to Update Certifications
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              To add or update certificates, contact your website administrator with the PDF files and certificate details
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Prepare PDF",
                description: "Ensure your certificate PDF is clear and properly formatted",
              },
              {
                step: "2",
                title: "Provide Details",
                description: "Include certificate title, issuer, dates, and category",
              },
              {
                step: "3",
                title: "Upload",
                description: "Submit to admin for review and publication",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-12 h-12 bg-[#1E3A5F] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{item.title}</h3>
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
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#1E3A5F] mb-6">
              Trust Our Credentials
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our certifications ensure we meet the highest industry standards and regulatory requirements
            </p>
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1E3A5F] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#0FA55F] transition-all duration-300 inline-block"
            >
              Get More Information
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
