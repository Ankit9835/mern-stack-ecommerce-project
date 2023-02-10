const {auth} = require('../firebase/index.js')
const User = require('../models/user')

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

const adminCheck = async (req,res,next) => {
    try {
        const {email} = req.user
        const isAdmin = await User.findOne({email})
        if(isAdmin.role !== 'admin'){
            return res.status(403).json({
                err:'Unauthorized access'
            })
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    authCheck,
    adminCheck
}