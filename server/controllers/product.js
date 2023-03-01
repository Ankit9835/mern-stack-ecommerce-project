const Product = require("../models/product");
const slug = require("slugify");
const mongoose = require('mongoose')

const create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slug(req.body.title);
    const product = await new Product(req.body).save();
    return res.status(200).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const listAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(req.params.count)
      .populate("category")
      .populate("subs")
      .sort([["createdAt", "desc"]]);
      console.log('products',products)
    if (products.length > 0) {
      return res.status(200).json({
        success:true,
        products,
        message:'products fetched'
      });
    } else {
      return res.status(200).json({
        message: "No products available",
        success:false,
        products:[]
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      err: error.message,
    });
  }
};

const removedProduct = async (req,res) => {
    try {
      const product = await Product.findOneAndDelete({slug:req.params.slug})
      if(product){
        return res.status(200).json({
          message:'Product deleted successfully',
          success:true,
          data:product
        })
      } else {
        return res.status(200).json({
          message:'Something went wrong',
          success:false,
        })
      }
    } catch (error) {
      return res.status(400).json({
        message:error.message,
        success:false,
      })
    }
}
 const read =async (req,res) => {
  try {
    const product = await Product.findOne({slug:req.params.slug}).populate('category').populate('subs')
    
    if(product){
      return res.status(200).json({
        message:'product fetched',
        data:product,
        success:true
      })
    } else {
      return res.status(200).json({
        message:'something went wrong',
        data:{},
        success:false
      })
    }
  } catch (error) {
    return res.status(200).json({
      message: error.message,
      data:[],
      success:false
    })
  }
}

 const updateProduct = async (req,res) => {
  console.log('slug',req.params.slug)
  console.log('request',req.body)
  try {
    if (req.body.title) {
      req.body.slug = slug(req.body.title);
    }
    console.log('slug2',req.body.slug)
    const updated = await Product.findOneAndUpdate({slug:req.params.slug}, req.body, {new:true})
    if(!updated){
      return res.status(404).json({ msg: `No task with id :${req.params.slug}` });
    }
    res.json(updated);
  } catch (error) {
     return res.status(400).json({
      success:false,
      message:error.message
     })
  }
}

// const list =  async (req,res) => {
//   try {
//     const {sort,order,limit} = req.body
//     console.log(sort,order)
//     const product = await Product.find({}).populate('category')
//                     .populate('subs')
//                     .sort([[sort, order]])
//                     .limit(limit)
//                     console.log('best sellers',product)
//     return res.status(200).json({
//       success:true,
//       message:'new arrival fetched',
//       product
//     })
//   } catch (error) {
//     return res.status(400).json({
//       success:false,
//       message:error.message,
//     })
//   }
// }

const list =  async (req,res) => {
  try {
    const {sort,order,page} = req.body
    const currentPage = page || 1
    const perPage = 3
    console.log(sort,order,page)
    const product = await Product.find({})
                    .skip((currentPage - 1) * page)
                    .populate('category')
                    .populate('subs')
                    .sort([[sort, order]])
                    .limit(perPage)
                    console.log('best sellers',product)
    return res.status(200).json({
      success:true,
      message:'new arrival fetched',
      product
    })
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:error.message,
    })
  }
}

 const productCount = async (req,res) => {
  let total = await Product.find({}).estimatedDocumentCount()
  res.json(total);
}

module.exports = {
  create,
  listAllProducts,
  removedProduct,
  read,
  updateProduct,
  list,
  productCount
};
