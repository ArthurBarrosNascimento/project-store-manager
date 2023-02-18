const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { allSalesProducts, salesProducts } = require('./mock/sales.controller.mocks');

describe('Testando a unidade Controller de sales', () => {
  it('Testando se lista todo de sales products e retorna status 200', async () => {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findAllSalesProducts').resolves({ type: null, message: allSalesProducts });
    await salesController.listAllSalesProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesProducts);
  });

  it('Tetsando se lista sales products e retorna status 200', async () => {
    const res = {};
    const req = {
      params: { id: 1 }
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(salesService, 'findSalesProductById').resolves({ type: null, message: salesProducts });
    await salesController.getSalesProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesProducts);
  });

  afterEach(function () {
    sinon.restore();
  });
});