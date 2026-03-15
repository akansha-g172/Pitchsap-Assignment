import { motion } from 'framer-motion';

const ActivityFeed = () => {
  const activities = [
    { time: '2 hours ago', action: 'Idea submitted for review', icon: '📝' },
    { time: '1 day ago', action: 'Feedback received from expert', icon: '💬' },
    { time: '3 days ago', action: 'Validation score updated', icon: '📊' },
    { time: '1 week ago', action: 'Market analysis completed', icon: '🔍' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-700"
    >
      <h3 className="text-2xl font-bold mb-6 text-white">Activity Feed</h3>
      <div className="space-y-6">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet rounded-full flex items-center justify-center text-lg">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityFeed;