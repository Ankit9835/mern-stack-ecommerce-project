const Coupon = require('../models/coupon')

const create = async (req,res) => {
    try {
        const {name,expiry,discount} = req.body
        if(!name || !expiry || !discount){
           return  res.json({
                error:'All Fields are required'
            })
        }

        const coupon = await Coupon.create({
            name,
            expiry,
            discount
        })

        return res.json({
            success:true,
            message:'Coupon created successfully',
            data:coupon
        })
    } catch (error) {
        console.log('error',error.code)
        console.log('errors',error)
        if(error.code == 11000){
            return res.json({
                success:false,
                message:`Same Value Not Allowed For ${error.keyValue.name}`
            })
        }
    }
}

const read = async (req,res) => {
    try {
        const coupon = await Coupon.findById(req.params.id)
        if(coupon.length < 1){
            return res.json({
                status:false,
                message:'No coupon found'
            })
        }
        return res.json({
            success:true,
            message:'Coupon fetched',
            data:coupon
        })
    } catch (error) {
        console.log(error)
    }
}


const list = async (req,res) => {
    try {
        const coupon = await Coupon.find()
        if(coupon.length < 1){
            return res.json({
                status:false,
                message:'No coupon found'
            })
        }
        return res.json({
            success:true,
            message:'Coupon fetched',
            data:coupon
        })
    } catch (error) {
        console.log(error)
    }
}

const remove = async (req,res) => {
    try {
        const coupon = await Coupon.findByIdAndRemove(req.params.id)
        if(!coupon){
            return res.json({
                status:false,
                message:'No coupon found'
            })
        }
        return res.json({
            success:true,
            message:'Coupon deleted',
            data:coupon
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {create,list,read,remove}