const { pool } = require('./database');

async function calculateCreditScore(businessId) {
  const query = {
    text: 'SELECT SUM(amount) AS total_amount, COUNT(*) AS total_transactions FROM orders WHERE business_id = $1',
    values: [businessId],
  };

  const result = await pool.query(query);
  const totalAmount = result.rows[0].total_amount;
  const totalTransactions = result.rows[0].total_transactions;

  const creditScore = totalAmount / (totalTransactions * 100);
  return creditScore;
}

module.exports = {
  calculateCreditScore,
};
