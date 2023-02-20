const Product = require('../models/product')
const slug = require('slugify')

const create = async (req,res) => {
    try {
        console.log(req.body)
        req.body.slug = slug(req.body.title)
        const product = await new Product(req.body).save()
        return res.status(200).json({
            message:'Product created successfully',
            product
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error.message,
        })
    }
}

const read = async (req,res) => {
    try {
        const products = await Product.find({})
        if(products.length > 0){
            return res.status(200).json(products)
        } else {
            return res.status(400).json({
                message:'No products available'
            })
        }
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            err:err.message
        })
    }
}

module.exports = {
    create,
    read
}