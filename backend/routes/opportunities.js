const express = require('express');
const router = express.Router();
const { getOpportunities, applyToOpportunity } = require('../controllers/opportunitiesController');
const auth = require('../middleware/auth');

router.get('/', auth, getOpportunities);
router.post('/:id/apply', auth, applyToOpportunity);

module.exports = router;
