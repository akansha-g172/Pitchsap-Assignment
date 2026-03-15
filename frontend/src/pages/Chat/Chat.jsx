import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import axios from 'axios';

const Chat = () => {
  const { user, token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [ideas, setIdeas] = useState([]);
  const [typing, setTyping] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [mobileIdeasOpen, setMobileIdeasOpen] = useState(false);
  const socketRef = useRef();
  const messagesEndRef = useRef();

  useEffect(() => {
    const t = token || localStorage.getItem('token');
    if (!t) return;
    socketRef.current = io('http://localhost:5000', { auth: { token: t } });

    socketRef.current.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on('typing', (data) => {
      setTyping(data.isTyping);
    });

    return () => socketRef.current?.disconnect();
  }, [token]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/ideas/my');
        setIdeas(res.data);
      } catch (err) {
        console.error('Error fetching ideas:', err);
        setIdeas([]);
      }
    };
    fetchIdeas();
  }, []);

  useEffect(() => {
    if (!selectedIdea) {
      setMessages([]);
      return;
    }
    socketRef.current?.emit('joinRoom', selectedIdea._id);

    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const res = await axios.get(`http://localhost:5000/messages/${selectedIdea._id}`);
        setMessages(res.data || []);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, [selectedIdea]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isOwnMessage = (msg) => {
    const senderId = msg.sender?._id?.toString?.() ?? msg.sender;
    const userEmail = msg.sender?.email ?? msg.sender;
    return senderId === user?._id || userEmail === user?.email;
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedIdea || !socketRef.current) return;
    const text = newMessage.trim();
    setNewMessage('');
    socketRef.current.emit('sendMessage', { ideaId: selectedIdea._id, text });
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    socketRef.current?.emit('typing', { ideaId: selectedIdea?._id, isTyping: e.target.value.length > 0 });
  };

  return (
    <div className="min-h-screen bg-pitchsap-dark text-white flex min-w-0">
      <Sidebar />
      <div className="flex-1 flex min-w-0 pt-14 lg:pt-0 pl-14 lg:pl-0">
        {/* Left Panel: Idea Chat List — desktop */}
        <div className="hidden md:block w-72 lg:w-80 shrink-0 bg-gradient-to-b from-gray-900 to-black p-4 lg:p-6 border-r border-gray-800 overflow-y-auto">
          <h3 className="text-lg lg:text-xl font-bold mb-4 lg:mb-6 text-white">Idea Chats</h3>
          <div className="space-y-2 lg:space-y-3">
            {ideas.map((idea) => (
              <button
                key={idea._id}
                type="button"
                onClick={() => setSelectedIdea(idea)}
                className={`w-full text-left p-3 lg:p-4 rounded-lg transition-all duration-200 ${
                  selectedIdea?._id === idea._id
                    ? 'bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <h4 className="font-semibold text-white truncate">{idea.title}</h4>
                <p className="text-sm text-gray-400 capitalize">{idea.status}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: idea picker button / drawer */}
        <div className="md:hidden fixed top-14 left-14 right-4 z-20 flex gap-2">
          <button
            type="button"
            onClick={() => setMobileIdeasOpen((o) => !o)}
            className="flex-1 py-2.5 px-4 rounded-lg bg-gray-800 border border-gray-700 text-left text-sm font-medium text-white truncate"
          >
            {selectedIdea ? selectedIdea.title : 'Select an idea'}
          </button>
        </div>
        <AnimatePresence>
          {mobileIdeasOpen && (
            <>
              <div className="md:hidden fixed inset-0 bg-black/60 z-30" onClick={() => setMobileIdeasOpen(false)} aria-hidden="true" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-900 border-t border-gray-800 rounded-t-2xl p-4 max-h-[60vh] overflow-y-auto"
              >
                <h3 className="text-lg font-bold mb-3 text-white">Idea Chats</h3>
                <div className="space-y-2">
                  {ideas.map((idea) => (
                    <button
                      key={idea._id}
                      type="button"
                      onClick={() => { setSelectedIdea(idea); setMobileIdeasOpen(false); }}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        selectedIdea?._id === idea._id ? 'bg-pitchsap-purple/30 border border-pitchsap-purple' : 'bg-gray-800 hover:bg-gray-700'
                      }`}
                    >
                      <h4 className="font-semibold text-white">{idea.title}</h4>
                      <p className="text-sm text-gray-400 capitalize">{idea.status}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Center Panel: Chat Conversation */}
        <div className="flex-1 flex flex-col min-w-0 pt-12 md:pt-0">
          {selectedIdea ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900 to-black px-4 py-4 sm:p-6 border-b border-gray-800 shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-2xl font-bold text-white truncate">{selectedIdea.title}</h2>
                    <span className="inline-block mt-1 bg-pitchsap-purple text-white px-2.5 py-0.5 rounded-full text-xs capitalize">
                      {selectedIdea.status}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <div className="w-8 h-8 bg-pitchsap-purple rounded-full" />
                    <div className="w-8 h-8 bg-pitchsap-violet rounded-full" />
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-contain">
                {loadingMessages ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-2 border-pitchsap-purple border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  messages.map((msg, index) => (
                  <motion.div
                    key={msg._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isOwnMessage(msg) ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        isOwnMessage(msg)
                          ? 'bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white'
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                  ))
                )}
                {typing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 text-white px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="bg-gray-900 px-4 py-4 sm:p-6 border-t border-gray-800 shrink-0">
                <div className="flex gap-2 sm:gap-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={handleTyping}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 min-w-0 bg-gray-800 text-white px-4 py-3 rounded-xl sm:rounded-full focus:outline-none focus:ring-2 focus:ring-pitchsap-purple"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={sendMessage}
                    className="shrink-0 bg-gradient-to-r from-pitchsap-purple to-pitchsap-violet text-white p-3 rounded-xl sm:rounded-full hover:opacity-90 transition-opacity"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 text-xl">Select an idea to start chatting</p>
            </div>
          )}
        </div>

        {/* Right Panel: Milestones and Resources — hidden on smaller screens */}
        {selectedIdea && (
          <div className="hidden xl:block w-72 xl:w-80 shrink-0 bg-gradient-to-b from-gray-900 to-black p-4 xl:p-6 border-l border-gray-800 overflow-y-auto">
            <h3 className="text-xl font-bold mb-6 text-white">Milestones</h3>
            <div className="space-y-4 mb-8">
              {[
                { title: 'Concept Definition', completed: true },
                { title: 'Market Validation', completed: true },
                { title: 'MVP Architecture', completed: false },
              ].map((milestone, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                  <span className={`text-sm ${milestone.completed ? 'text-white' : 'text-gray-400'}`}>
                    {milestone.title}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-6 text-white">Shared Resources</h3>
            <div className="space-y-3">
              {[
                { name: 'Market Research.pdf', type: 'pdf' },
                { name: 'Competitor Analysis.xlsx', type: 'xlsx' },
                { name: 'Wireframes.fig', type: 'fig' },
              ].map((file, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-pitchsap-purple rounded flex items-center justify-center text-white text-xs">
                    {file.type.toUpperCase()}
                  </div>
                  <span className="text-sm text-white">{file.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;