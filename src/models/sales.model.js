const connection = require('./connection');

const createIdSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES ()',
  );
  return insertId;
};

const insertSalesProducts = async (salesId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [salesId, productId, quantity],
  );
  return insertId;
};

const searchSalesProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );
  return result;
};

module.exports = {
  insertSalesProducts,
  createIdSales,
  searchSalesProductById,
};