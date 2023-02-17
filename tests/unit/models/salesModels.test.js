const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const {
  productIdFindById,
  allSalesProducts,
  findSalesById,
  findSalesProductById,
} = require('./mocks/sales.model.mock');

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

  it('Testando se lista toda sales products', async () => {
    sinon.stub(connection, 'execute').resolves([allSalesProducts])
    const result = await salesModel.findAllSalesProducts();
    expect(result).to.be.deep.equal(allSalesProducts)
  });

  it('Testando se busca sales pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([[findSalesById]]);
    const idSales = 1;
    const result = await salesModel.findSaleById(idSales);
    expect(result).to.be.deep.equal(findSalesById);
  });

  it('Testando se busca sales products pelo id', async () => {
    sinon.stub(connection, 'execute').resolves([findSalesProductById]);
    const idSales = 1;
    const result = await salesModel.findSalesProductById(idSales);
    expect(result).to.be.deep.equal(findSalesProductById);
  });

  afterEach(function () {
    sinon.restore();
  });
})