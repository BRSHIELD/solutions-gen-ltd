import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const [location] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    service: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validation rules
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        } else if (value.trim().length > 50) {
          error = "Name must be less than 50 characters";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = "Please enter a valid email address";
          }
        }
        break;

      case "phone":
        if (value.trim()) {
          const phoneRegex = /^[\d\s\-\+\(\)]+$/;
          if (!phoneRegex.test(value)) {
            error = "Please enter a valid phone number";
          } else if (value.replace(/\D/g, "").length < 7) {
            error = "Phone number must have at least 7 digits";
          }
        }
        break;

      case "service":
        if (!value) {
          error = "Please select a service";
        }
        break;

      case "message":
        if (!value.trim()) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        } else if (value.trim().length > 1000) {
          error = "Message must be less than 1000 characters";
        }
        break;

      default:
        break;
    }

    return error;
  };

  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(location.split('?')[1]);
    const service = params.get('service');
    const type = params.get('type');

    if (service || type) {
      let serviceValue = "";
      let messagePrefix = "";

      // Map service names to form values
      if (service === "Electrical Engineering") serviceValue = "electrical";
      else if (service === "Solar & Green Energy") serviceValue = "solar";
      else if (service === "CCTV & Security Systems") serviceValue = "security";
      else if (service === "Networking & Communication") serviceValue = "networking";
      else if (service === "Access Control Systems") serviceValue = "access";
      else if (service === "ICT Solutions") serviceValue = "ict";

      if (type === "site-visit") {
        messagePrefix = `I would like to request a site visit for ${service || 'your services'}. `;
      } else if (service) {
        messagePrefix = `I would like to request a quote for ${service}. `;
      }

      setFormData((prev) => ({
        ...prev,
        service: serviceValue,
        message: messagePrefix,
      }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      service: validateField("service", formData.service),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });

    return Object.values(newErrors).every((error) => error === "");
  };

  const submitContactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      console.log("Form submitted successfully:", formData);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setTouched({ name: false, email: false, phone: false, service: false, message: false });
      setErrors({ name: "", email: "", phone: "", service: "", message: "" });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (error) => {
      console.error("Form submission error:", error);
      setErrors((prev) => ({
        ...prev,
        message: "Failed to submit form. Please try again.",
      }));
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        service: formData.service,
        message: formData.message,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.values(errors).every((error) => error === "") &&
    formData.name &&
    formData.email &&
    formData.service &&
    formData.message;

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
            {/* Phone */}
            <motion.a
              href="tel:+254722588932"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">Phone</h3>
              <p className="text-gray-700 font-semibold mb-1 hover:text-[#00D084] transition-colors">
                +254 722 588 932
              </p>
              <p className="text-gray-600 text-sm hover:text-[#00D084] transition-colors">
                +254 792 405 667
              </p>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:info@solutionsgen.co.ke"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">Email</h3>
              <p className="text-gray-700 font-semibold mb-1 hover:text-[#00D084] transition-colors">
                info@solutionsgen.co.ke
              </p>
              <p className="text-gray-600 text-sm hover:text-[#00D084] transition-colors">
                info@solutionsgen.com
              </p>
            </motion.a>

            {/* Address */}
            <motion.a
              href="https://maps.google.com/?q=Fortis+Industrial+Park,+Mombassa+Road,+Nairobi"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">Address</h3>
              <p className="text-gray-700 font-semibold mb-1 hover:text-[#00D084] transition-colors">
                Fortis Industrial Park
              </p>
              <p className="text-gray-600 text-sm hover:text-[#00D084] transition-colors">
                Off Mombassa Road, Godown No.17, Nairobi
              </p>
            </motion.a>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">Business Hours</h3>
              <p className="text-gray-700 font-semibold mb-1">Mon - Fri: 8AM - 5PM</p>
              <p className="text-gray-600 text-sm">Saturday: 9AM - 1PM</p>
            </motion.div>
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
              <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">Send us a Message</h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and we will get back to you as soon as possible
              </p>
            </motion.div>

            {/* Success Message */}
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-center gap-3"
              >
                <CheckCircle size={24} className="text-green-500" />
                <div>
                  <h3 className="font-semibold text-green-800">Message Sent Successfully!</h3>
                  <p className="text-green-700 text-sm">
                    Thank you for your message. We will get back to you soon.
                  </p>
                </div>
              </motion.div>
            )}

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="bg-gray-50 p-8 rounded-lg shadow-md space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                        touched.name && errors.name
                          ? "border-red-500 bg-red-50 focus:border-red-500"
                          : touched.name && !errors.name
                          ? "border-green-500 bg-green-50 focus:border-green-500"
                          : "border-gray-300 focus:border-[#00D084]"
                      }`}
                      placeholder="Your name"
                    />
                    {touched.name && !errors.name && formData.name && (
                      <CheckCircle size={20} className="absolute right-3 top-3 text-green-500" />
                    )}
                    {touched.name && errors.name && (
                      <AlertCircle size={20} className="absolute right-3 top-3 text-red-500" />
                    )}
                  </div>
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                        touched.email && errors.email
                          ? "border-red-500 bg-red-50 focus:border-red-500"
                          : touched.email && !errors.email
                          ? "border-green-500 bg-green-50 focus:border-green-500"
                          : "border-gray-300 focus:border-[#00D084]"
                      }`}
                      placeholder="your@email.com"
                    />
                    {touched.email && !errors.email && formData.email && (
                      <CheckCircle size={20} className="absolute right-3 top-3 text-green-500" />
                    )}
                    {touched.email && errors.email && (
                      <AlertCircle size={20} className="absolute right-3 top-3 text-red-500" />
                    )}
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Phone Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                        touched.phone && errors.phone
                          ? "border-red-500 bg-red-50 focus:border-red-500"
                          : touched.phone && !errors.phone && formData.phone
                          ? "border-green-500 bg-green-50 focus:border-green-500"
                          : "border-gray-300 focus:border-[#00D084]"
                      }`}
                      placeholder="+254 700 000 000"
                    />
                    {touched.phone && !errors.phone && formData.phone && (
                      <CheckCircle size={20} className="absolute right-3 top-3 text-green-500" />
                    )}
                    {touched.phone && errors.phone && (
                      <AlertCircle size={20} className="absolute right-3 top-3 text-red-500" />
                    )}
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Service Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Service Interested In <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all appearance-none ${
                        touched.service && errors.service
                          ? "border-red-500 bg-red-50 focus:border-red-500"
                          : touched.service && !errors.service && formData.service
                          ? "border-green-500 bg-green-50 focus:border-green-500"
                          : "border-gray-300 focus:border-[#00D084]"
                      }`}
                    >
                      <option value="">Select a service</option>
                      <option value="electrical">Electrical Engineering</option>
                      <option value="solar">Solar & Green Energy</option>
                      <option value="security">CCTV & Security Systems</option>
                      <option value="networking">Networking & Communication</option>
                      <option value="access">Access Control Systems</option>
                      <option value="ict">ICT Solutions</option>
                    </select>
                    {touched.service && !errors.service && formData.service && (
                      <CheckCircle size={20} className="absolute right-3 top-3 text-green-500 pointer-events-none" />
                    )}
                    {touched.service && errors.service && (
                      <AlertCircle size={20} className="absolute right-3 top-3 text-red-500 pointer-events-none" />
                    )}
                  </div>
                  {touched.service && errors.service && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all resize-none ${
                      touched.message && errors.message
                        ? "border-red-500 bg-red-50 focus:border-red-500"
                        : touched.message && !errors.message
                        ? "border-green-500 bg-green-50 focus:border-green-500"
                        : "border-gray-300 focus:border-[#00D084]"
                    }`}
                    placeholder="Tell us about your project or inquiry..."
                  />
                  {touched.message && !errors.message && formData.message && (
                    <CheckCircle size={20} className="absolute right-3 top-3 text-green-500" />
                  )}
                  {touched.message && errors.message && (
                    <AlertCircle size={20} className="absolute right-3 top-3 text-red-500" />
                  )}
                </div>
                <div className="flex justify-between items-start mt-2">
                  {touched.message && errors.message && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.message}
                    </p>
                  )}
                  <p className={`text-sm ml-auto ${formData.message.length > 900 ? "text-red-500" : "text-gray-500"}`}>
                    {formData.message.length}/1000
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 rounded-lg font-bold transition-all duration-300 ${
                  isFormValid
                    ? "bg-gradient-to-r from-[#1E3A5F] to-[#00D084] text-white hover:shadow-lg cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
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
