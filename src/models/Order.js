const { pool } = require('../services/database');

class Order {
  static async create(orderData) {
    const { orderId, businessId, department, amount } = orderData;
    const query = {
      text: 'INSERT INTO orders (order_id, business_id, department, amount) VALUES ($1, $2, $3, $4)',
      values: [orderId, businessId, department, amount],
    };

    await pool.query(query);
  }
}

module.exports = Order;
