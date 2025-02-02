import { motion } from "framer-motion";
import { useState } from "react";
import { Menu } from "lucide-react";

const RetroChatHomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative container mx-auto h-screen bg-black text-blue-300 font-mono">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between p-4 border-b border-yellow-400 bg-black bg-opacity-80 fixed top-0 z-50">
        <h1 className="text-2xl font-bold tracking-widest">RetroChat</h1>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          <Menu size={24} />
        </button>
        <ul
          className={`md:flex gap-6 ${
            menuOpen ? "block" : "hidden"
          } md:block text-lg`}
        >
          <li className="hover:text-green-200 cursor-pointer">Home</li>
          <li className="hover:text-green-200 cursor-pointer">Features</li>
          <li className="hover:text-green-200 cursor-pointer">About</li>
          <li className="hover:text-green-200 cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-full pt-20">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to RetroChat
        </motion.h2>
        <motion.p
          className="text-lg md:text-2xl text-center max-w-xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Connect with friends in a retro, pixel-perfect world.
        </motion.p>
        <motion.button
          className="px-6 py-3 border border-green-400 hover:bg-green-400 hover:text-black transition rounded-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Background Gridlines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0, 255, 0, 0.2)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Highlighted connection points */}
        {Array.from(
          {
            length:
              Math.ceil(window.innerWidth / 40) *
              Math.ceil(window.innerHeight / 40),
          },
          (_, i) => {
            const x = (i % Math.ceil(window.innerWidth / 40)) * 40;
            const y = Math.floor(i / Math.ceil(window.innerWidth / 40)) * 40;
            return (
              <circle key={i} cx={x} cy={y} r="2" fill="rgba(0, 255, 0, 0.5)" />
            );
          }
        )}
      </svg>
    </div>
  );
};

export default RetroChatHomePage;
