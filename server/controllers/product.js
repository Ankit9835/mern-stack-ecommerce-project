const Product = require("../models/product");
const slug = require("slugify");
const mongoose = require('mongoose');
const user = require("../models/user");

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
    console.log('read product',req.params.slug)
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
    console.log('request body',req.body)
    const {sort,order,page} = req.body
    const currentPage = page || 1
    const perPage = 3
    console.log(sort,order,page)
    const product = await Product.find({})
                    .skip((currentPage - 1) * perPage)
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
  console.log('product count',total)
  const products = await Product.find({})
  res.json({
    total,
    products
  });
}

const productStar = async (req,res) => {
  try {
    const {star} = req.body
    console.log('star',star)
    const products = await Product.findById(req.params.productId)
    const currentUser = await user.findOne({email:req.user.email})
    let existedRatingObject = products.ratings.find(
    (ele) => ele.postedBy.toString() === currentUser._id.toString()
  );
    console.log('existing rating',existedRatingObject)
    if(existedRatingObject === undefined){
     
      let ratingAdded = await Product.findByIdAndUpdate(
        products._id,
        {
          $push: { ratings: { star, postedBy: currentUser._id } },
        },
        { new: true }
      )
      res.json(ratingAdded)
    } else {
      const ratingUpdated = await Product.updateOne(
        {
          ratings: { $elemMatch: existedRatingObject },
        },
        { $set: { "ratings.$.star": star } },
        { new: true }
      );
      res.json(ratingUpdated)
    } 
  } catch (error) {
    return res.status(400).json({
      message:error.message,
      status:false,
    })
  }
}

const relatedProduct = async (req,res) => {
  try {
    const product = await Product.findById(req.params.productId)
    const related = await Product.find({_id:{$ne: product._id},category:product.category})
    .limit(3).populate('category')
    .populate('subs')
    res.json(related)
  } catch (error) {
    console.log(error.message)
  }
}

const searchFilter = async (req,res,query) => {
  const products = await Product.find({$text: {$search: query}})
  .populate('category', '_id name').populate('subs', '_id name')
  res.json(products)
}

const searchQuery = async (req,res) => {
  try {
    const {query} = req.body
    if(query){
      await searchFilter(req,res,query)
    }
  } catch (error) {
    
  }
}

module.exports = {
  create,
  listAllProducts,
  removedProduct,
  read,
  updateProduct,
  list,
  productCount,
  productStar,
  relatedProduct,
  searchQuery
};
