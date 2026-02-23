import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Instagram, MapPin } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Menu', path: '/#menu' },
    { name: 'Admin', path: '/admin' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F8F5F2]/80 backdrop-blur-md border-b border-[#E5E0DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-serif font-bold text-[#4A3B32] tracking-wider">
            MOZZO<span className="text-[#C8A97E]">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-[#4A3B32] hover:text-[#C8A97E] transition-colors font-medium cursor-pointer`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#4A3B32] focus:outline-none cursor-pointer">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#F8F5F2] border-b border-[#E5E0DC] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col items-center">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-[#4A3B32] text-lg font-medium hover:text-[#C8A97E] cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#2E211A] text-[#F8F5F2] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-4">MOZZO CAFE</h3>
          <p className="text-[#C8A97E] mb-4">Biratnagar, Nepal</p>
          <p className="text-sm opacity-80 leading-relaxed">
            A cozy space for coffee lovers, foodies, and dreamers. Come for the coffee, stay for the vibe (and Simba!).
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 text-[#C8A97E]">Opening Hours</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Mon - Fri: 8:00 AM - 9:00 PM</li>
            <li>Sat - Sun: 9:00 AM - 10:00 PM</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 text-[#C8A97E]">Contact</h4>
          <div className="flex items-center space-x-2 mb-2 text-sm opacity-80">
            <MapPin size={18} />
            <span>Biratnagar Market Area</span>
          </div>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.instagram.com/mozzocafe" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8A97E] transition-colors cursor-pointer">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-[#4A3B32] text-center text-sm opacity-50">
        &copy; {new Date().getFullYear()} Mozzo Cafe. All rights reserved.
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5F2] font-sans text-[#333333]">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
