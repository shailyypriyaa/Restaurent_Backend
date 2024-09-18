const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurentController, getAllRestaurentController, getRestaurentById, deleteRestaurentController } = require("../controllers/restaurentController");

const router = express.Router();

// routes

// CREATE restaurent
router.post("/create",authMiddleware,createRestaurentController)

// GET all RESTAURENTS
router.get("/getAll",getAllRestaurentController)


// GET RESTAURENT BY ID
router.get("/get/:id",getRestaurentById)


// DELETE RESTAURENT
router.delete("/delete/:id",authMiddleware,deleteRestaurentController)

module.exports = router;



