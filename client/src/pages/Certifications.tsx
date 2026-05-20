import { motion } from "framer-motion";
import { Award, Download, Upload, Trash2, Calendar, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Certifications() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [certificates, setCertificates] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const certificatesQuery = trpc.certificates.list.useQuery();
  const uploadMutation = trpc.certificates.upload.useMutation();
  const deleteMutation = trpc.certificates.delete.useMutation();

  useEffect(() => {
    if (certificatesQuery.data) {
      setCertificates(certificatesQuery.data);
    }
  }, [certificatesQuery.data]);

  const categories = [
    "All",
    "Quality",
    "Security",
    "Safety",
    "Licensing",
    "Solar",
    "ICT",
  ];

  const filteredCertificates =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const title = prompt("Certificate Title (e.g., ISO 9001):");
    const issuer = prompt("Certificate Issuer (e.g., International Organization):");
    const category = prompt("Category (Quality/Security/Safety/Licensing/Solar/ICT):");
    const issueDateStr = prompt("Issue Date (YYYY-MM-DD):");
    const expiryDateStr = prompt("Expiry Date (YYYY-MM-DD):");

    if (!title || !issuer || !category) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setUploading(true);
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");

      await uploadMutation.mutateAsync({
        title,
        issuer,
        category,
        fileBuffer: base64,
        issueDate: issueDateStr ? new Date(issueDateStr) : undefined,
        expiryDate: expiryDateStr ? new Date(expiryDateStr) : undefined,
      });

      certificatesQuery.refetch();
      alert("Certificate uploaded successfully!");
    } catch (error) {
      alert("Failed to upload certificate");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      certificatesQuery.refetch();
    } catch (error) {
      alert("Failed to delete certificate");
    }
  };

  const isExpired = (expiryDate: Date | null) => {
    if (!expiryDate) return false;
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

      {/* Admin Upload Section */}
      {user?.role === "admin" && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="py-12 bg-blue-50 border-b-2 border-blue-200"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">
              Manage Certificates
            </h2>
            <label className="flex items-center gap-3 bg-white p-6 rounded-lg border-2 border-dashed border-[#00D084] cursor-pointer hover:bg-green-50 transition-colors">
              <Upload size={24} className="text-[#00D084]" />
              <span className="text-lg font-semibold text-[#1E3A5F]">
                {uploading ? "Uploading..." : "Click to upload PDF certificate"}
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-600 mt-3">
              You will be prompted to enter certificate details (title, issuer, category, dates)
            </p>
          </div>
        </motion.section>
      )}

      {/* Category Filter */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
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

      {/* Certificates Grid */}
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
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">
                No certificates available in this category
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCertificates.map((cert, index) => {
                const expired = isExpired(cert.expiryDate);
                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-[#00D084] transition-all"
                  >
                    {/* Status Badge */}
                    {expired && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mb-4"
                      >
                        Expired
                      </motion.div>
                    )}
                    {!expired && cert.expiryDate && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-4"
                      >
                        Active
                      </motion.div>
                    )}

                    <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{cert.issuer}</p>

                    {/* Dates */}
                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                      {cert.issueDate && (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {cert.expiryDate && (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>Expires: {new Date(cert.expiryDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <motion.a
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#00D084] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0FA55F] transition-colors"
                      >
                        <Download size={18} />
                        View PDF
                      </motion.a>
                      {user?.role === "admin" && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(cert.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-6">
              Our Compliance & Credentials
            </h2>
            <p className="text-gray-700 text-lg mb-4">
              Solutions General Ltd maintains the highest standards of professional excellence and regulatory compliance. All our certifications are current and verified by the respective issuing authorities.
            </p>
            <p className="text-gray-700 text-lg">
              Our commitment to quality, safety, and innovation is demonstrated through our comprehensive portfolio of industry certifications and licenses. We regularly update our credentials to ensure we meet and exceed all regulatory requirements.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
