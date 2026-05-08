import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
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
            <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              Have a question or ready to start your project? We would love to hear from you.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Phone,
                title: "Phone",
                content: "+254 722 588 932",
                subtext: "+254 792 405 667",
              },
              {
                icon: Mail,
                title: "Email",
                content: "info@solutionsgen.co.ke",
                subtext: "info@solutionsgen.com",
              },
              {
                icon: MapPin,
                title: "Address",
                content: "Fortis Industrial Park",
                subtext: "Off Mombassa Road, Godown No.17, Nairobi",
              },
              {
                icon: Clock,
                title: "Business Hours",
                content: "Mon - Fri: 8AM - 5PM",
                subtext: "Saturday: 9AM - 1PM",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 font-semibold mb-1">{item.content}</p>
                  <p className="text-gray-600 text-sm">{item.subtext}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">
                Send us a Message
              </h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and we will get back to you as soon as possible
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="bg-gray-50 p-8 rounded-lg shadow-md space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00D084] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00D084] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00D084] transition-colors"
                    placeholder="+254 700 000 000"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00D084] transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="electrical">Electrical Engineering</option>
                    <option value="solar">Solar & Green Energy</option>
                    <option value="security">Security Systems</option>
                    <option value="networking">Networking & Communication</option>
                    <option value="access">Access Control Systems</option>
                    <option value="ict">ICT Solutions</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#00D084] transition-colors resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#1E3A5F] to-[#00D084] text-white py-4 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.section>

      {/* Quick Contact */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F]"
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">Need Quick Assistance?</h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Chat with us directly on WhatsApp for immediate support
            </p>
            <a
              href="https://wa.me/254722588932"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#1E3A5F] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 inline-block"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
