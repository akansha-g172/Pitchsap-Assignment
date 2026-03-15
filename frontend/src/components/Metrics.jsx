import { motion } from 'framer-motion';

const Metrics = () => {
  const metrics = [
    { number: "12k+", label: "Ideas Validated", color: "from-pitchsap-purple to-pitchsap-violet" },
    { number: "450+", label: "Consultants", color: "from-pitchsap-violet to-pitchsap-purple" },
    { number: "$85M", label: "Investor Capital", color: "from-green-400 to-blue-500" },
    { number: "2.4k", label: "Successful Matches", color: "from-yellow-400 to-orange-500" },
  ];

  return (
    <section className="py-16 px-6 lg:px-16 bg-gradient-to-r from-black via-gray-900 to-black">
      <div className="flex flex-wrap justify-around text-center max-w-6xl mx-auto">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="mb-8 lg:mb-0 p-6 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl border border-gray-700 hover:border-pitchsap-purple/50 transition-all duration-300"
          >
            <motion.h3
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
              className={`text-4xl lg:text-5xl font-extrabold mb-2 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
            >
              {metric.number}
            </motion.h3>
            <p className="text-gray-300 text-lg font-semibold">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Metrics;