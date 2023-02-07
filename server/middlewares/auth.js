const authCheck = (req,res,next) => {
    console.log(req.headers); // token
    next();
} 

module.exports = {
    authCheck
}