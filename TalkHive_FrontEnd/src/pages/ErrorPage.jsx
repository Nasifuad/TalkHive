import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const errorCode = "404";
  const glitchVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, -2, 2, -3, 3, 0],
      y: [0, -1, 1, -2, 2, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror",
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-black text-green-400 font-mono p-8 overflow-hidden">
      {/* CRT Scanlines Overlay */}
      <div className="absolute inset-0 crt-effect z-40 pointer-events-none" />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full">
          <pattern
            id="smallGrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0,255,0,0.1)"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        {/* Glitchy Error Code */}
        <motion.div
          className="relative text-[20rem] font-bold text-magenta-400"
          variants={glitchVariants}
          initial="initial"
          animate="animate"
        >
          {errorCode}
          <div className="absolute inset-0 text-green-400 blur-sm opacity-50">
            {errorCode}
          </div>
          <div
            className="absolute inset-0 text-cyan-400 blur-sm opacity-50"
            style={{ left: "2px" }}
          >
            {errorCode}
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          className="text-2xl text-center mb-8 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <AlertTriangle
            className="inline-block mr-2 text-yellow-400"
            size={32}
          />
          <span className="border-b border-magenta-400">
            SYSTEM MALFUNCTION DETECTED
          </span>
        </motion.div>

        {/* Animated Graphic */}
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 24 24"
          className="mb-8 text-red-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
          />
        </motion.svg>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 border-2 border-green-400 hover:border-yellow-400 text-green-400 hover:text-yellow-400 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="text-yellow-400" size={20} />
              REINITIALIZE CONNECTION
            </span>
            <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
        </motion.div>

        {/* Floating Error Nodes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
      </div>

      {/* Terminal Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-green-400 p-2 text-sm bg-black bg-opacity-80">
        <div className="flex items-center gap-4">
          <span className="text-yellow-400">STATUS:</span>
          <span className="text-red-400 animate-pulse">CRITICAL_ERROR</span>
          <span className="text-cyan-400 ml-auto">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
