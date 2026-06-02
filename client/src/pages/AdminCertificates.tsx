import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Plus, X, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

export default function AdminCertificates() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    category: "EPRA",
    issueDate: "",
    expiryDate: "",
  });

  // Queries and mutations
  const { data: certificates, isLoading, refetch } = trpc.certificates.list.useQuery();
  const uploadMutation = trpc.certificates.upload.useMutation();
  const deleteMutation = trpc.certificates.delete.useMutation();

  // Redirect if not admin
  if (user && user.role !== "admin") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Only administrators can access this page.</p>
          <Button onClick={() => setLocation("/")} className="bg-[#00D084]">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".pdf")) {
      alert("Please select a PDF file");
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64String = event.target?.result as string;
        const base64Data = base64String.split(",")[1];

        await uploadMutation.mutateAsync({
          title: formData.title,
          issuer: formData.issuer,
          category: formData.category,
          issueDate: formData.issueDate ? new Date(formData.issueDate) : undefined,
          expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
          fileBuffer: base64Data,
        });

        // Reset form
        setFormData({
          title: "",
          issuer: "",
          category: "EPRA",
          issueDate: "",
          expiryDate: "",
        });
        setShowForm(false);
        refetch();
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload certificate");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete certificate");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.issuer) {
      alert("Please fill in all required fields");
      return;
    }
    fileInputRef.current?.click();
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
            <h1 className="text-5xl font-bold mb-4">Manage Certificates</h1>
            <p className="text-xl text-gray-100">Add, edit, or remove PDF certificates</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Add Certificate Button */}
          <div className="mb-8">
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#00D084] hover:bg-[#0FA55F] text-white flex items-center gap-2"
            >
              <Plus size={20} />
              Add New Certificate
            </Button>
          </div>

          {/* Add Certificate Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border-2 border-gray-200 rounded-lg p-8 mb-8"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#1E3A5F]">Add New Certificate</h2>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Certificate Title *
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., ISO 9001:2015"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Issuer *
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g., International Organization for Standardization"
                        value={formData.issuer}
                        onChange={(e) =>
                          setFormData({ ...formData, issuer: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#00D084]"
                      >
                        <option value="EPRA">EPRA</option>
                        <option value="NCA">NCA</option>
                        <option value="KRA">KRA</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Issue Date
                      </label>
                      <Input
                        type="date"
                        value={formData.issueDate}
                        onChange={(e) =>
                          setFormData({ ...formData, issueDate: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <Input
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          setFormData({ ...formData, expiryDate: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isUploading}
                      className="bg-[#00D084] hover:bg-[#0FA55F] text-white flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={20} />
                          Select PDF & Upload
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Certificates List */}
          <div>
            <h2 className="text-2xl font-bold text-[#1E3A5F] mb-6">
              Existing Certificates ({certificates?.length || 0})
            </h2>

            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 size={32} className="animate-spin mx-auto text-[#00D084]" />
              </div>
            ) : certificates && certificates.length > 0 ? (
              <div className="grid gap-4">
                {certificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-[#00D084] transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{cert.issuer}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                          <span className="bg-[#00D084] text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {cert.category}
                          </span>
                          {cert.issueDate && (
                            <span>
                              Issued:{" "}
                              {new Date(cert.issueDate).toLocaleDateString()}
                            </span>
                          )}
                          {cert.expiryDate && (
                            <span>
                              Expires:{" "}
                              {new Date(cert.expiryDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={cert.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          View PDF
                        </a>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          disabled={deleteMutation.isPending}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white border-2 border-gray-200 rounded-lg">
                <p className="text-gray-600 text-lg">No certificates yet. Add one to get started!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
