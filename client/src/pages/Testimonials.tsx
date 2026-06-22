import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  const commercialTestimonials = [
    {
      name: "John Mwangi",
      company: "TechCorp Kenya",
      project: "Commercial Solar Installation",
      text: "Solutions Gen Ltd transformed our facility with their professional electrical engineering services. The team was punctual, professional, and delivered exceptional results. Highly recommended!",
      rating: 5,
    },
    {
      name: "Sarah Kipchoge",
      company: "Financial Services Group",
      project: "ICT Infrastructure",
      text: "Their ICT infrastructure solutions have significantly improved our operational efficiency. The installation was seamless and the team provided excellent after-sales support. Excellent team!",
      rating: 5,
    },
    {
      name: "Michael Ochieng",
      company: "Corporate Plaza",
      project: "Access Control System",
      text: "Professional, reliable, and innovative. Solutions Gen is our trusted partner for all security needs. They understand our requirements and deliver beyond expectations.",
      rating: 5,
    },
  ];

  const industrialTestimonials = [
    {
      name: "Dr. James Kariuki",
      company: "Industrial Manufacturing Ltd",
      project: "Electrical Infrastructure",
      text: "Solutions Gen's expertise in industrial electrical systems is unmatched. They upgraded our entire plant's electrical infrastructure with minimal downtime. Outstanding work!",
      rating: 5,
    },
    {
      name: "Peter Mwangi",
      company: "TeleCom Solutions",
      project: "Network Infrastructure",
      text: "The team designed and implemented a comprehensive network infrastructure system for our operations. Their technical knowledge and attention to detail were impressive.",
      rating: 5,
    },
    {
      name: "Grace Omondi",
      company: "SecureNet Solutions",
      project: "Security System Upgrade",
      text: "Working with Solutions Gen on our security system upgrade was seamless. They handled complex technical requirements with ease and professionalism.",
      rating: 5,
    },
  ];

  const TestimonialCard = ({ testimonial, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 208, 132, 0.15)" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white p-8 rounded-lg shadow-md border-2 border-gray-200 hover:border-[#00D084] transition-all"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={20} className="fill-[#FFD700] text-[#FFD700]" />
        ))}
      </div>
      <p className="text-gray-600 mb-4 italic text-lg">"{testimonial.text}"</p>
      <div className="border-t-2 border-gray-200 pt-4">
        <p className="font-bold text-[#1E3A5F] text-lg">{testimonial.name}</p>
        <p className="text-[#00D084] font-semibold">{testimonial.company}</p>
        <p className="text-gray-600 text-sm mt-2">{testimonial.project}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F] text-white py-20 relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 95, 0.75), rgba(15, 165, 95, 0.75)), url('https://images.unsplash.com/photo-1413882353314-73389f63b6fd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6">Client Testimonials</h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              Hear directly from our satisfied clients across commercial and industrial sectors
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Commercial Projects Testimonials */}
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
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">
              Commercial Projects
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Testimonials from our commercial clients showcasing successful project implementations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {commercialTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Industrial Projects Testimonials */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">
              Industrial Projects
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Testimonials from our industrial clients highlighting complex technical implementations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {industrialTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F]"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have transformed their operations with Solutions Gen
            </p>
            <a href="/contact" className="bg-white text-[#1E3A5F] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 inline-block">
              Get In Touch
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
