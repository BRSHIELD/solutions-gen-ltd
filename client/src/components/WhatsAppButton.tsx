import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = "254700000000";
  const message = "Hi, I'm interested in Solutions Gen Ltd services.";

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
    >
      <MessageCircle size={24} />
    </motion.a>
  );
}
