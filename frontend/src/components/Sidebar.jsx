import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import NewIdeaModal from './NewIdeaModal';

const Sidebar = ({ onIdeaCreated }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'My Ideas', path: '/dashboard/ideas' },
    { name: 'Opportunities', path: '/dashboard/opportunities' },
    { name: 'Chat', path: '/dashboard/chat' },
    { name: 'Profile', path: '/dashboard/profile' },
  ];

  const handleIdeaCreated = () => {
    setIsModalOpen(false);
    if (onIdeaCreated) onIdeaCreated();
  };

  const closeMobile = () => setMobileOpen(false);

  const navContent = (
    <>
      <div className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent">
        Pitchsap
      </div>
      <nav className="space-y-1 mb-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            onClick={closeMobile}
            className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => { setIsModalOpen(true); closeMobile(); }}
        className="w-full bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white py-3 rounded-lg font-semibold shadow-lg hover:opacity-90 transition-opacity mb-4"
      >
        + New Idea
      </motion.button>
      <button
        type="button"
        onClick={() => { logout(); closeMobile(); }}
        className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
      >
        Logout
      </button>
    </>
  );

  return (
    <>
      {/* Mobile: menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 border border-gray-700 transition-colors"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile: backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar: mobile drawer / desktop fixed */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed top-0 left-0 bottom-0 w-64 max-w-[85vw] bg-gradient-to-b from-gray-900 to-black p-6 border-r border-gray-800 shadow-2xl z-50 lg:hidden overflow-y-auto"
          >
            <div className="flex justify-end mb-4">
              <button type="button" onClick={closeMobile} className="p-2 rounded-lg text-gray-400 hover:text-white" aria-label="Close menu">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {navContent}
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {/* Desktop: always-visible sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 bg-gradient-to-b from-gray-900 to-black p-6 border-r border-gray-800 shadow-2xl overflow-y-auto">
        {navContent}
      </aside>

      <NewIdeaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onIdeaCreated={handleIdeaCreated} />
    </>
  );
};

export default Sidebar;
