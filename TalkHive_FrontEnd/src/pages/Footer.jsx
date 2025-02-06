// Footer.jsx
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const menuItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Features",
      href: "features",
    },
    {
      label: "About",
      href: "about",
    },
    {
      label: "Contact",
      href: "contact",
    },
  ];
  return (
    <footer className="relative overflow-x-hidden container mx-auto bg-black border-t-2 border-green-400 text-cyan-300 font-mono">
      <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-3 gap-8 container">
        {/* Logo Section */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <h2 className="text-2xl font-bold text-green-400 mb-4">RetroChat</h2>
          <p className="mb-4">Est. 2025</p>
          <div className="flex gap-4">
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-green-400 hover:text-yellow-400"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-green-400 hover:text-magenta-400"
            >
              <Twitter size={24} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="text-green-400 hover:text-cyan-400"
            >
              <Linkedin size={24} />
            </motion.a>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <h3 className="text-lg font-bold text-magenta-400 mb-2">Explore</h3>
            <ul className="space-y-2">
              {menuItems.map((link) => (
                <li key={link.label} onClick={() => window.scrollTo(0, 0)}>
                  <NavLink to={link.href} className="hover:text-yellow-400">
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-2">
            <h3 className="text-lg font-bold text-yellow-400 mb-2 ">Legal</h3>
            <ul className="space-y-2">
              {["Privacy", "Terms", "Security", "Cookies"].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-magenta-400">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          className="space-y-4 flex flex-col"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-cyan-400">Stay Updated</h3>
          <div className="flex gap-2 flex-wrap">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-black border-2 border-green-400 p-2 outline-none"
            />
            <motion.button
              className="px-4 py-2 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-green-400 mt-8">
        <div className="max-w-6xl mx-auto p-4 text-center text-sm">
          <motion.div
            className="marquee-container overflow-hidden"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
            <span className="inline-block whitespace-nowrap pr-4">
              {Array(10).fill("🚀 Developed by Nasif Fuad ").join(" • ")}
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
