import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50 border-b border-gray-800 safe-area-inset-top"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-3 sm:py-4 flex justify-between items-center">
        <Link to="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent">
          Pitchsap
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
          <Link to="/auth" className="bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-gray-800 bg-black/95 backdrop-blur-md"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              <Link to="/" onClick={() => setMenuOpen(false)} className="py-3 text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/auth" onClick={() => setMenuOpen(false)} className="py-3 text-center bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white rounded-xl font-semibold">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
