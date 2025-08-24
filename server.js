const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerOptions");

const itemsRoutes = require("./routes/items.routes");
const pingRoutes = require("./routes/ping.routes");

const app = express();
const PORT = 3000;

app.use(express.json());
// Swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Маршрути
app.use("/items", itemsRoutes);
app.use("/", pingRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});