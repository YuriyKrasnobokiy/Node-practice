const express = require("express");
const router = express.Router();

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
router.get("/", (req, res) => {
  res.send("Server is alive");
});

module.exports = router;