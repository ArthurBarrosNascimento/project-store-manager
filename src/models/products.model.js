const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  console.log(result);
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id;', [productId],
  );
  return result;
};

const insert = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [productName],
  );
  return insertId;
};

const updateProductById = async (id, string) => {
  const [result] = await connection.execute(
    'UPDATE StoreManager.products SET StoreManager.products.name = (?) WHERE id = (?)',
    [string, id],
  );
  return result;
};

const deleteProductById = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?)',
    [id],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateProductById,
  deleteProductById,
};
