
module.exports.mustAdmin = (req,res,next) => {
    if(req.isAdmin){
        next()
    }else{
        let error = new Error("Not Authorized");
        error.status = 403;
        throw error;
    }
}

module.exports.mustUser = (req,res,next) => {
    if(!req.isAdmin && req.id == req.params.id){
        next()
    }else {
        let error = new Error("Not Authorized");
        error.status = 403;
        throw error;
    }
}

module.exports.userORAdmin = (req,res,next) => {
    if(req.isAdmin){
        next()
    }else if(req.id == req.params.id){
        next()
    }else {
        let error = new Error("Not Authorized");
        error.status = 403;
        throw error;
    }
}