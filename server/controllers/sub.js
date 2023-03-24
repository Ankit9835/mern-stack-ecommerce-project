const Sub = require("../models/sub");
const slugify = require("slugify");
const Product = require('../models/product')

exports.create = async (req, res) => {
  try {
    const { name, subClass } = req.body;
    res.json(await new Sub({ name, slug: slugify(name), parent:subClass }).save());
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create sub failed");
  }
};

exports.list = async (req, res) => {
  try {
    const sub = await Sub.find({}).sort({createdAt: -1})
    const product = await Product.find({subs:sub})
    res.json({
      sub,
      product
    }) 
  } catch (error) {
    console.log(error.message)
  }
}
  

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  let product = await Product.find({subs:sub})
  res.json({
    sub,
    product
  });
};

exports.update = async (req, res) => {
  const { name,subClass } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parent:subClass },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Sub update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Sub delete failed");
  }
};
