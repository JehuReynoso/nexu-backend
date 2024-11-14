const express = require('express');
const router = express.Router();
const { getBrands, createBrand, getBrandModels, createBrandModel } = require('../controllers/brandController');

router.get('/', getBrands);
router.post('/', createBrand);
router.get('/:id/models', getBrandModels);
router.post('/:id/models', createBrandModel);

module.exports = router;
