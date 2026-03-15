import { motion } from 'framer-motion';

const OpportunityCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-pitchsap-purple via-pitchsap-violet to-pitchsap-purple p-6 rounded-2xl shadow-2xl border border-gray-700"
    >
      <h3 className="text-xl font-bold mb-2 text-white">SeedFund Accelerator 2024 – 94% Match</h3>
      <p className="text-gray-200 mb-4 text-sm">Perfect opportunity for your idea! Connect with top investors and mentors.</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-pitchsap-purple px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-pitchsap-purple/50 transition-all duration-300"
      >
        Apply with 1-Click
      </motion.button>
    </motion.div>
  );
};

export default OpportunityCard;