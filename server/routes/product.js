const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAllProducts,
  removedProduct,
  read
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAllProducts);
router.delete("/remove-product/:slug", authCheck, adminCheck, removedProduct);
router.get("/product/:slug", authCheck, adminCheck, read);


module.exports = router;
