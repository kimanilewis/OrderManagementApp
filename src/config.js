
module.exports = {
    pgConfig: {
      connectionString: 'postgres://postgres:r00t@localhost:5432/orders',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    },
  };
  