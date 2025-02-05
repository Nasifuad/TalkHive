import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import useUserStore from "../store/user.store";

const RetroChatHomePage = () => {
  const title = "Welcome to TalkHive".split(" ");

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
  };

  const dotVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 0.3, scale: 1 },
  };
  const { authUser } = useUserStore();

  return (
    <>
      <div className="relative container mx-auto h-screen bg-black text-cyan-400 font-mono overflow-hidden">
        {/* Animated Scanlines Overlay */}
        <motion.div
          className="absolute inset-0 bg-repeat opacity-10 z-40 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='4' height='4' viewBox='0 0 4 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='%2300FF00'/%3E%3C/svg%3E")`,
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center h-full pt-20 px-4">
          <motion.div
            className="text-center mb-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {title.map((word, wordIndex) => (
              <div key={wordIndex} className="overflow-hidden inline-block">
                <motion.span
                  className="text-4xl md:text-6xl font-bold block md:inline-block md:mr-4 text-green-400"
                  variants={{
                    hidden: { y: 50, opacity: 0 },
                    visible: { y: 0, opacity: 1 },
                  }}
                >
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className="inline-block"
                      whileHover={{
                        y: [-2, 2, -2],
                        transition: { duration: 0.3 },
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </div>
            ))}
          </motion.div>

          <motion.p
            className="text-lg md:text-2xl text-center max-w-xl mb-8 text-cyan-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-magenta-400 animate-pulse">$</span> Connect
            with friends in a retro, pixel-perfect world.
          </motion.p>

          <motion.button
            className="px-8 py-4 border-2 border-green-400 hover:border-yellow-400 bg-black bg-opacity-80 text-blue-400 hover:text-black hover:bg-emerald-400 rounded-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <NavLink
              className="relative z-10"
              to={authUser ? "chat-room" : "login"}
            >
              START SESSION
            </NavLink>
            <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 transition-opacity" />
          </motion.button>
        </div>

        {/* Animated Grid Background */}
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
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
                stroke="rgba(0, 255, 0, 0.1)"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Animated Connection Points */}
          {Array.from({ length: 200 }, (_, i) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            return (
              <motion.circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r="1.5"
                fill="rgba(0, 255, 0, 0.3)"
                variants={dotVariants}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: Math.random() * 2,
                }}
              />
            );
          })}
        </motion.svg>

        {/* CRT Screen Effect */}
        <div className="absolute inset-0 pointer-events-none z-50 crt-effect" />
      </div>
    </>
  );
};

export default RetroChatHomePage;
