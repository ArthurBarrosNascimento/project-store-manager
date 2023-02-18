const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers')
const { allProducts, newProduct, products } = require('./mock/products.controller.mocks');

describe('Testando a unidade Controller de products', () => {
  it('Testando se retorna status 200 e a lista de produtos', async () => {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findAll').resolves({ type: null, message: allProducts })
    await productsController.listProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Testa se retorna status 200 e o produto buscado pelo id', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'findById').resolves({ type: null, message: allProducts[0] })
    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  });

  it('Testa se retorna 201 e o produto cadastrado', async () => {
    const res = {};
    const req = {
      body: products,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsService, 'createProduct').resolves({ type: null, message: newProduct })
    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Testa se atualizar product pelo id', async () => {
    const res = {};
    const req = {
      params: { id: 3 },
      body: products,
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateProduct').resolves({ type: null, message: newProduct })
    await productsController.updateProjectById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  // it('Testa se deleta um product com sucesso pelo id', async () => {
  //   const res = {};
  //   const req = {
  //     params: { id: 1 },
  //   };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon.stub(productsService, 'deleteProductById').resolves(1)
  //   await productsController.deleteProductById(req, res);
  //   expect(res.status).to.have.been.calledWith(204);
  // });

  afterEach(function () {
    sinon.restore();
  });
});