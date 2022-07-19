const mongoos = require("mongoose");
const fs = require("fs");
const path = require("path");
const bcrypt  = require("bcrypt");
const saltRounds = 10;

const User = require("../Models/user");

module.exports.getAllusers = (req,res,next) => {
    User.find({})
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            next(err)
        })
}

module.exports.getUserById = (req,res,next) => {
    User.findOne({_id:req.params.id})
    .then((data) => {
        if(data == null){
         next(new Error("user is not found"));
        }else{
            res.status(200).json(data);
        }

    })
    .catch((err) => {
        next(err);
    })
}

module.exports.addUser = (req,res,next) => {
    bcrypt.hash(req.body.password, saltRounds,(err,hash)=>{
        let object  = new User ({
            _id:req.body.id,
            name:req.body.name,
            email: req.body.email,
            password: hash,
            age: req.body.age,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin
        });
    
        object.save()
                .then((data) => {
                    res.status(201).json({data: "added"})
                })
                .catch( (err) => {
                    next(err)
                })
    });
}

module.exports.updateUser = (req,res,next) => {
    bcrypt.hash(req.body.password, saltRounds,(err,hash)=>{
        User.updateOne({_id: req.body.id},{
            $set:{
                _id:req.body.id,
                name:req.body.name,
                email: req.body.email,
                password: hash,
                age: req.body.age,
                phone: req.body.phone,
                isAdmin: req.body.isAdmin
            }
        }).then((data)=>{
            if(data.matchedCount == 0){
                next(new Error("user is not found"));
            }else{
                res.status(200).json(data);
            }
        }).catch((err) => {
            next(err);
        })
    })
}

module.exports.deleteUser = (req,res,next) => {
    User.deleteOne({_id:req.params.id})
    .then((data) => {
        if(data.deletedCount == 0){
            next(new Error("user is not found"));
        }else{
            res.status(200).json(data);
        }
    })
    .catch((err) => {
        next(err);
    })
}

module.exports.getLogs = (req,res,next) => {
    console.log(fs.readFileSync(path.join(__dirname,"../access.log")).toString())
    res.send(fs.readFileSync(path.join(__dirname,"../access.log")).toString());
}