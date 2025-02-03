import { motion } from "framer-motion";

const CosmicBackground = () => {
  const gridSize = 50; // pixels between grid lines
  const stars = Array.from({ length: 50 }); // Number of stars

  // Grid pattern for background
  const gridBackground = {
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(45deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    `,
    backgroundSize: `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px, ${
      gridSize * 2
    }px ${gridSize * 2}px`,
  };

  // Star animation variants
  const starVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: (i) => ({
      opacity: [0.2, 0.8, 0.2],
      y: 100,
      transition: {
        duration: 2 + Math.random() * 5,
        repeat: Infinity,
        delay: i * 0.1,
      },
    }),
  };

  return (
    <div
      className="fixed -z-50 inset-0 bg-black overflow-hidden"
      style={gridBackground}
    >
      {/* Floating Stars */}
      {stars.map((_, i) => {
        const size = Math.random() * 3 + 1;
        return (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full shadow-lg"
            custom={i}
            variants={starVariants}
            initial="hidden"
            animate="visible"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: "0 0 8px rgba(255,255,255,0.5)",
            }}
          />
        );
      })}

      {/* Animated Grid Pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)",
            "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.02) 0%, transparent 60%)",
            "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.02) 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />
    </div>
  );
};

export default CosmicBackground;
