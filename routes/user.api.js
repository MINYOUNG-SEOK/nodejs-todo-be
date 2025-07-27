const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");

router.post("/join", userController.createUser);
router.post("/login", userController.loginWithEmail);
router.post("/check-email", userController.checkEmail);

module.exports = router;
