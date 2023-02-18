const { expect } = require('chai');
const sinon = require('sinon');

const { salesModel } = require('../../../src/models/');
const connection = require('../../../src/models/connection');
const { salesService } = require('../../../src/services');

const {
  invalidSalesProduct,
  allSalesProducts,
  salesProducts,
} = require('./mocks/sales.service.mocks');

describe('Testando a unidade Service de sales', () => {
  it('Testando se retorna um erro ao tentar cadastrar sales products com a quantity errada', async () => {
    const result = await salesService.createSalesProducts(invalidSalesProduct);
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"quantity" must be greater than or equal to 1')
  });

  it('Testa se lista sales products', async () => {
    sinon.stub(salesModel, 'findAllSalesProducts').resolves(allSalesProducts);
    const result = await salesService.findAllSalesProducts();
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(allSalesProducts)
  });

  it('Testando se retorna um erro ao buscar sales products por um id invalido', async () => {
    const result = await salesService.findSalesProductById('a');
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number');
  });

  it('Testando se retorna um erro ao buscar sales products por um id sales que não existe', async () => {
    sinon.stub(salesModel, 'findSaleById').resolves(undefined)
    const result = await salesService.findSalesProductById(1);
    expect(result.type).to.equal('SALE_NOT_FOUND');
    expect(result.message).to.equal('Sale not found');
  });

  it('Testa se lista sales products pelo id correto', async () => {
    sinon.stub(salesModel, 'findSalesProductById').resolves(salesProducts);
    const result = await salesService.findSalesProductById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(salesProducts);

  });

  afterEach(function () {
    sinon.restore();
  });
});