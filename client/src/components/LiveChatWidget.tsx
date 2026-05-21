import { useState } from "react";
import { MessageCircle, X, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "+254700000000";
  const whatsappMessage = "Hello! I'm interested in your services. Can you help me?";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#00D084] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#00B870] transition-colors"
      >
        <MessageCircle size={24} />
        {/* Notification Badge */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full"
        />
      </motion.button>

      {/* Chat Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E3A5F] to-[#00D084] text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Solutions Gen Ltd</h3>
                <p className="text-sm text-gray-100">We're here to help!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-4 space-y-4">
              {/* Welcome Message */}
              <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700">
                <p>
                  👋 Welcome! How can we assist you today? Feel free to reach out via WhatsApp or contact us directly.
                </p>
              </div>

              {/* Contact Options */}
              <div className="space-y-3">
                {/* WhatsApp Option */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <MessageCircle size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-green-700 text-sm">Chat on WhatsApp</p>
                    <p className="text-xs text-green-600">Quick response guaranteed</p>
                  </div>
                </a>

                {/* Phone Option */}
                <a
                  href={`tel:${whatsappNumber}`}
                  className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-blue-700 text-sm">Call Us</p>
                    <p className="text-xs text-blue-600">{whatsappNumber}</p>
                  </div>
                </a>

                {/* Email Option */}
                <a
                  href="mailto:info@solutionsgen.co.ke"
                  className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors group"
                >
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-purple-700 text-sm">Email Us</p>
                    <p className="text-xs text-purple-600">info@solutionsgen.co.ke</p>
                  </div>
                </a>
              </div>

              {/* Business Hours */}
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-xs text-yellow-800">
                <p className="font-semibold mb-1">⏰ Business Hours</p>
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
