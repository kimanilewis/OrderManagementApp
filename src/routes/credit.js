const express = require('express');
const router = express.Router();
const creditService = require('../services/creditService');

router.get('/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;
    const creditScore = await creditService.calculateCreditScore(businessId);
    res.json({ creditScore });
  } catch (error) {
    console.error('Error fetching credit score:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
