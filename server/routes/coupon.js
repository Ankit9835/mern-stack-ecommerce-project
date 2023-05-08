const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  read,
  remove,
  list,
} = require("../controllers/coupon");

// routes
router.post("/create-coupon", authCheck, adminCheck, create);
router.get("/coupons", list);
router.get("/coupon/:id", read);
router.get("/coupon/remove/:id", remove);


module.exports = router;
