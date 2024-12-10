const express = require('express');
const { predictSales } = require('../services/salesPredictionService');

const router = express.Router();

router.get('/:productId', async (req, res) => {
  try {
    const prediction = await predictSales(req.params.productId);
    res.json({ prediction });
  } catch (error) {
    console.error('Sales prediction error:', error);
    res.status(500).json({ error: 'Failed to predict sales' });
  }
});

module.exports = router;