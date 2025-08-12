const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerOptions");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const items = [
  { id: 0, title: "Item 0" },
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2" },
  { id: 3, title: "Item 3" },
  { id: 4, title: "Item 4" },
  { id: 5, title: "Item 5" },
  { id: 6, title: "Item 6" },
  { id: 7, title: "Item 7" },
  { id: 8, title: "Item 8" },
  { id: 9, title: "Item 9" },
  { id: 10, title: "Item 10" },
  { id: 11, title: "Item 11" },
  { id: 12, title: "Item 12" },
  { id: 13, title: "Item 13" },
  { id: 14, title: "Item 14" },
  { id: 15, title: "Item 15" },
  { id: 16, title: "Item 16" },
  { id: 17, title: "Item 17" },
  { id: 18, title: "Item 18" },
  { id: 19, title: "Item 19" },
  { id: 20, title: "Item 20" },
];

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - ping
 *     summary: ping
 *     responses:
 *       200:
 *         description: Server is alive
 */
app.get("/", (req, res) => {
  res.send("Server is alive");
});
/**
 * @swagger
 * /items:
 *   get:
 *     tags:
 *       - items
 *     summary: Get all items
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: true
 *         description: items limit
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *         required: true
 *         description: items skip
 *     responses:
 *       200:
 *         description: Items list
 */
app.get("/items", (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 0;
  const allItems = items.slice(skip, skip + limit);
  const count = items.length;
  res.status(200).json({ data: allItems, skip, limit, count });
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     tags:
 *       - items
 *     summary: Get item by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: item id
 *     responses:
 *       200:
 *         description: item
 */

app.get("/items/:id", (req, res) => {
  const ItemById = items.find((item) => item.id === Number(req.params.id));
  if (!ItemById) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(ItemById);
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
