import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import { motion } from 'framer-motion';

const IdeaValidation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ideas/${id}`);
        setIdea(res.data);
      } catch (err) {
        console.error('Error fetching idea:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchIdea();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-pitchsap-dark text-white flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-pitchsap-purple border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen bg-pitchsap-dark text-white flex items-center justify-center">
        <p className="text-gray-400">Idea not found.</p>
      </div>
    );
  }

  const score = idea.validationScore ?? 0;
  const statusClass = {
    draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    analysis: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    reviewing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    validated: 'bg-green-500/20 text-green-400 border-green-500/30',
  }[idea.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';

  return (
    <div className="min-h-screen bg-pitchsap-dark text-white flex min-w-0">
      <Sidebar />
      <main className="flex-1 min-w-0 p-4 pt-14 sm:p-6 sm:pt-6 lg:pt-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-gray-400 hover:text-white mb-4 sm:mb-6 flex items-center gap-2 transition-colors text-sm sm:text-base"
          >
            ← Back to Dashboard
          </button>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent">
              {idea.title}
            </h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusClass}`}>
              {idea.status}
            </span>
          </div>

          {/* AI Validation Score */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl border border-gray-700 p-8 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-300 mb-4">AI Validation Score</h2>
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <motion.path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="2"
                    strokeDasharray={`${score}, 100`}
                    initial={{ strokeDasharray: '0, 100' }}
                    animate={{ strokeDasharray: `${score}, 100` }}
                    transition={{ duration: 1.2 }}
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{score}%</span>
                </div>
              </div>
              <p className="text-gray-400 flex-1">
                Your idea has been scored by our AI. Chat with experts for detailed feedback and apply to matched opportunities.
              </p>
            </div>
          </motion.section>

          {/* Idea details */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 mb-8"
          >
            {idea.pitch && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">One-line pitch</h3>
                <p className="text-white">{idea.pitch}</p>
              </div>
            )}
            {idea.problem && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Problem</h3>
                <p className="text-white">{idea.problem}</p>
              </div>
            )}
            {idea.targetUsers && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Target users</h3>
                <p className="text-white">{idea.targetUsers}</p>
              </div>
            )}
            {idea.solution && (
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Solution</h3>
                <p className="text-white">{idea.solution}</p>
              </div>
            )}
          </motion.section>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => navigate('/dashboard/chat')}
              className="px-6 py-3 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              Chat with Experts
            </button>
            <button
              onClick={() => navigate('/dashboard/opportunities')}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors"
            >
              View Opportunities
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default IdeaValidation;
