import { motion } from "framer-motion";
import { Award, Download, Upload, Trash2, Calendar, FileText, Search, ArrowUpDown } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Certifications() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [certificates, setCertificates] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "issuer" | "issueDate" | "expiryDate" | "status">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  const isExpired = (expiryDate: Date | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  // Filter by category
  const categoryFiltered =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);

  // Filter by search query
  const searchFiltered = categoryFiltered.filter((cert) => {
    const query = searchQuery.toLowerCase();
    return (
      cert.title.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query) ||
      cert.category.toLowerCase().includes(query)
    );
  });

  // Sort certificates
  const sortedCertificates = useMemo(() => {
    const sorted = [...searchFiltered];
    
    sorted.sort((a, b) => {
      let compareValue = 0;

      switch (sortBy) {
        case "title":
          compareValue = a.title.localeCompare(b.title);
          break;
        case "issuer":
          compareValue = a.issuer.localeCompare(b.issuer);
          break;
        case "issueDate":
          compareValue = new Date(a.issueDate || 0).getTime() - new Date(b.issueDate || 0).getTime();
          break;
        case "expiryDate":
          compareValue = new Date(a.expiryDate || 0).getTime() - new Date(b.expiryDate || 0).getTime();
          break;
        case "status":
          const aExpired = isExpired(a.expiryDate);
          const bExpired = isExpired(b.expiryDate);
          compareValue = aExpired === bExpired ? 0 : aExpired ? 1 : -1;
          break;
        default:
          compareValue = 0;
      }

      return sortOrder === "asc" ? compareValue : -compareValue;
    });

    return sorted;
  }, [searchFiltered, sortBy, sortOrder]);

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

      {/* Search and Sort Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-white border-b border-gray-200"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 items-end">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <label className="block text-sm font-semibold text-[#1E3A5F] mb-2">
                Search Certificates
              </label>
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title, issuer, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D084] focus:outline-none transition-colors"
                />
              </div>
            </motion.div>

            {/* Sort Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-[#1E3A5F] mb-2">
                Sort By
              </label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#00D084] focus:outline-none transition-colors"
                >
                  <option value="title">Title</option>
                  <option value="issuer">Issuer</option>
                  <option value="issueDate">Issue Date</option>
                  <option value="expiryDate">Expiry Date</option>
                  <option value="status">Status</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-4 py-3 bg-[#00D084] text-white rounded-lg hover:bg-[#0FA55F] transition-colors flex items-center gap-2 font-semibold"
                >
                  <ArrowUpDown size={18} />
                  {sortOrder === "asc" ? "↑" : "↓"}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm text-gray-600"
          >
            Showing <span className="font-semibold text-[#1E3A5F]">{sortedCertificates.length}</span> of{" "}
            <span className="font-semibold text-[#1E3A5F]">{certificates.length}</span> certificates
          </motion.div>
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
          {sortedCertificates.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">
                {searchQuery
                  ? "No certificates match your search"
                  : "No certificates available in this category"}
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedCertificates.map((cert, index) => {
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
