import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/Sidebar';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-pitchsap-dark text-white flex min-w-0">
      <Sidebar />
      <main className="flex-1 min-w-0 p-4 pt-14 sm:p-6 sm:pt-6 lg:pt-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 sm:mb-8 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet bg-clip-text text-transparent"
        >
          Profile
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl border border-gray-700 p-6 sm:p-8 max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet flex items-center justify-center text-2xl font-bold text-white mb-6">
            {(user?.name || user?.email || 'I').charAt(0).toUpperCase()}
          </div>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-gray-400">Name</dt>
              <dd className="text-white font-medium">{user?.name || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-400">Email</dt>
              <dd className="text-white font-medium">{user?.email || '—'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-400">Role</dt>
              <dd className="text-white font-medium capitalize">{user?.role || 'ideator'}</dd>
            </div>
          </dl>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
