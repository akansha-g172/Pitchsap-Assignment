const Opportunity = require('../models/Opportunity');
const Application = require('../models/Application');

exports.getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find().lean();
    const applied = await Application.find({ user: req.user.id }).select('opportunity');
    const appliedSet = new Set(applied.map((a) => a.opportunity.toString()));
    const list = opportunities.map((o) => ({
      ...o,
      applied: appliedSet.has(o._id.toString())
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.applyToOpportunity = async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) return res.status(404).json({ message: 'Opportunity not found' });
    const existing = await Application.findOne({ user: req.user.id, opportunity: opp._id });
    if (existing) return res.json({ message: 'Already applied', opportunity: opp });
    await Application.create({ user: req.user.id, opportunity: opp._id });
    res.json({ message: 'Application submitted', opportunity: opp });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
