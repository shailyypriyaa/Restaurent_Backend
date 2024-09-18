const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const { createCatController, getAllCategory, updateCatController, deleteCatController } = require("../controllers/categoryController");


const router = express.Router();

// routes

// CREATE CAT
router.post("/create", authMiddleware, createCatController);


// GET ALL CAT
router.get("/getAll",getAllCategory)

// update CAT
router.put("/update/:id",authMiddleware,updateCatController)


// DELETE CAT
router.delete("/delete/:id",authMiddleware,deleteCatController)

module.exports = router;
