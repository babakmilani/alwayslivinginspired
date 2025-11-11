// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import Cookies from './pages/Cookies.jsx';
import Disclaimer from './pages/Disclaimer.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Contact from './pages/Contact.jsx';
import FashionBlog from './pages/FashionBlog.jsx';
import BlogArticle from './pages/BlogArticle.jsx';
import useAnalyticsPageViews from "./hooks/useAnalyticsPageViews";  // ✅ Import GA hook

function App() {
  // ✅ Call the hook here so it runs whenever the route changes
  useAnalyticsPageViews();

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/fashion-blog" element={<FashionBlog />} />
          <Route path="/blogs/:filename" element={<BlogArticle />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
