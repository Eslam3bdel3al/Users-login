const jwt = require("jsonwebtoken");


module.exports = (req,res,next)=>{
    try{
        let token  = req.get("Authorization").split(" ")[1];
        let decodedToken = jwt.verify(token,"ourLogSecret");
        req.isAdmin = decodedToken.isAdmin;
        req.id = decodedToken.id
        next()
    }
    catch(error){
        error.message = "Not autherized",
        error.sataus = 403,
        next(error)
    }
}
