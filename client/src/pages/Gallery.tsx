import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";;

export default function Gallery() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: "Solar Panel Installation",
      category: "solar",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/gallery-solar-installation-gvtGN9WGRAxtoXMuK2v88u.webp",
      description: "Large-scale commercial solar installation on industrial rooftop",
    },
    {
      id: 2,
      title: "Electrical Panel Installation",
      category: "electrical",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/gallery-electrical-work-ASx2iaxCcPHQLbp2wUhFMZ.webp",
      description: "Professional electrical panel installation with safety compliance",
    },
    {
      id: 3,
      title: "CCTV Security System",
      category: "security",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/gallery-security-system-6hryZs3Mndx36EtpKigN95.webp",
      description: "Advanced surveillance system with HD cameras and monitoring",
    },
    {
      id: 4,
      title: "Network Infrastructure",
      category: "networking",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/gallery-networking-CghpTteVSi74Y7f6WCzDhE.webp",
      description: "Fiber optic network installation in data center",
    },
    {
      id: 5,
      title: "Access Control System",
      category: "access",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663637917309/oNqKyoxjmVUDpKzxmYxw2z/gallery-access-control-f5JKwLv4NDhDzRrVmAynYi.webp",
      description: "Biometric access control installation for secure facility",
    },
  ];

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "solar", label: "Solar" },
    { value: "electrical", label: "Electrical" },
    { value: "security", label: "Security" },
    { value: "networking", label: "Networking" },
    { value: "access", label: "Access Control" },
  ];

  const filteredItems = selectedFilter === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedFilter);

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
            <h1 className="text-5xl font-bold mb-6">Project Gallery</h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              Explore our completed projects showcasing our expertise in electrical engineering, solar energy, security systems, and more.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(category.value)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedFilter === category.value
                    ? "bg-[#00D084] text-white shadow-lg"
                    : "bg-white text-[#1E3A5F] border-2 border-[#1E3A5F] hover:border-[#00D084]"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Gallery Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedImage(item.id)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-64">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
                      <p className="text-white text-lg font-bold">{item.title}</p>
                      <p className="text-gray-200 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            {(() => {
              const item = galleryItems.find((i) => i.id === selectedImage);
              return item ? (
                <>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full rounded-lg"
                  />
                  <div className="mt-4 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </>
              ) : null;
            })()}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F] text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready for Your Next Project?</h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our expertise can transform your facility with professional engineering solutions.
            </p>
            <a href="/contact" className="inline-block">
              <button className="bg-white text-[#1E3A5F] font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 text-lg">
                Start Your Project
              </button>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
