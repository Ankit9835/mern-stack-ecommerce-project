const Category = require('../models/category')
const Sub = require('../models/sub')
const slug = require('slugify')
const create = async (req,res) => {
    try {
        const {name} = req.body
        const category = await Category.create({
            name,
            slug: slug(name)
        })
        return res.json(category)
    } catch (error) {
        console.log(error)
        return res.json({
            err:error.code
        })
    }
}

const list = async (req,res) => {
    try {
        const categories = await Category.find({})
        return res.status(200).json({
            message:'category fetched',
            categories
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}

const read = async (req,res) => {
    try {
        const categories = await Category.findOne({slug: req.params.slug})
        if(categories){
            return res.status(200).json({
                message:'category fetched',
                categories
            })
        } else {
            return res.status(200).json({
                message:'category not there with a given slug',
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}

const update = async (req,res) => {
    try {
        const {name} = req.body
        const categories = await Category.findOneAndUpdate({slug:req.params.slug}, {name, slug:slug(name)}, {new:true})
        return res.status(200).json({
            message:'category updated',
            categories
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: error.message,
        })
    }
}

const remove = async (req,res) => {
    try {
        const category = await Category.findOneAndDelete({slug:req.params.slug})
        return res.status(200).json({
            message:'category deleted',
            category
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}

const subCategory = async (req,res) => {
    try {
        const subcategory = await Sub.find({parent:req.params._id})
        return res.status(200).json({
            subcategory
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            err:error.message
        })
    }
}

module.exports = {create,list,read,update,remove,subCategory}