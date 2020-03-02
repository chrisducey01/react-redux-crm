const router = require("express").Router();
const userController = require("./user.controller");
const authController = require("./auth.controller");


// Handle authentication (login/logout/signup)
router.use("/auth", authController);

router.use("/api/users", userController);

module.exports = router;