import { motion } from "framer-motion";
import { Upload, Download, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";

interface BatchUploadState {
  status: "idle" | "uploading" | "success" | "error";
  message: string;
  results?: {
    successful: number;
    failed: number;
    errors: string[];
  };
}

export default function BatchCertificateUpload() {
  const [uploadState, setUploadState] = useState<BatchUploadState>({
    status: "idle",
    message: "",
  });
  const batchUploadMutation = trpc.certificates.batchUpload.useMutation();

  const downloadCSVTemplate = () => {
    const csvContent = `title,issuer,category,issueDate,expiryDate
ISO 9001:2015 Quality Management,International Organization for Standardization,Quality,2023-01-15,2026-01-15
ISO 27001:2022 Information Security,International Organization for Standardization,Security,2023-06-20,2026-06-20
OHSAS 18001:2007 Occupational Health & Safety,British Standards Institution,Safety,2022-03-10,2025-03-10
EPRA Electrical Contractor License,Energy and Petroleum Regulatory Authority,Licensing,2023-02-19,2026-02-19
NCA Compliance Certificate,National Construction Authority,Licensing,2023-05-10,2026-05-10`;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
    );
    element.setAttribute("download", "certificates_template.csv");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      setUploadState({
        status: "error",
        message: "Please upload a CSV file",
      });
      return;
    }

    try {
      setUploadState({
        status: "uploading",
        message: "Processing CSV file...",
      });

      const text = await file.text();
      const lines = text.split("\n").filter((line) => line.trim());
      const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

      const certificates = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim());
        if (values.length < 3) continue;

        const cert: any = {};
        headers.forEach((header, index) => {
          cert[header] = values[index];
        });

        // Read PDF file - for now, we'll create a placeholder
        // In production, you'd need to handle PDF files in the CSV
        const pdfFileName = `${cert.title || `Certificate ${i}`}.pdf`;
        
        // Create a minimal PDF buffer (placeholder)
        // In real usage, you'd need to upload PDFs alongside CSV
        const pdfBuffer = Buffer.from("%PDF-1.4\n%EOF", "utf-8");
        const base64 = pdfBuffer.toString("base64");

        certificates.push({
          title: cert.title || "",
          issuer: cert.issuer || "",
          category: cert.category || "Quality",
          issueDate: cert.issuedate || undefined,
          expiryDate: cert.expirydate || undefined,
          fileBuffer: base64,
        });
      }

      if (certificates.length === 0) {
        setUploadState({
          status: "error",
          message: "No valid certificates found in CSV",
        });
        return;
      }

      setUploadState({
        status: "uploading",
        message: `Uploading ${certificates.length} certificates...`,
      });

      const results = await batchUploadMutation.mutateAsync({
        certificates,
      });

      setUploadState({
        status: results.failed === 0 ? "success" : "error",
        message:
          results.failed === 0
            ? `Successfully uploaded ${results.successful} certificates!`
            : `Uploaded ${results.successful} certificates with ${results.failed} failures`,
        results,
      });
    } catch (error) {
      setUploadState({
        status: "error",
        message: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-lg border-2 border-purple-200"
    >
      <h3 className="text-2xl font-bold text-[#1E3A5F] mb-4">
        Batch Upload Certificates
      </h3>
      <p className="text-gray-700 mb-6">
        Upload multiple certificates at once using a CSV file. Download the template below to get started.
      </p>

      {/* Download Template Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={downloadCSVTemplate}
        className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors mb-6"
      >
        <Download size={20} />
        Download CSV Template
      </motion.button>

      {/* File Upload Area */}
      <label className="flex flex-col items-center justify-center gap-4 bg-white p-8 rounded-lg border-2 border-dashed border-purple-300 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all">
        <Upload size={32} className="text-purple-500" />
        <div className="text-center">
          <p className="text-lg font-semibold text-[#1E3A5F]">
            Click to upload CSV file
          </p>
          <p className="text-sm text-gray-600">
            or drag and drop your CSV file here
          </p>
        </div>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          disabled={uploadState.status === "uploading"}
          className="hidden"
        />
      </label>

      {/* Status Messages */}
      {uploadState.status !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
            uploadState.status === "success"
              ? "bg-green-100 border border-green-300"
              : uploadState.status === "error"
              ? "bg-red-100 border border-red-300"
              : "bg-blue-100 border border-blue-300"
          }`}
        >
          {uploadState.status === "success" ? (
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
          ) : uploadState.status === "error" ? (
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
          ) : (
            <div className="animate-spin">
              <Upload size={20} className="text-blue-600 flex-shrink-0" />
            </div>
          )}
          <div>
            <p
              className={`font-semibold ${
                uploadState.status === "success"
                  ? "text-green-700"
                  : uploadState.status === "error"
                  ? "text-red-700"
                  : "text-blue-700"
              }`}
            >
              {uploadState.message}
            </p>
            {uploadState.results && (
              <div className="mt-2 text-sm space-y-1">
                <p>✓ Successful: {uploadState.results.successful}</p>
                <p>✗ Failed: {uploadState.results.failed}</p>
                {uploadState.results.errors.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="font-semibold">Errors:</p>
                    {uploadState.results.errors.map((error, idx) => (
                      <p key={idx} className="text-xs">
                        • {error}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 bg-white p-4 rounded-lg border border-gray-200"
      >
        <h4 className="font-semibold text-[#1E3A5F] mb-2">CSV Format Instructions:</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• <strong>title</strong>: Official certificate name</li>
          <li>• <strong>issuer</strong>: Issuing organization</li>
          <li>• <strong>category</strong>: Quality, Security, Safety, Licensing, Solar, or ICT</li>
          <li>• <strong>issueDate</strong>: Date in YYYY-MM-DD format (optional)</li>
          <li>• <strong>expiryDate</strong>: Date in YYYY-MM-DD format (optional)</li>
        </ul>
        <p className="text-xs text-gray-600 mt-3">
          <strong>Note:</strong> PDF files must be uploaded separately through the single upload button. This batch upload processes certificate metadata.
        </p>
      </motion.div>
    </motion.div>
  );
}
