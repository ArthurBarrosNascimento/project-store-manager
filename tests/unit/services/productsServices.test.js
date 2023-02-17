const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models/');
const { productsService } = require('../../../src/services');

const {
  allProducts,
} = require('./mocks/products.service.mock')

describe('Testando a unidade de Service products', () => {
  it('Testando se retorna a lista de produtos', async () => {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);
    const result = await productsService.findAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allProducts);
  });

  it('Testando se retorna um erro caso passe um id invalido', async () => {
    sinon.stub(productsModel, 'findById').resolves()
  });

  afterEach(function () {
    sinon.restore();
  });
});