const mongoos = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt  = require("bcrypt");
const saltRounds = 10;

const User = require("../Models/user")

module.exports.toLogin = (req,res,next)=>{
        
        User.findOne({$or:[{email:req.body.email},{phone:req.body.phone}]})
            .then((data)=>{
                
                if(!data){
                    let error = new Error("email or password is incorrect");
                    error.status = 401;
                    throw error;
                }
                
                bcrypt.compare(req.body.password, data.password, function(err, result) {
                    if(result){
                        let token  = jwt.sign({
                            id:data._id,
                            isAdmin:data.isAdmin
                        },
                        "ourLogSecret",
                        {expiresIn:"1h"});
                        res.status(200).json({token,msg:"loged in"});
                    } else {
                        let error = new Error("email or password is incorrect");
                        error.status = 401;
                        next(error);
                    }
                });
  
            }).catch((err)=>{
                next(err)
            })
}
