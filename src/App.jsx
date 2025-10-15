// src/App.jsx

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
// Import the new legal pages
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import Cookies from './pages/Cookies.jsx';
import Disclaimer from './pages/Disclaimer.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Contact from './pages/Contact.jsx';
import FashionBlog from './pages/FashionBlog.jsx';
import BlogArticle from './pages/BlogArticle.jsx';


function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ⭐️ Products Page Route ⭐️ */}
          <Route path="/products" element={<Products />} />

          {/* ⭐️ Legal Page Routes ⭐️ */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* ⭐️ About Us Route ⭐️ */}
          <Route path="/about" element={<AboutUs />} />

          {/* ⭐️ Contact Route ⭐️ */}
          <Route path="/contact" element={<Contact />} />

          {/* ⭐️ Fashion Blog Index Route ⭐️ */}
          <Route path="/fashion-blog" element={<FashionBlog />} />

          {/* ⭐️ Dynamic Route for Blog Articles ⭐️ */}
          <Route path="/blogs/:filename" element={<BlogArticle />} />

        </Routes>
      </main>
      <Footer />
    </>
  );
}
export default App;