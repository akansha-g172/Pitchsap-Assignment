import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 bg-gradient-to-r from-pitchsap-dark via-black to-pitchsap-dark">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-pitchsap-purple via-pitchsap-violet to-pitchsap-purple rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-16 text-center shadow-2xl border border-gray-700 max-w-4xl mx-auto relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-6 sm:mb-8 text-white">
            Ready to build the future?
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/auth')}
            className="bg-white text-pitchsap-purple px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg lg:text-xl shadow-xl hover:shadow-pitchsap-purple/50 transition-shadow"
          >
            Start Your Idea Journey
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;