// services/database.js
const { Pool } = require('pg');
const { pgConfig } = require('../config');

const pool = new Pool(pgConfig);

module.exports = {
  pool,
};
