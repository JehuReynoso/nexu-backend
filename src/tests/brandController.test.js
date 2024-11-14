const request = require('supertest');
const { Brand, BrandModel } = require('../models');
const app = require('../index'); // Ensure `app` is exported from the main application file

jest.mock('../models');

describe('Brand Controller', () => {
  describe('getBrands', () => {
    it('should return a list of brands', async () => {
      const mockBrands = [
        { dataValues: { id: 1, name: 'Toyota', average_price: 200000 } },
        { dataValues: { id: 2, name: 'Ford', average_price: 250000 } },
      ];
      Brand.findAll.mockResolvedValue(mockBrands);

      const response = await request(app).get('/brands');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, name: 'Toyota', average_price: 200000 },
        { id: 2, name: 'Ford', average_price: 250000 },
      ]);
    });
  });

  describe('createBrand', () => {
    it('should create a new brand and return it', async () => {
      const newBrand = { id: 1, name: 'Toyota' };
      Brand.findOne.mockResolvedValue(null);
      Brand.create.mockResolvedValue(newBrand);

      const response = await request(app)
        .post('/brands')
        .send({ name: 'Toyota' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newBrand);
    });

    it('should return 409 if brand already exists', async () => {
      const existingBrand = { id: 1, name: 'Toyota' };
      Brand.findOne.mockResolvedValue(existingBrand);

      const response = await request(app)
        .post('/brands')
        .send({ name: 'Toyota' });

      expect(response.status).toBe(409);
      expect(response.body).toEqual({ message: 'Brand with name Toyota already exists' });
    });

    it('should return 404 if name is missing', async () => {
      const response = await request(app).post('/brands').send({});
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Name can not be empty' });
    });
  });

  describe('getBrandModels', () => {
    it('should return a list of models for a given brand', async () => {
      const mockModels = [
        { dataValues: { id: 1, name: 'Camry', average_price: 150000 } },
        { dataValues: { id: 2, name: 'Corolla', average_price: 100000 } },
      ];
      BrandModel.findAll.mockResolvedValue(mockModels);

      const response = await request(app).get('/brands/1/models');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, name: 'Camry', average_price: 150000 },
        { id: 2, name: 'Corolla', average_price: 100000 },
      ]);
    });
  });

  describe('createBrandModel', () => {
    it('should create a new model for a brand', async () => {
      const brand = { id: 1, name: 'Toyota' };
      const newModel = { id: 1, name: 'Camry', average_price: 150000, brandId: 1 };

      Brand.findByPk.mockResolvedValue(brand);
      BrandModel.findOne.mockResolvedValue(null);
      BrandModel.create.mockResolvedValue(newModel);

      const response = await request(app)
        .post('/brands/1/models')
        .send({ name: 'Camry', average_price: 150000 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newModel);
    });

    it('should return 404 if brand is not found', async () => {
      Brand.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .post('/brands/99/models')
        .send({ name: 'Camry', average_price: 150000 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Brand not found' });
    });

    it('should return 400 if average price is below 100,000', async () => {
      Brand.findByPk.mockResolvedValue({ id: 1, name: 'Toyota' });

      const response = await request(app)
        .post('/brands/1/models')
        .send({ name: 'Camry', average_price: 50000 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Price must be above 100,000' });
    });

    it('should return 409 if model already exists', async () => {
      Brand.findByPk.mockResolvedValue({ id: 1, name: 'Toyota' });
      BrandModel.findOne.mockResolvedValue({ id: 1, name: 'Camry' });

      const response = await request(app)
        .post('/brands/1/models')
        .send({ name: 'Camry', average_price: 150000 });

      expect(response.status).toBe(409);
      expect(response.body).toEqual({ message: 'Model with name Camry already exists' });
    });
  });
});
