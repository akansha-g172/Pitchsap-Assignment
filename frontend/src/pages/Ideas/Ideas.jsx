import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import IdeaCard from '../../components/IdeaCard';
import { motion } from 'framer-motion';

const Ideas = () => {
  const navigate = useNavigate();
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
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-8 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent"
        >
          My Ideas
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8"
        >
          Submit and track validation for your startup ideas.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/dashboard/idea/${idea._id}`)}
              className="cursor-pointer"
            >
              <IdeaCard idea={idea} />
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Ideas;
