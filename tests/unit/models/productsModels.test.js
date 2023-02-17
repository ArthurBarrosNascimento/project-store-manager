const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const {
  allProducts,
  newProduct,
  productUpdate,
} = require('./mocks/products.model.mock')

describe('Testando a unidade Model de products', () => {
  it('Testando se recupa a lista de produtos', async () => {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Testando se recupera produto por id', async () => {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    const idProduct = 1;
    const result = await productsModel.findById(idProduct);
    expect(result).to.be.deep.equal(allProducts[0]);
  });

  it('Testando ao cadastrar um produto', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const result = await productsModel.insert(newProduct);
    expect(result).to.be.equal(4);
  });

  it('Testando quando atualizar um produto', async () => {
    sinon.stub(connection, 'execute').resolves([productUpdate]);
    const idProduct = 1;
    const newNameProduct = 'Capa do Batman';
    const result = await productsModel.updateProductById(idProduct, newNameProduct);
    expect(result).to.be.deep.equal(productUpdate);
  });

  afterEach(function () {
    sinon.restore();
  });
})