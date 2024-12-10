const express = require('express');
const { getRecommendations } = require('../services/recommendationService');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const recommendations = await getRecommendations(req.body);
    res.json(recommendations);
  } catch (error) {
    console.error('Recommendation error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

module.exports = router;