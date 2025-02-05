import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LogIn, LogOut, Menu, Terminal, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useUserStore from "../store/user.store";
const Navbar = () => {
  const img =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  const navigate = useNavigate();
  const { authUser, logout } = useUserStore();
  // console.log("Current User", authUser);
  // const [userName] = useState(authUser?.username || "Guest");
  // const [avatar] = useState(authUser?.avatar || img);
  const userName = authUser?.username || "Guest";
  const avatar = authUser?.avatar || img;
  const [menuOpen, setMenuOpen] = useState(false);
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
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="md:container relative w-full mx-auto h-18 ">
      <motion.nav
        className="container flex items-center justify-between p-4 border-b border-magenta-400 bg-black  fixed top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.h1
          className="text-2xl font-Mono  tracking-widest text-green-400 cursor-pointer"
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 10px rgba(0,255,0,0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate("/");
            scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          RetroChat
        </motion.h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex xl:gap-8 gap-2 text-lg">
          {menuItems.map((item, index) => (
            <motion.li
              key={item.label}
              className="hover:text-yellow-400 cursor-pointer relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-yellow-400 mr-2">&gt;</span>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "text-yellow-400" : "text-cyan-300"
                }
              >
                {item.label}
              </NavLink>
              {index < menuItems.length - 1 && (
                <span className="text-magenta-400 ml-2">{"//"}</span>
              )}
            </motion.li>
          ))}
        </ul>
        {/* If any user is logged in then show logout or else show login and signup */}
        {authUser ? (
          <div className="flex items-center gap-2 ml-2">
            <div
              className="flex items-center gap-2"
              onClick={() => navigate("profile")}
            >
              <div className="avatar online">
                <div className="w-12 xl:w-16 rounded-full ">
                  <img src={avatar} className=" cursor-pointer" />
                </div>
              </div>
              <p className="text-cyan-300 text-lg capitalize font-light text-nowrap underline underline-offset-2">
                {userName}
              </p>
            </div>

            <motion.button
              onTap={(e) => handleLogout(e)}
              className="text-red-400 hidden md:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <h1 className="flex items-center gap-2">
                LogOuts
                <LogOut size={24} />
              </h1>
            </motion.button>
          </div>
        ) : (
          <div className=" gap-2 justify-center items-center hidden md:flex">
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? "border-b py-4 border-yellow-400" : "text-cyan-300"
              }
            >
              <motion.button
                className="text-green-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <h1 className="flex items-center gap-2">
                  Login
                  <LogIn size={24} />
                </h1>
              </motion.button>
            </NavLink>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? "border-b py-4 border-yellow-400" : "text-cyan-300"
              }
            >
              <motion.button
                className="text-sky-400"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <h1 className="flex items-center gap-2">
                  SignUp
                  <Terminal size={24} />
                </h1>
              </motion.button>
            </NavLink>
          </div>
        )}

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-green-400"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.ul
              className="md:hidden fixed w-max-content bg-black top-20 right-10 border border-magenta-400 p-4 z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {menuItems.map((item) => (
                <motion.li
                  key={item.label}
                  className="hover:text-yellow-400 cursor-pointer py-2"
                  whileHover={{ x: 10 }}
                >
                  <span className="text-yellow-400 mr-2">■</span>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      isActive ? "text-yellow-400" : "text-cyan-300"
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
              {authUser ? (
                <motion.button
                  className="text-red-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={logout}
                >
                  <h1 className="flex items-center gap-2">
                    LogOut
                    <LogOut size={24} />
                  </h1>
                </motion.button>
              ) : (
                <div className="mt-10 gap-4 justify-center flex flex-col">
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      isActive ? "text-yellow-400" : "text-cyan-300"
                    }
                  >
                    <motion.button
                      className="text-green-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setMenuOpen(false)}
                    >
                      <h1 className="flex items-center gap-2">
                        Login
                        <LogIn size={24} />
                      </h1>
                    </motion.button>
                  </NavLink>
                  <NavLink
                    to="signup"
                    className={({ isActive }) =>
                      isActive ? "text-yellow-400" : "text-cyan-300"
                    }
                  >
                    <motion.button
                      className="text-sky-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setMenuOpen(false)}
                    >
                      <h1 className="flex items-center gap-2">
                        SignUp
                        <Terminal size={24} />
                      </h1>
                    </motion.button>
                  </NavLink>
                </div>
              )}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
