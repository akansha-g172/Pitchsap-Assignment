const express = require('express');
const router = express.Router();
const { createIdea, getMyIdeas, getIdea } = require('../controllers/ideasController');
const auth = require('../middleware/auth');

router.post('/', auth, createIdea);
router.get('/my', auth, getMyIdeas);
router.get('/:id', auth, getIdea);

module.exports = router;