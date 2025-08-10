const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const items = [{ id: 1, title: 'first item' }, { id: 2, title: 'second item' }, { id: 3, title: 'third item' }]

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
app.get('/', (req, res) => {
  res.send('Server is alive');
});
/**
 * @swagger
/items:
 *   get:
 *     tags:
 *       - items
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: Items list
 *         
 */
app.get('/items', (req, res) => {
  res.json(items);
});
/**
 * @swagger
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

app.get('/items/:id', (req, res) => {
  const ItemById = items.find(item => item.id === Number(req.params.id));
  if (!ItemById) {
  return res.status(404).json({ error: 'Item not found' });
}
  res.json(ItemById);
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
