const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  console.log(result);
  return result;
};

const findByID = async (productId) => {
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

module.exports = {
  findAll,
  findByID,
  insert,
};
