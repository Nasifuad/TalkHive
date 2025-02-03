// ContactPage.jsx
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="relative min-h-screen bg-black text-green-400 font-mono p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-12 text-center border-b border-magenta-400 pb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CONTACT US
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
          >
            <div className="flex items-center gap-4">
              <Mail size={32} className="text-yellow-400" />
              <div>
                <h3 className="text-xl font-bold">Email</h3>
                <p className="text-cyan-300">support@retrochat.io</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone size={32} className="text-magenta-400" />
              <div>
                <h3 className="text-xl font-bold">Phone</h3>
                <p className="text-cyan-300">+1 555-1987</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin size={32} className="text-green-400" />
              <div>
                <h3 className="text-xl font-bold">HQ Location</h3>
                <p className="text-cyan-300">Cyberpunk City, Digital Zone 42</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            className="space-y-6"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
          >
            <div>
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-black border-2 border-green-400 p-3 focus:border-yellow-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-black border-2 border-green-400 p-3 focus:border-magenta-400 outline-none"
              />
            </div>
            <div>
              <label className="block mb-2">Message</label>
              <textarea
                rows="5"
                className="w-full bg-black border-2 border-green-400 p-3 focus:border-cyan-400 outline-none"
              />
            </div>
            <motion.button
              className="w-full py-3 border-2 border-green-400 hover:border-yellow-400 text-green-400 hover:text-yellow-400 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SEND MESSAGE
            </motion.button>
          </motion.form>
        </div>

        {/* Floating Connection Nodes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
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
    </div>
  );
};

export default ContactPage;
