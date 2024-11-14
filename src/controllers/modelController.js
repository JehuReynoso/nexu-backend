const { BrandModel } = require('../models');
const {Op} = require('sequelize');

exports.updateModelPrice = async (req, res) => {
  const { id } = req.params;
  const { average_price } = req.body;
  if (average_price < 100000) return res.status(400).json({ message: 'Price must be above 100,000' });

  const model = await BrandModel.update({ average_price }, { where: { id } });
  res.status(200).json({});
};

exports.getModels = async (req, res) => {
  const { greater, lower } = req.query;
  let where = {};
  if (greater) where.average_price = { [Op.gt]: greater };
  if (lower) where.average_price = { ...where.average_price, [Op.lt]: lower };

  const models = await BrandModel.findAll({ where });

  res.json(models.map((item) => {
    return {id: item.dataValues.id, name: item.dataValues.name, average_price: item.dataValues.average_price};
  }));
};
