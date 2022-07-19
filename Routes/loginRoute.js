const express = require("express");
const {body,query,param} = require("express-validator")

const loginCont = require("../Controlers/loginControler");
const validationMW = require("../MiddleWares/validationMW")

const router = express.Router();


router.post("/login",loginCont.toLogin);

module.exports = router;