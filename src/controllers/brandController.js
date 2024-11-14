const {Brand, BrandModel} = require('../models');

exports.getBrands = async (req, res) => {
  const brands = await Brand.findAll();
  res.json(brands.map((item) => {
    return {id: item.dataValues.id, name: item.dataValues.name, average_price: item.dataValues.average_price};
  }));
};

exports.createBrand = async (req, res) => {
  try {
    const {name} = req.body;
    if (!name) {
      return res.status(404).json({message: 'Name can not be empty'});
    }

    const existBrand = await Brand.findOne({where: {name}})
    if (existBrand) {
      return res.status(409).json({message: `Brand with name ${name} already exists`});
    }
    const brand = await Brand.create({name});
    res.status(201).json({id: brand.id, name: brand.name});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Something went wrong'});
  }
};

exports.getBrandModels = async (req, res) => {
  const {id} = req.params;
  const models = await BrandModel.findAll({where: {brandId: id}});
  res.json(models.map((item) => {
    return {id: item.dataValues.id, name: item.dataValues.name, average_price: item.dataValues.average_price};
  }));
};

exports.createBrandModel = async (req, res) => {
  const {id} = req.params;
  const {name, average_price} = req.body;

  const brand = await Brand.findByPk(id);
  if (!brand) return res.status(404).json({message: 'Brand not found'});

  if (average_price && average_price < 100000) {
    return res.status(400).json({message: 'Price must be above 100,000'});
  }

  const existModel = await BrandModel.findOne({where: {name}})
  if (existModel) {
    return res.status(409).json({message: `Model with name ${name} already exists`});
  }

  const model = await BrandModel.create({name, average_price, brandId: id});
  res.status(201).json(model);
};
