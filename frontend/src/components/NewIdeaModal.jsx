import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const NewIdeaModal = ({ isOpen, onClose, onIdeaCreated }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    pitch: '',
    problem: '',
    targetUsers: '',
    solution: '',
  });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/ideas', form);
      setForm({
        title: '',
        pitch: '',
        problem: '',
        targetUsers: '',
        solution: '',
      });
      setStep(1);
      onClose();
      if (onIdeaCreated) onIdeaCreated();
    } catch (err) {
      console.error('Error creating idea:', err);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Create New Idea</h2>

              {step === 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Idea Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pitchsap-purple mb-4"
                    placeholder="Enter your idea title"
                  />
                  <label className="block text-sm font-medium text-gray-300 mb-2">One-line Pitch</label>
                  <textarea
                    value={form.pitch}
                    onChange={(e) => setForm({ ...form, pitch: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pitchsap-purple h-24 resize-none"
                    placeholder="Describe your idea in one sentence"
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Problem</label>
                  <textarea
                    value={form.problem}
                    onChange={(e) => setForm({ ...form, problem: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pitchsap-purple h-32 resize-none mb-4"
                    placeholder="What problem are you solving?"
                  />
                  <label className="block text-sm font-medium text-gray-300 mb-2">Target Users</label>
                  <input
                    type="text"
                    value={form.targetUsers}
                    onChange={(e) => setForm({ ...form, targetUsers: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pitchsap-purple"
                    placeholder="Who is your target audience?"
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Solution</label>
                  <textarea
                    value={form.solution}
                    onChange={(e) => setForm({ ...form, solution: e.target.value })}
                    className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pitchsap-purple h-32 resize-none"
                    placeholder="How do you solve this problem?"
                  />
                </div>
              )}

              {step === 4 && (
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-4">Ready to Submit?</h3>
                  <p className="text-gray-300 mb-6">Your idea will be reviewed by our experts.</p>
                  <div className="bg-gray-700 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold text-white">{form.title}</h4>
                    <p className="text-sm text-gray-400">{form.pitch}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white rounded-lg hover:opacity-90 transition-opacity ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:opacity-90 transition-opacity ml-auto"
                  >
                    Submit Idea
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewIdeaModal;