const Product = require("../models/product");
const slug = require("slugify");

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
      err: err.message,
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

module.exports = {
  create,
  listAllProducts,
  removedProduct,
  read
};
