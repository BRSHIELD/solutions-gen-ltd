import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useParams } from "wouter";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || "1");

  const projects = [
    {
      id: 1,
      title: "Commercial Solar Installation",
      category: "Solar Energy",
      client: "TechCorp Kenya",
      description: "Large-scale solar panel installation for a major retail chain with 500kW capacity",
      results: "40% reduction in energy costs, 2-year ROI",
      image: "from-[#1E3A5F] to-[#00D084]",
      fullDescription: "TechCorp Kenya, a leading retail chain with 25 locations across East Africa, faced escalating electricity costs that impacted their operational margins. Solutions Gen Ltd designed and implemented a comprehensive 500kW solar energy system across their flagship stores.",
      details: [
        "500kW solar panel array installation",
        "Advanced battery storage system for night-time operations",
        "Smart energy management system with real-time monitoring",
        "Grid-tie inverters for seamless power distribution",
        "24/7 monitoring and maintenance support"
      ],
      timeline: "6 months",
      budget: "Confidential",
      team: "15 engineers, 2 project managers",
    },
    {
      id: 2,
      title: "Security System Upgrade",
      category: "Security",
      client: "SecureNet Solutions",
      description: "Complete CCTV and access control system for corporate offices spanning 5 floors",
      results: "24/7 monitoring, 99.9% uptime achieved",
      image: "from-[#FF6B35] to-[#1E3A5F]",
      fullDescription: "SecureNet Solutions required a state-of-the-art security infrastructure for their new corporate headquarters. We implemented an integrated CCTV and biometric access control system covering all 5 floors with redundant systems for maximum uptime.",
      details: [
        "128 HD CCTV cameras with 4K recording capability",
        "Biometric and card-based access control",
        "Redundant network architecture for 99.9% uptime",
        "Cloud-based monitoring and alert system",
        "Real-time incident response protocols"
      ],
      timeline: "4 months",
      budget: "Confidential",
      team: "12 engineers, 1 project manager",
    },
    {
      id: 3,
      title: "Electrical Infrastructure",
      category: "Electrical",
      client: "Industrial Manufacturing Ltd",
      description: "High-voltage electrical system design and installation for production facility",
      results: "Zero downtime during implementation, full compliance",
      image: "from-[#00D084] to-[#FF6B35]",
      fullDescription: "Industrial Manufacturing Ltd needed to upgrade their electrical infrastructure to support expanded production capacity. Our team designed and installed a high-voltage system without any disruption to ongoing operations.",
      details: [
        "High-voltage transformer installation",
        "Power distribution system upgrade",
        "Backup generator integration",
        "Power factor correction systems",
        "Comprehensive electrical safety systems"
      ],
      timeline: "3 months",
      budget: "Confidential",
      team: "18 engineers, 2 project managers",
    },
    {
      id: 4,
      title: "Network Infrastructure",
      category: "Networking",
      client: "TeleCom Solutions",
      description: "Fiber optic network installation and wireless mesh system deployment",
      results: "1Gbps connectivity, 99.95% availability",
      image: "from-[#1E3A5F] to-[#FF6B35]",
      fullDescription: "TeleCom Solutions required a robust network infrastructure to support their expanding operations. We deployed fiber optic backbone with wireless mesh coverage for seamless connectivity across all facilities.",
      details: [
        "50km fiber optic cable installation",
        "Wireless mesh network deployment",
        "Network security and firewall systems",
        "Redundant connectivity paths",
        "Network monitoring and management tools"
      ],
      timeline: "5 months",
      budget: "Confidential",
      team: "14 engineers, 2 project managers",
    },
    {
      id: 5,
      title: "Access Control System",
      category: "Security",
      client: "Corporate Plaza",
      description: "Biometric and card-based access control for multi-tenant building",
      results: "Real-time access logs, 5000+ users managed",
      image: "from-[#FF6B35] to-[#00D084]",
      fullDescription: "Corporate Plaza, a multi-tenant commercial building, needed a sophisticated access control system to manage 5000+ employees and visitors. We implemented an integrated biometric and card-based system with real-time reporting.",
      details: [
        "Biometric fingerprint and facial recognition",
        "Card-based access control integration",
        "Real-time access logging and reporting",
        "Visitor management system",
        "Emergency lockdown capabilities"
      ],
      timeline: "3 months",
      budget: "Confidential",
      team: "10 engineers, 1 project manager",
    },
    {
      id: 6,
      title: "ICT Infrastructure",
      category: "ICT",
      client: "Financial Services Group",
      description: "Cloud infrastructure setup and cybersecurity implementation",
      results: "ISO 27001 certified, zero security incidents",
      image: "from-[#00D084] to-[#1E3A5F]",
      fullDescription: "Financial Services Group required enterprise-grade ICT infrastructure with robust cybersecurity measures. We designed and implemented a comprehensive cloud-based infrastructure with ISO 27001 compliance.",
      details: [
        "Cloud infrastructure setup and migration",
        "Cybersecurity framework implementation",
        "Data encryption and backup systems",
        "Disaster recovery planning",
        "ISO 27001 compliance certification"
      ],
      timeline: "6 months",
      budget: "Confidential",
      team: "16 engineers, 2 project managers",
    },
  ];

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1E3A5F] mb-4">Project Not Found</h1>
          <Link href="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#00D084] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#00B870] transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Portfolio
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`bg-gradient-to-r ${project.image} text-white py-20`}
      >
        <div className="container mx-auto px-4">
          <Link href="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              className="mb-6 flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Portfolio
            </motion.button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-100 font-semibold mb-3">{project.category}</p>
            <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-100 max-w-2xl">
              {project.description}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Project Details */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-sm font-semibold text-gray-500 mb-2">CLIENT</h3>
              <p className="text-2xl font-bold text-[#1E3A5F]">{project.client}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-sm font-semibold text-gray-500 mb-2">TIMELINE</h3>
              <p className="text-2xl font-bold text-[#00D084]">{project.timeline}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-sm font-semibold text-gray-500 mb-2">TEAM SIZE</h3>
              <p className="text-2xl font-bold text-[#FF6B35]">{project.team}</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-[#1E3A5F] mb-6">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                {project.fullDescription}
              </p>

              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-4">Key Features</h3>
              <div className="space-y-3">
                {project.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={20} className="text-[#00D084] mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-[#1E3A5F] mb-6">Results & Impact</h3>
              <div className="bg-gradient-to-br from-[#00D084] to-[#0FA55F] text-white p-8 rounded-lg mb-6">
                <p className="text-lg font-semibold mb-2">Measurable Outcomes</p>
                <p className="text-3xl font-bold">{project.results}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">CATEGORY</p>
                  <p className="text-lg font-semibold text-[#1E3A5F]">{project.category}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 mb-2">BUDGET</p>
                  <p className="text-lg font-semibold text-[#1E3A5F]">{project.budget}</p>
                </div>
              </div>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-8 bg-[#00D084] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#00B870] transition-colors"
                >
                  Request Similar Project
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-r from-[#1E3A5F] to-[#0FA55F] text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold mb-6"
          >
            Ready for Your Next Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-100 max-w-2xl mx-auto mb-8"
          >
            Let's discuss how Solutions Gen can help you achieve similar results for your organization.
          </motion.p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#1E3A5F] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get in Touch
              </motion.button>
            </Link>
            <Link href="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1E3A5F] transition-colors"
              >
                View More Projects
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
