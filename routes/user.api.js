const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
const authController = require("../controller/auth.controller");

router.post("/join", userController.createUser);
router.post("/login", userController.loginWithEmail);
router.post("/check-email", userController.checkEmail);

router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
