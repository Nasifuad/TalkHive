import { Outlet } from "react-router-dom";
import CosmicBackground from "../backGrounds/CosmicBackground";
import Navbar from "../components/Navbar";
import Footer from "../pages/Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div className="scroll-smooth overflow-hidden">
      <CosmicBackground />
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
