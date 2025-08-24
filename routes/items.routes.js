const express = require("express");
const router = express.Router();
const items = require("../data/items");

/**
 * @swagger
* /items:
 *   get:
 *     tags: [items]
 *     summary: Get items list
 *     description: Returns a list of items with pagination
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Skip first N items
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items count
 *     responses:
 *       200:
 *         description: Items list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 0
 *                       title:
 *                         type: string
 *                         example: "Item 0"
 *                 skip:
 *                   type: integer
 *                   example: 0
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 count:
 *                   type: integer
 *                   example: 50
 */
router.get("/", (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const allItems = items.slice(skip, skip + limit);
  const count = items.length;
  res.status(200).json({ data: allItems, skip, limit, count });
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     tags: [items]
 *     summary: Get item by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Item id
 *     responses:
 *       200:
 *         description: Item object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 0
 *                 title:
 *                   type: string
 *                   example: "Item 0"
 *       404:
 *         description: Item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Item not found"
 */
router.get("/:id", (req, res) => {
  const itemById = items.find((item) => item.id === Number(req.params.id));
  if (!itemById) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(itemById);
});

module.exports = router;
