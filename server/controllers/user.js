 const User = require('../models/user')
 const Product = require('../models/product')
 const Cart = require('../models/cart')
 const Coupon = require('../models/coupon')

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

const addToCart = async (req,res) => {
    try {
        const {box} = req.body
       // console.log('cart',box)
        let products = []
        const user = await User.findOne({email:req.user.email})
        console.log('user1',user)
        let cartExistsByUser = await Cart.findOne({orderdBy: user._id})
        console.log('cart exists',cartExistsByUser)
        if(cartExistsByUser){
            cartExistsByUser.remove()
        }
        for(let i = 0; i < box.length; i++){
            let object = {}
            object.product = box[i]._id
            object.count = box[i].count
            object.color = box[i].color
            let {price} = await Product.findById(box[i]._id)
            object.price = price
            products.push(object)
        }

        let cartTotal = 0
        for(let i = 0; i < products.length; i++){
            cartTotal = cartTotal + products[i].price * products[i].count
        }

        let newCart = await new Cart({
            products,
            cartTotal,
            orderdBy: user._id,
        }).save()
         console.log('new cart', newCart)
         res.json({ok:true})
    } catch (error) {
        console.log(error.message)
    }
}

const getCart = async (req,res) => {
    try {
        const user = await User.findOne({email:req.user.email})
        const cart  = await Cart.findOne({orderdBy:user._id}).populate('products.product', '_id title price totalAfterDiscount')
        console.log('cart',cart)
        const {products,cartTotal,orderdBy} = cart
        res.json({products,cartTotal,orderdBy})
    } catch (error) {
        console.log(error)
    }
}

const emptyCart = async (req,res) => {
    try {
        const user = await User.findOne({email:req.user.email})
        const cart = await Cart.findOneAndRemove({orderdBy:user._id})
        res.json(cart)
    } catch (error) {
        console.log(error)
    }
}

const saveAddress = async (req,res) => {
    try {
        const {address} = req.body
        const user = await User.findOneAndUpdate({email:req.user.email},{address})
        res.json({ok:true})
    } catch (error) {
        console.log(error.message)
    }
}

const applyCoupon = async (req,res) => {
    try {
        const {coupon} = req.body
        const couponExists = await Coupon.findOne({name:coupon})
        if(!couponExists){
            return res.json({
                success:false,
                message:'coupon does not exists'
            })
        }
        const user = await User.findOne({email:req.user.email})
        const {products,cartTotal} = await Cart.findOne({orderdBy:user._id}).populate('products.product', '_id title price')
        console.log('cart total',cartTotal)
        let totalAfterDiscount = (cartTotal - (cartTotal * couponExists.discount) / 100).toFixed(2)
        res.json({
            success:true,
            message:'coupon applied successfully',
            data:totalAfterDiscount
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createUser, currentUser, addToCart, getCart, emptyCart, saveAddress, applyCoupon
}