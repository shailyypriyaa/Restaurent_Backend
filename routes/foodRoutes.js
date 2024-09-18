const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getFoodController,
  getSingleFoodController,
  updateFoodController,
  getByRestaurent,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");


const router = express.Router();

// routes

// CREATE FOOD
router.post("/create",authMiddleware,createFoodController)

// GET ALL FOOD
router.get("/getAll",getFoodController)

// Get SINGLE FOOD
router.get("/getFood/:id",getSingleFoodController)

// Get SINGLE FOOD by Restaurent
router.get("/getByRestaurent/:id",getByRestaurent)

// UPDATE FOOD
router.put("/update/:id",authMiddleware,updateFoodController)

// DELETE FOOD
router.delete("/delete/:id",authMiddleware,deleteFoodController)

// PLACE ORDER
router.post("/order",authMiddleware,placeOrderController)

// ORDER STATUS
router.post("/orderStatus/:id",authMiddleware,adminMiddleware,orderStatusController)

module.exports = router;
