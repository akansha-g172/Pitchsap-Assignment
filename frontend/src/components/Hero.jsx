import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-20 sm:py-24 lg:py-24 bg-gradient-to-br from-pitchsap-dark via-gray-900 to-black overflow-hidden min-h-screen pt-24 sm:pt-28">
      <div className="absolute inset-0 bg-gradient-to-r from-pitchsap-purple/5 to-pitchsap-violet/5" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 mb-8 lg:mb-0 relative z-10 w-full"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight bg-gradient-to-r from-white via-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent">
          Have a startup idea? <br />
          <span className="text-pitchsap-purple">Validate it before you build.</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-xl">
          Leverage AI-powered validation and expert feedback to turn your concept into a market-ready product.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-pitchsap-purple/50 transition-all duration-200"
          >
            Start Validating
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:w-1/2 w-full grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 relative z-10 mt-4 lg:mt-0"
      >
        {[
          { title: 'Market Fit Score', value: '87/100', color: 'text-pitchsap-purple', icon: '📊' },
          { title: 'User Persona', value: 'Tech-savvy millennials', color: 'text-white', icon: '👥' },
          { title: 'Growth Score', value: '92/100', color: 'text-pitchsap-violet', icon: '📈' },
          { title: 'Validation Status', value: 'In Progress', color: 'text-green-400', icon: '✅' },
        ].map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-700/50 hover:border-pitchsap-purple/50 transition-all duration-200"
          >
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{card.icon}</div>
            <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-2 text-gray-300">{card.title}</h3>
            <p className={`text-lg sm:text-xl md:text-2xl font-extrabold truncate ${card.color}`}>{card.value}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;