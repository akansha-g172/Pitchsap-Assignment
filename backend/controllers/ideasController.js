const Idea = require('../models/Idea');

exports.createIdea = async (req, res) => {
  try {
    const idea = new Idea({ ...req.body, user: req.user.id });
    await idea.save();
    res.status(201).json(idea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ user: req.user.id });
    res.json(ideas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json(idea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};