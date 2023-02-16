module.exports = (req, res, next) => {
  const request = req.body;
  const productId = request.every((x) => x.productId);
  const quantity = request.every((x) => typeof x.quantity !== 'undefined');

  if (!productId) return res.status(400).json({ message: '"productId" is required' });
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });

  return next();
};