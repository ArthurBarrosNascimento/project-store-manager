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

const findAllSalesProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products',
  );
  return result;
};

const findSalesProductById = async (id) => {
  const [result] = await connection.execute(
    'SELECT date, product_id, quantity FROM StoreManager.sales INNER JOIN StoreManager.sales_products ON StoreManager.sales.id = StoreManager.sales_products.sale_id WHERE StoreManager.sales.id = (?) ORDER BY StoreManager.sales.id; ',
    [id],
  );
  return result;
};

module.exports = {
  insertSalesProducts,
  createIdSales,
  searchSalesProductById,
  findAllSalesProducts,
  findSalesProductById,
};