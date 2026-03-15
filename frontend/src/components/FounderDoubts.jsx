import { motion } from 'framer-motion';

const FounderDoubts = () => {
  const doubts = [
    "Not sure if people will use it?",
    "How will I monetize this?",
    "Is the tech even possible?",
  ];

  return (
    <section className="py-20 px-6 lg:px-16 bg-gradient-to-r from-gray-900 via-black to-gray-900">
      <div className="flex flex-col lg:flex-row items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 mb-12 lg:mb-0"
        >
          {doubts.map((doubt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-2xl mb-6 shadow-2xl border border-gray-700 hover:border-pitchsap-purple/50 transition-all duration-300"
            >
              <p className="text-xl text-white font-medium">{doubt}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2"
        >
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-white">Validation Dashboard Preview</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-semibold">Market Fit</span>
                  <span className="text-pitchsap-purple font-bold">85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet h-full rounded-full"
                  ></motion.div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-semibold">Technical Feasibility</span>
                  <span className="text-pitchsap-violet font-bold">92%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '92%' }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                    className="bg-gradient-to-r from-pitchsap-violet to-pitchsap-purple h-full rounded-full"
                  ></motion.div>
                </div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-gray-300 italic text-lg border-l-4 border-pitchsap-purple pl-4"
              >
                "Your idea has strong potential. Consider refining the user acquisition strategy."
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderDoubts;