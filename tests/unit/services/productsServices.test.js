const { expect } = require('chai');
const sinon = require('sinon');

const { productsModel } = require('../../../src/models/');
const connection = require('../../../src/models/connection');
const { productsService } = require('../../../src/services');

const {
  allProducts,
  updateProduct,
} = require('./mocks/products.service.mock')

describe('Testando a unidade de Service products', () => {
  it('Testando se retorna a lista de produtos', async () => {
    sinon.stub(productsModel, 'findAll').resolves(allProducts);
    const result = await productsService.findAll();
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allProducts);
  });

  it('Testando se retorna um erro caso passe um id invalido', async () => {
    const result = await productsService.findById('a');
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number');
  });

  it('Testando se retorna um error caso o id produto não exista', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const result = await productsService.findById(1);
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  it('Testando se retorna o produto pelo id', async () => {
    sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
    const idProduct = 1;
    const result = await productsService.findById(idProduct);
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(allProducts[0]);
  });

  it('Testando se retorna um erro se passar nome do tamanho errado', async () => {
    const name = 'gro';
    const result = await productsService.createProduct(name);
    expect(result.type).to.be.equal('INVALID_VALUE');
    expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
  });

  it('Testando se cadastra um produto', async () => {
    const nameProduct = 'Martelo de Thor';
    sinon.stub(productsModel, 'insert').resolves(nameProduct);
    sinon.stub(productsModel, 'findById').resolves(allProducts[0]);

    const result = await productsService.createProduct(nameProduct);
    expect(result.type).to.equal(null);
    expect(result.message).to.be.equal(allProducts[0]);
  });

  it('Testando se retorna um erro ao tentar atualizar um produto com o Id errado', async () => {
    const invalidId = 'a';
    const validName = 'Martelo'
    const result = await productsService.updateProduct(invalidId, validName);
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number');
  });

  it('Testando se retorna um erro ao tentar atualizar um produto com nome invalido', async () => {
    const validId = 1;
    const invalidName = 'gro';
    const result = await productsService.updateProduct(validId, invalidName);
    expect(result.type).to.be.equal('INVALID_VALUE');
    expect(result.message).to.be.equal('"name" length must be at least 5 characters long');
  });

  it('Testando se retorna um erro ao tentar atualizar um produto com um id de produto que não existe', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined)
    const invalidId = 9;
    const validName = 'Martelo';
    const result = await productsService.updateProduct(invalidId, validName);
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  it('Testando se atualiza um produto com sucesso', async () => {
    sinon.stub(productsModel, 'findById').resolves(updateProduct)
    sinon.stub(productsModel, 'updateProductById').resolves(updateProduct);
    const id = 1;
    const nameProduct = 'Capa do Batman';
    const result = await productsService.updateProduct(id, nameProduct);
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(updateProduct);
  });

  it('Testando se retorna um erro ao tentar deletar um produto com id invalido', async () => {
    const invalidId = 'a';
    const result = await productsService.deleteProductById(invalidId);
    expect(result.type).to.equal('INVALID_VALUE');
    expect(result.message).to.equal('"id" must be a number');
  });

  it('Testando se retorna um erro ao tentar deletar um produto com id de um produto que não existe', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const validId = 1;
    const result = await productsService.deleteProductById(validId);
    expect(result.type).to.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  it('Testando se deleta um produto com sucesso', async () => {
    sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
    sinon.stub(productsModel, 'deleteProductById').resolves(1)
    const validId = 1;
    const result = await productsService.deleteProductById(validId);
    expect(result.type).to.equal(null);
    expect(result.message).to.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});