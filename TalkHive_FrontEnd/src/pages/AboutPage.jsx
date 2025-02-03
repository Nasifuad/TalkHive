import { motion } from "framer-motion";
import { Users, Code, Globe, Terminal, Zap } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="relative container mx-auto bg-black text-cyan-400 font-mono p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Section 1: Mission */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            className="flex items-center mb-8 gap-4"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
          >
            <Code size={48} className="text-green-400" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </motion.div>
          <motion.p
            className="text-lg text-cyan-300 border-l-4 border-magenta-400 pl-4 ml-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {`> Reviving the golden era of digital communication with modern security`}
          </motion.p>
        </div>

        {/* Section 2: Team */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="flex items-center mb-8 gap-4">
            <Users size={48} className="text-yellow-400" />
            <h2 className="text-3xl font-bold">The Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {["CyberPunk", "ByteMaster", "CodeWitch"].map((name, index) => (
              <motion.div
                key={name}
                className="border-2 border-green-400 p-6 bg-black bg-opacity-60"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-full h-48 bg-gray-800 mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-magenta-400">{name}</h3>
                <p className="text-cyan-300">Senior Terminal Wizard</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 3: Stats */}
        <motion.div
          className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="p-6 border-2 border-magenta-400">
            <Globe size={40} className="mx-auto mb-4" />
            <div className="text-4xl font-bold">10K+</div>
            <div className="text-cyan-300">Active Nodes</div>
          </div>
          <div className="p-6 border-2 border-yellow-400">
            <Terminal size={40} className="mx-auto mb-4" />
            <div className="text-4xl font-bold">256-bit</div>
            <div className="text-cyan-300">Encryption</div>
          </div>
          <div className="p-6 border-2 border-green-400">
            <Zap size={40} className="mx-auto mb-4" />
            <div className="text-4xl font-bold">0.3s</div>
            <div className="text-cyan-300">Avg. Latency</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
