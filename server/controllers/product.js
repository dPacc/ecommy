const Product = require("../models/product");
const slugify = require("slugify");

exports.read = async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug }).exec();

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
};

exports.list = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 }).exec();
    if (products) {
      res.json(products);
      console.log(products);
    }
  } catch (error) {
    res.status(404).send("No products found");
  }
};

exports.create = async (req, res) => {
  const { title, description, price, category, subcategories } = req.body;

  try {
    const product = await new Product({
      title,
      slug: slugify(title),
      description,
      price,
      category,
      subcategories,
    }).save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create product failed");
  }
};

exports.update = async (req, res) => {
  const { slug } = req.params;
  const { title, description, price, category, subcategories } = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { slug },
      {
        title,
        slug: slugify(title),
        description,
        price,
        category,
        subcategories,
      }
    ).exec();
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Product update failed");
  }
};

exports.remove = async (req, res) => {
  const { slug } = req.params;

  try {
    const deleteProduct = await Product.findOneAndDelete({ slug }).exec();
    res.json(deleteProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Delete product failed");
  }
};
