import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import IdeaCard from '../../components/IdeaCard';
import ActivityFeed from '../../components/ActivityFeed';
import FeedbackCards from '../../components/FeedbackCards';
import OpportunityCard from '../../components/OpportunityCard';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { logout } = useAuth();
  const [ideas, setIdeas] = useState([]);

  const fetchIdeas = async () => {
    try {
      const res = await axios.get('http://localhost:5000/ideas/my');
      setIdeas(res.data);
    } catch (err) {
      console.error('Error fetching ideas:', err);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div className="min-h-screen bg-pitchsap-dark text-white flex min-w-0">
      <Sidebar onIdeaCreated={fetchIdeas} />
      <main className="flex-1 min-w-0 p-4 pt-14 sm:p-6 sm:pt-6 lg:pt-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent"
        >
          Validation Control Center
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
        >
          {ideas.map((idea, index) => (
            <motion.div
              key={idea._id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: Math.min(index * 0.05, 0.2) }}
            >
              <IdeaCard idea={idea} />
            </motion.div>
          ))}
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <ActivityFeed />
          <div className="space-y-4 sm:space-y-6">
            <FeedbackCards />
            <OpportunityCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;