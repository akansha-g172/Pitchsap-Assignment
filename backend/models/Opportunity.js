const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: String,
  description: String,
  matchScore: Number,
  idea: { type: mongoose.Schema.Types.ObjectId, ref: 'Idea' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);