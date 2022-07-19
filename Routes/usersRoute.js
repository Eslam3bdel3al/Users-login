const express = require("express");

const usersController = require("../Controlers/usersControler");
const validationMW = require("../MiddleWares/validationMW");
const authMW = require("../MiddleWares/authMW");
const adminAuthMW =require("../MiddleWares/adminAuthMW");
const userVal = require("../MiddleWares/userValCon");
const router = express.Router();

router.route("/users")
        .get(authMW, adminAuthMW.mustAdmin, usersController.getAllusers)
        .post(userVal, validationMW, authMW, adminAuthMW.mustAdmin, usersController.addUser)
        .put(userVal, validationMW, authMW, adminAuthMW.mustAdmin, usersController.updateUser)

router.route("/users/:id")
        .get(authMW, adminAuthMW.mustAdmin, usersController.getUserById)
        .delete(authMW, adminAuthMW.mustAdmin, usersController.deleteUser)

router.route("/profile/:id")
    .get(authMW, adminAuthMW.mustUser, usersController.getUserById)
    .delete(authMW, adminAuthMW.mustUser, usersController.deleteUser)

router.route("/logs").get(authMW, adminAuthMW.mustAdmin, usersController.getLogs)

module.exports = router; 