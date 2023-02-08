 const User = require('../models/user')
 
 const createUser = async (req,res) => {
    try{
        const {name,picture,email} = req.user
        const user = await  User.findOneAndUpdate({email}, {name,picture}, {new:true})
        if(user){
           return res.json(user)
        } else {
            const newUser =  await new User({
                name,email,picture
            }).save()
            res.json(newUser)
            console.log('user created', newUser)
        }
    } catch(error){
        res.status(400).json({
            error:error
        })
    }
    
}

const currentUser = async (req,res) => {
    try {
        const user = await User.findOne({email:req.user.email})
        if(user){
            return res.status(200).json({
                user
            })
        }
    } catch (error) {
        console.log('current user', error)
    }
}

module.exports = {
    createUser, currentUser
}