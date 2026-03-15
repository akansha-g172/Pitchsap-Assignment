import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IdeaCard = memo(function IdeaCard({ idea }) {
  const navigate = useNavigate();
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-500';
      case 'analysis': return 'bg-yellow-500';
      case 'reviewing': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-xl border border-gray-700 hover:border-pitchsap-purple/50 transition-all duration-200"
    >
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${getStatusColor(idea.status)}`}>
          {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
        </span>
        <span className="text-gray-400 text-xs sm:text-sm">Tech Startup</span>
      </div>
      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-white line-clamp-2">{idea.title}</h3>
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
            />
            <motion.path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray={`${(idea.validationScore || 0) / 100 * 100}, 100`}
              initial={{ strokeDasharray: '0, 100' }}
              animate={{ strokeDasharray: `${(idea.validationScore || 0) / 100 * 100}, 100` }}
              transition={{ duration: 1.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-white">{idea.validationScore || 0}%</span>
          </div>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/idea/${idea._id}`); }}
        className="w-full bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Open Details
      </motion.button>
    </motion.div>
  );
});

export default IdeaCard;