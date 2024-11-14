const express = require('express');
const router = express.Router();
const { updateModelPrice, getModels } = require('../controllers/modelController');

router.put('/:id', updateModelPrice);
router.get('/', getModels);

module.exports = router;
