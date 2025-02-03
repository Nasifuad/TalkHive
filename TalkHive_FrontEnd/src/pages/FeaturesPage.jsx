// FeaturesPage.jsx
import { motion } from "framer-motion";
import { Terminal, Zap, Shield, Network } from "lucide-react";

const FeaturesPage = () => {
  const features = [
    {
      icon: <Terminal size={40} />,
      title: "Terminal Chat",
      description: "Communicate using retro terminal interface",
      color: "text-green-400",
    },
    {
      icon: <Zap size={40} />,
      title: "Instant Messaging",
      description: "Real-time message delivery with <1s latency",
      color: "text-yellow-400",
    },
    {
      icon: <Shield size={40} />,
      title: "End-to-End Encryption",
      description: "Military grade AES-256 encryption",
      color: "text-magenta-400",
    },
    {
      icon: <Network size={40} />,
      title: "P2P Network",
      description: "Decentralized peer-to-peer architecture",
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="relative container mx-auto min-h-screen bg-black text-green-400 font-mono p-8">
      {/* Animated Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-12 text-center border-b border-magenta-400 pb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        FEATURES
      </motion.h1>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className={`p-6 border-2 ${feature.color} bg-black bg-opacity-80 hover:bg-opacity-100 transition-all group relative overflow-hidden`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10 }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p className="text-cyan-300">{feature.description}</p>
            <div className="absolute inset-0 border-2 border-current opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full">
          <pattern
            id="smallGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(0,255,0,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>
    </div>
  );
};

export default FeaturesPage;
