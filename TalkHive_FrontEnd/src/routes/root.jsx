import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import RetroChatHomePage from "../pages/RetroChatHomePage";
import AboutPage from "../pages/AboutPage";
import FeaturesPage from "../pages/FeaturesPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignupPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<RetroChatHomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="features" element={<FeaturesPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export { router };
