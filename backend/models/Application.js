const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  opportunity: { type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' },
  idea: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
