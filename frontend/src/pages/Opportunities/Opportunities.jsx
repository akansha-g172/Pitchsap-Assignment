import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { motion } from 'framer-motion';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/opportunities');
        setOpportunities(res.data);
      } catch (err) {
        console.error('Error fetching opportunities:', err);
        setOpportunities([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  const handleApply = async (oppId) => {
    setApplyingId(oppId);
    try {
      await axios.post(`http://localhost:5000/opportunities/${oppId}/apply`);
      setOpportunities((prev) =>
        prev.map((o) => (o._id === oppId ? { ...o, applied: true } : o))
      );
    } catch (err) {
      console.error('Apply error:', err);
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-pitchsap-dark text-white flex min-w-0">
      <Sidebar />
      <main className="flex-1 min-w-0 p-4 pt-14 sm:p-6 sm:pt-6 lg:pt-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-8 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent"
        >
          Opportunities
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8"
        >
          Apply to programs and accelerators matched to your validated ideas.
        </motion.p>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-2 border-pitchsap-purple border-t-transparent rounded-full animate-spin" />
          </div>
        ) : opportunities.length === 0 ? (
          <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-12 text-center">
            <p className="text-gray-400">No opportunities yet. Validate an idea to see matches.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
            {opportunities.map((opp, index) => (
              <motion.div
                key={opp._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6 hover:border-pitchsap-purple/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{opp.title}</h3>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-pitchsap-purple/20 text-pitchsap-purple">
                    {opp.matchScore ?? 0}% match
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{opp.description}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleApply(opp._id)}
                  disabled={opp.applied || applyingId === opp._id}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    opp.applied
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white hover:opacity-90'
                  }`}
                >
                  {opp.applied ? 'Applied' : applyingId === opp._id ? 'Applying…' : 'Apply with 1-Click'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Opportunities;
