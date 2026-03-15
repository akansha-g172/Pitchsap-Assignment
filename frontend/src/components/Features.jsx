import { motion } from 'framer-motion';

const Features = () => {
  return (
    <section className="py-20 px-6 lg:px-16 bg-gradient-to-b from-black to-gray-900">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl lg:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent"
      >
        Everything you need to launch.
      </motion.h2>
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-2/3"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-pitchsap-purple/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Insight Feed Preview</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Real-time insights from experts and market data to guide your validation process. Stay ahead with cutting-edge analysis and trends.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <p className="text-white font-semibold">AI-Powered Insights</p>
                <p className="text-gray-400 text-sm">Updated every 5 minutes</p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/3"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 hover:border-pitchsap-violet/50 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 text-white">Direct Expert Chat</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Connect instantly with industry experts for personalized advice and mentorship.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pitchsap-violet to-pitchsap-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold">💬</span>
              </div>
              <div>
                <p className="text-white font-semibold">24/7 Expert Support</p>
                <p className="text-gray-400 text-sm">Average response: 2 min</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;