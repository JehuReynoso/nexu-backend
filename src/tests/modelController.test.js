const request = require('supertest');
const { BrandModel } = require('../models');
const app = require('../index'); // Make sure your main application file exports `app`

jest.mock('../models');

describe('Model Controller', () => {
  describe('updateModelPrice', () => {
    it('should update the model price if above 100,000', async () => {
      const modelId = 1;
      const newPrice = 150000;
      BrandModel.update.mockResolvedValue([1]); // Simulate successful update

      const response = await request(app)
        .put(`/models/${modelId}`)
        .send({ average_price: newPrice });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });

    it('should return 400 if average price is below 100,000', async () => {
      const modelId = 1;
      const newPrice = 50000;

      const response = await request(app)
        .put(`/models/${modelId}`)
        .send({ average_price: newPrice });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Price must be above 100,000' });
    });
  });

  describe('getModels', () => {
    it('should return models within the specified price range', async () => {
      const mockModels = [
        { dataValues: { id: 1, name: 'Model A', average_price: 120000 } },
        { dataValues: { id: 2, name: 'Model B', average_price: 180000 } },
      ];
      BrandModel.findAll.mockResolvedValue(mockModels);

      const response = await request(app).get('/models?greater=100000&lower=200000');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, name: 'Model A', average_price: 120000 },
        { id: 2, name: 'Model B', average_price: 180000 },
      ]);
    });

    it('should return all models if no filter is specified', async () => {
      const mockModels = [
        { dataValues: { id: 1, name: 'Model A', average_price: 120000 } },
        { dataValues: { id: 2, name: 'Model B', average_price: 180000 } },
      ];
      BrandModel.findAll.mockResolvedValue(mockModels);

      const response = await request(app).get('/models');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { id: 1, name: 'Model A', average_price: 120000 },
        { id: 2, name: 'Model B', average_price: 180000 },
      ]);
    });
  });
});
