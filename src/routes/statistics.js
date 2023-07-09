const express = require('express');
const router = express.Router();
const { pool } = require('../services/database');

router.get('/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;

    const totalOrdersQuery = {
      text: 'SELECT COUNT(*) AS total_orders FROM orders WHERE business_id = $1',
      values: [businessId],
    };
    const totalAmountQuery = {
      text: 'SELECT SUM(amount) AS total_amount FROM orders WHERE business_id = $1',
      values: [businessId],
    };

    const [totalOrdersResult, totalAmountResult] = await Promise.all([
      pool.query(totalOrdersQuery),
      pool.query(totalAmountQuery),
    ]);

    const totalOrders = totalOrdersResult.rows[0].total_orders;
    const totalAmount = totalAmountResult.rows[0].total_amount;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalOrdersTodayQuery = {
      text: 'SELECT COUNT(*) AS total_orders_today FROM orders WHERE business_id = $1 AND created_at >= $2',
      values: [businessId, today],
    };
    const totalAmountTodayQuery = {
      text: 'SELECT SUM(amount) AS total_amount_today FROM orders WHERE business_id = $1 AND created_at >= $2',
      values: [businessId, today],
    };

    const [totalOrdersTodayResult, totalAmountTodayResult] = await Promise.all([
      pool.query(totalOrdersTodayQuery),
      pool.query(totalAmountTodayQuery),
    ]);

    const totalOrdersToday = totalOrdersTodayResult.rows[0].total_orders_today;
    const totalAmountToday = totalAmountTodayResult.rows[0].total_amount_today;

    res.json({
      totalOrders,
      totalAmount,
      totalOrdersToday,
      totalAmountToday,
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
