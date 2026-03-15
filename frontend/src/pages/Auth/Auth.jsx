import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'ideator' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signup(form.name, form.email, form.password, form.role);
      } else {
        await login(form.email, form.password);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error('Auth error:', err);
      const errorMessage = err?.response?.data?.message || err?.message || 'Something went wrong';
      alert('Error: ' + errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-pitchsap-dark flex items-center justify-center px-4 py-6 sm:py-8 relative overflow-hidden">
      {/* Animated background elements — subtle on mobile for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-64 sm:w-96 h-64 sm:h-96 bg-pitchsap-purple/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 100 - 192,
            y: mousePosition.y * 100 - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          style={{
            left: '10%',
            top: '10%',
          }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-pitchsap-violet/15 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -80 + 160,
            y: mousePosition.y * -80 + 160,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 25 }}
          style={{
            right: '15%',
            bottom: '15%',
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-pitchsap-purple/10 to-pitchsap-violet/10 rounded-full blur-2xl"
          animate={{
            x: mousePosition.x * 60 - 128,
            y: mousePosition.y * -60 + 128,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 30 }}
          style={{
            left: '60%',
            top: '60%',
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gray-800/90 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md border border-gray-700/50 relative z-10"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-center text-white">
          {isSignup ? 'Sign Up' : 'Log In'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-pitchsap-purple focus:outline-none transition-colors"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">Email</label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-pitchsap-purple focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2 text-white">Password</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-pitchsap-purple focus:outline-none transition-colors"
              required
            />
          </div>
          {isSignup && (
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2 text-white">Role</label>
              <select
                id="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-pitchsap-purple focus:outline-none transition-colors"
              >
                <option value="ideator" className="bg-gray-700 text-white">Ideator</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <p className="text-center mt-5 sm:mt-6 text-gray-300 text-sm sm:text-base">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-pitchsap-purple hover:text-pitchsap-violet ml-2 transition-colors font-medium"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;