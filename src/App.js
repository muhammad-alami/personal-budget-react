
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import Footer from './Footer/Footer';

export default function App() {
  return (
    <Router>
      <Menu />
      <Hero />

      <div className="mainContainer">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}