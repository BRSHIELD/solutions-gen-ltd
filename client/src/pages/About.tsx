import { motion } from "framer-motion";
import { CheckCircle, Users, Target, Lightbulb } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Delivering superior quality in every project and service",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing cutting-edge technology and creative solutions",
    },
    {
      icon: Users,
      title: "Integrity",
      description: "Building trust through transparency and ethical practices",
    },
    {
      icon: CheckCircle,
      title: "Reliability",
      description: "Consistent performance and dependable service delivery",
    },
  ];

  const team = [
    {
      name: "Eng. James Kariuki",
      role: "Chief Executive Officer",
      expertise: "Electrical Engineering & Project Management",
    },
    {
      name: "Eng. Patricia Omondi",
      role: "Head of Solar Solutions",
      expertise: "Renewable Energy & Sustainability",
    },
    {
      name: "Eng. David Kipchoge",
      role: "Security Systems Director",
      expertise: "CCTV & Access Control Systems",
    },
    {
      name: "Eng. Lucy Mwangi",
      role: "ICT Solutions Lead",
      expertise: "Network Infrastructure & Cloud Solutions",
    },
  ];

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
            <h1 className="text-5xl font-bold mb-6">About Solutions Gen Ltd</h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              Leading provider of premium engineering and smart technology solutions across East Africa
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Company Story */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-[#1E3A5F] mb-6">
                Our Journey
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                Founded in 2009, Solutions Gen Ltd emerged from a vision to revolutionize the engineering and technology landscape in East Africa. What started as a small team of passionate engineers has grown into a powerhouse of innovation and excellence.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Over the past 15 years, we have successfully completed over 500 projects, earning the trust and respect of clients across various industries including retail, manufacturing, telecommunications, and government sectors.
              </p>
              <p className="text-gray-700 text-lg">
                Today, we continue to push boundaries, embrace new technologies, and deliver solutions that not only meet but exceed our clients' expectations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-[#1E3A5F] to-[#00D084] p-8 rounded-lg text-white"
            >
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <p className="text-gray-100">Years of Excellence</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <p className="text-gray-100">Successful Projects</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <p className="text-gray-100">Expert Engineers</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <p className="text-gray-100">Client Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border-l-4 border-[#00D084]"
            >
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 text-lg">
                To deliver innovative, reliable, and sustainable engineering and technology solutions that empower businesses to achieve their goals and drive positive impact in East Africa.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border-l-4 border-[#FF6B35]"
            >
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 text-lg">
                To be the most trusted and innovative engineering solutions provider in East Africa, recognized for our commitment to excellence, sustainability, and customer success.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
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
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
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
              Leadership Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experienced professionals driving innovation and excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1E3A5F] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#00D084] font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.expertise}</p>
              </motion.div>
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
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Ready to partner with us? Contact our team to discuss your project needs.
            </p>
            <Link href="/contact" className="bg-white text-[#1E3A5F] px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 inline-block">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
