const express = require('express');
const { sequelize } = require('./models');
const brandRoutes = require('./routes/brands');
const modelRoutes = require('./routes/models');

const app = express();
app.use(express.json());

app.use('/brands', brandRoutes);
app.use('/models', modelRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
