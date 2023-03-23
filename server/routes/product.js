const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  listAllProducts,
  removedProduct,
  read,
  updateProduct,
  list,
  productCount,
  productStar,
  relatedProduct
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get('/products/count', productCount)
router.get("/products/:count", listAllProducts);
router.delete("/remove-product/:slug", authCheck, adminCheck, removedProduct);
router.get("/product/:slug",  read);
router.put("/updated-product/:slug", updateProduct);
router.post("/products", list);

router.put('/products/star/:productId', authCheck, productStar)
router.get('/product/related/:productId', relatedProduct)


module.exports = router;
