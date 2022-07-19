const {body,param,query} = require("express-validator")

module.exports =  [
                    body("id").isNumeric().withMessage("user id must be a number")
                                .notEmpty().withMessage("user id is required"),
                    body("name").isAlpha().withMessage("user name must be a string")
                                .notEmpty().withMessage("user name is required"),
                    body("email").isString().withMessage("user email must be a string")
                                .isEmail().withMessage("user email is not valid")
                                .notEmpty().withMessage("user email is required"),
                    body("password").isString().withMessage("user password must be a string ")
                                    .notEmpty().withMessage("user password is required"),
                    body("age").isNumeric().withMessage("user age must be a number"),
                    body("phone").isString().withMessage("user phone must be a string")
                                .notEmpty().withMessage("user phone is required"),
                    body("isAdmin").isBoolean().withMessage("isAdmin must be boolean")
                                    .notEmpty().withMessage("isAdmin is required")
                ]   