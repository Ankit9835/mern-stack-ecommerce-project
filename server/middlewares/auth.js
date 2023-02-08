const {auth} = require('../firebase/index.js')

const authCheck = async (req,res,next) => {
   try{
    //console.log(req.headers)
    //console.log('admin',admin)
    const firebaseUser = await auth.verifyIdToken(req.headers.authtoken);
    console.log('autheticated user', firebaseUser)
    req.user = firebaseUser
    next()
   } catch(error){
    console.log(error)
    res.status(400).json({
        err:'Invalid or expired token'
    })
   }
} 

module.exports = {
    authCheck
}