import { motion } from 'framer-motion';

const FeedbackCards = () => {
  const feedbacks = [
    { name: 'John Doe', feedback: '"Great potential, focus on scalability."', avatar: '👨‍💼' },
    { name: 'Jane Smith', feedback: '"Market timing looks good."', avatar: '👩‍💻' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-white">Mentor Feedback</h3>
      {feedbacks.map((fb, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl shadow-2xl border border-gray-700 hover:border-pitchsap-purple/50 transition-all duration-300"
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet rounded-full flex items-center justify-center text-lg mr-3">
              {fb.avatar}
            </div>
            <span className="font-semibold text-white">{fb.name}</span>
          </div>
          <p className="text-gray-300 italic text-sm leading-relaxed">{fb.feedback}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default FeedbackCards;