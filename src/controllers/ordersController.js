const orderService = require('../services/orderService');

async function createOrder(req, res) {
  try {
    const { businessId, department, amount } = req.body;
    const orderId = uuids4();
    const orderData = { orderId, businessId, department, amount };

    await orderService.processOrder(orderData);

    res.status(201).json({ message: 'Order processed successfully.' });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createOrder,
};
