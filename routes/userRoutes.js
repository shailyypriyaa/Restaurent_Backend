const express = require("express");
const { getUserController, updateUserController, updateUserPassword, resetPasswordController, deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// routes

// GET USER DATA
router.get("/getUser",authMiddleware,getUserController)

// UPDATE PROFILE
router.put("/updateUser",authMiddleware,updateUserController)


// PASSWORD UPDATE
router.post("/updatePassword" , authMiddleware , updateUserPassword)


// RESET PASSWORD
router.post("/resetPassword",authMiddleware,resetPasswordController)


// DELETE USER
router.delete("/deleteUser/:id",authMiddleware,deleteProfileController)

module.exports = router;
