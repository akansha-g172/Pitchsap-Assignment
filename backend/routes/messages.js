const express = require('express');
const router = express.Router();
const { getMessages } = require('../controllers/messagesController');
const auth = require('../middleware/auth');

router.get('/:ideaId', auth, getMessages);

module.exports = router;