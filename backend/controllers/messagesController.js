const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ ideaId: req.params.ideaId })
      .sort({ createdAt: 1 })
      .populate('sender', 'name email');
    res.json(messages);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};