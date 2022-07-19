const express = require("express");
const mongoose = require("mongoose");
const morgan  = require("morgan");
const fs = require("fs");
const path = require("path");

const usersRoute = require("./Routes/usersRoute");
const loginRoute = require("./Routes/loginRoute")

const server = express();

const accessLogStream  = fs.createWriteStream(path.join(__dirname,"./access.log"));
server.use(morgan("common",{stream:accessLogStream}));

//connect to db serves then create backEnd server
mongoose.connect("mongodb://localhost:27017/mongoDataBase")
        .then(()=>{
            console.log("DB connected");

            server.listen(process.env.PORT || 3000,() => {
                console.log(`we are listening to 'http://localhost:3000/'`)
            })
        })
        .catch(error=>console.log(error));



server.use(express.json());
server.use(express.urlencoded({extended:true}))

server.use(loginRoute);
server.use(usersRoute);



// not found
server.use((req,res)=> {
    res.status(404).json({message:"Not Found"});
})


// catch errors 2a5r middleware
server.use((error,req,res,next) => {
    res.status(error.status||500).json({message:"error " + error});
})

