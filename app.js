const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerOptions");

const app = express();
app.use(express.json());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/items", require("./routes/items.routes"));
app.use("/", require("./routes/ping.routes"));

module.exports = app;