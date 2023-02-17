const camelize = require('camelize');
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
  return camelize(result);
};

const findAllSalesProducts = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity 
    FROM StoreManager.sales_products INNER JOIN StoreManager.sales 
    ON StoreManager.sales_products.sale_id = StoreManager.sales.id
    ORDER BY StoreManager.sales.id;`,
  );
  return camelize(result);
};

const findSaleById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = (?)',
    [id],
  );
  return result;
};

const findSalesProductById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales
    INNER JOIN StoreManager.sales_products 
    ON StoreManager.sales.id = StoreManager.sales_products.sale_id
    WHERE StoreManager.sales.id = (?) ORDER BY StoreManager.sales.id`,
    [id],
  );
  return camelize(result);
};

module.exports = {
  insertSalesProducts,
  createIdSales,
  searchSalesProductById,
  findAllSalesProducts,
  findSaleById,
  findSalesProductById,
};