const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  title: String,
  pitch: String,
  problem: String,
  targetUsers: String,
  solution: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'draft' },
  validationScore: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Idea', ideaSchema);