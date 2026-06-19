// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Home from "./pages/Home.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Success from "./pages/Success.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Terms from "./pages/Terms.jsx";
import Cookies from "./pages/Cookies.jsx";
import Disclaimer from "./pages/Disclaimer.jsx";
import ShippingPolicy from "./pages/ShippingPolicy.jsx";
import Returns from "./pages/Returns.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import FashionBlog from "./pages/FashionBlog.jsx";
import BlogArticle from "./pages/BlogArticle.jsx";
import useAnalyticsPageViews from "./hooks/useAnalyticsPageViews";

function GlobalToast() {
  const { toast } = useCart();
  return toast ? <div className="brand-toast">{toast}</div> : null;
}

function App() {
  useAnalyticsPageViews();

  return (
    <CartProvider>
      <div className="brand-grain" aria-hidden />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:pid" element={<ProductDetail />} />
          <Route path="/success" element={<Success />} />
          <Route path="/fashion-blog" element={<FashionBlog />} />
          <Route path="/blogs/:filename" element={<BlogArticle />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/returns" element={<Returns />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <GlobalToast />
    </CartProvider>
  );
}

export default App;