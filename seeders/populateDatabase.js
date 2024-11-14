const fs = require('fs');
const path = require('path');
const { Brand, BrandModel } = require('../src/models'); // Adjust the path if needed

const populateDatabase = async () => {
  try {
    const rawData = fs.readFileSync(path.join(__dirname, '../src/data/models.json'));
    const modelsData = JSON.parse(rawData);

    const brandMap = {};

    for (const model of modelsData) {
      const { brand_name, name, average_price } = model;

      if (!brandMap[brand_name]) {
        const [brand] = await Brand.findOrCreate({
          where: { name: brand_name },
          defaults: { average_price: 0 } // Average price will be recalculated below
        });
        brandMap[brand_name] = brand;
      }

      // Create model associated with the brand
      await BrandModel.create({
        name,
        average_price,
        brandId: brandMap[brand_name].id
      });
    }

    console.log('Database populated successfully.');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

populateDatabase().then(() => process.exit());
