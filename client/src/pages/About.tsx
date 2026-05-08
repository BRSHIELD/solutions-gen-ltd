import { motion } from "framer-motion";
import { CheckCircle, Users, Target, Lightbulb, Award, Shield } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "Delivering superior quality in every project and service across all sectors",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Embracing cutting-edge technology and creative engineering solutions",
    },
    {
      icon: Shield,
      title: "Safety & Integrity",
      description: "Prioritizing health, safety, and ethical business practices",
    },
    {
      icon: Users,
      title: "Responsibility",
      description: "Considering impact on people, clients, communities, and environment",
    },
  ];

  const team = [
    {
      name: "Mr. Patrick K. Nduva",
      role: "Managing Director & Founder",
      expertise: "Electrical Engineering & Strategic Leadership",
    },
    {
      name: "Patrick Kivai Nduvah",
      role: "Certified Electrical Worker",
      expertise: "Electrical Installation & Solar PV Systems",
    },
    {
      name: "Wilson Gathaiyu",
      role: "Solar PV Technician",
      expertise: "Renewable Energy & Solar Installation",
    },
  ];

  const certifications = [
    { title: "NCA 1 License", description: "National Construction Authority - Electrical Engineering Service Contractor" },
    { title: "EPRA Class A-1", description: "Energy and Petroleum Regulatory Authority - Electrical Contractor License" },
    { title: "Solar PV License T3", description: "EPRA Solar Photovoltaic Manufacturer/Importer License" },
    { title: "ISO Compliant", description: "Quality Management and Safety Standards" },
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
            <h1 className="text-5xl font-bold mb-6">About Solutions General Ltd</h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              East Africa's leading provider of comprehensive Electrical, ICT, Security, and Solar PV Engineering solutions
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
                Solutions General Ltd was founded in 2006 by Mr. Patrick K. Nduva, a seasoned Electrical Engineer and visionary entrepreneur. From inception, we have been dedicated to delivering high-quality services, innovative solutions, and sustainable growth across East Africa.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Throughout our two-decade journey, Solutions General Ltd has demonstrated unwavering commitment to quality, safety, and innovation. Our growth has been both sustainable and strategic, driven by a focus on building long-term relationships with clients and partners across Kenya and beyond.
              </p>
              <p className="text-gray-700 text-lg">
                Today, we have successfully delivered numerous projects for government agencies, multinational corporations, local businesses, and communities across the continent, earning recognition as East Africa's premier engineering solutions provider.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">Founded</h3>
                  <p className="text-gray-600">2006 in Nairobi, Kenya</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">Founder & MD</h3>
                  <p className="text-gray-600">Mr. Patrick K. Nduva</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">Headquarters</h3>
                  <p className="text-gray-600">Fortis Industrial Park, Nairobi</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1E3A5F] mb-2">Scope</h3>
                  <p className="text-gray-600">East Africa & Continental Projects</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F]"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-gray-100 mb-4">
                To be the premier and most trusted provider of innovative, sustainable, and high-quality electrical and engineering solutions in East Africa.
              </p>
              <p className="text-xl text-gray-100">
                We strive to set industry standards through excellence, integrity, and cutting-edge technology, empowering communities and businesses to build a resilient and prosperous future.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-100 mb-4">
                To deliver high-quality, cost-effective electrical and construction services that meet and exceed our clients' expectations.
              </p>
              <p className="text-xl text-gray-100">
                We are committed to maintaining the highest standards of safety, professionalism, and environmental responsibility while continually expanding our expertise and operational reach across East Africa.
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
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              At Solutions General, our core values are rooted in corporate responsibility and ethical integrity. We are committed to achieving success in ways that honor ethical standards and respect for people, communities, and the natural environment.
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
                  className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-all duration-300"
                >
                  <Icon size={48} className="text-[#00D084] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Certifications & Licenses */}
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
              Licenses & Certifications
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We hold prestigious licenses and certifications from leading regulatory authorities, demonstrating our commitment to compliance and excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#00D084]"
              >
                <Award size={32} className="text-[#1E3A5F] mb-4" />
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{cert.title}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Leadership Team */}
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
              Leadership & Expertise
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our team brings decades of combined experience in electrical engineering, solar energy, and technology solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A5F] to-[#00D084] rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-2">{member.name}</h3>
                <p className="text-[#00D084] font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600">{member.expertise}</p>
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
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
              Let's work together to bring your vision to life with innovative, reliable, and sustainable engineering solutions.
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
