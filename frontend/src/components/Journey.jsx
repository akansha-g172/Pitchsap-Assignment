import { motion } from 'framer-motion';

const Journey = () => {
  const steps = [
    { title: "Submit Idea", description: "Share your startup concept with our platform.", icon: "🚀" },
    { title: "Get Feedback", description: "Receive expert insights and validation.", icon: "💡" },
    { title: "Track Progress", description: "Monitor your idea's validation journey.", icon: "📊" },
    { title: "Discover Opportunities", description: "Find investors and partners.", icon: "🎯" },
  ];

  return (
    <section className="py-20 px-6 lg:px-16 bg-gradient-to-b from-gray-900 to-black">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl lg:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent"
      >
        The Pitchsap Journey
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.05 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-pitchsap-purple/50 transition-all duration-500 group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
            <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
            <p className="text-gray-300 leading-relaxed">{step.description}</p>
            <div className="mt-4 w-full h-1 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Journey;