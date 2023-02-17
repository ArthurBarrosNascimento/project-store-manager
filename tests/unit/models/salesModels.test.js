const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { productIdFindById } = require('./mocks/sales.model.mock');

describe('Testando a unidade Model de sales', () => {
  it('Testando se cria um Id para sales', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const result = await salesModel.createIdSales();
    expect(result).to.be.equal(3);
  });

  it('Testando se insere sales products', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }])
    const id = 1;
    const productId = 1;
    const quantity = 3;
    const result = await salesModel.insertSalesProducts(id, productId, quantity);
    expect(result).to.be.equal(4);
  });

  it('Testando se busca sales product pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([productIdFindById]);
    const idProduct = 1;
    const result = await salesModel.searchSalesProductById(idProduct)
    expect(result).to.be.deep.equal(productIdFindById)
  });

  afterEach(function () {
    sinon.restore();
  });
})