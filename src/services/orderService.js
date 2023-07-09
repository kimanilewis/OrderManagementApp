// services/orderService.js
const axios = require('axios');
const { pool } = require('./database');

async function processOrder(orderData) {
  const { orderId, businessId, department, amount } = orderData;
  const query = {
    text: 'INSERT INTO orders (order_id, business_id, department, amount) VALUES ($1, $2, $3, $4)',
    values: [orderId, businessId, department, amount],
  };

  const orderProcessingPromise = pool.query(query);

  const taxApiUrl = 'https://taxes.free.beeceptor.com/log-tax';
  const taxPayload = {
    order_id: orderId,
    platform_code: '022',
    order_amount: amount,
  };
  const taxApiPromise = axios.post(taxApiUrl, taxPayload);

  await Promise.all([orderProcessingPromise, taxApiPromise]);
}

module.exports = {
  processOrder,
};
