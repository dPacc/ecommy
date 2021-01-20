const Product = require("../models/product");
const slugify = require("slugify");

exports.read = async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug })
    .populate("category")
    .populate("subcategories")
    .exec();

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
};

exports.listAll = async (req, res) => {
  const { count } = req.params;

  try {
    const products = await Product.find({})
      .limit(parseInt(count))
      .populate("category")
      .populate("subcategories")
      .sort({ createdAt: -1 })
      .exec();
    if (products) {
      res.json(products);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("No products found");
  }
};

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const product = await new Product(req.body).save();
    res.json(product);
  } catch (error) {
    console.log(error);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { slug } = req.params;
  try {
    req.body.slug = slugify(req.body.title);
    const updatedProduct = await Product.findOneAndUpdate({ slug }, req.body, {
      new: true,
    }).exec();
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      err: error.message,
    });
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

// exports.list = async (req, res) => {
//   // sort: createdAt/updatedAt, order: desc/asc, limit: 3..
//   const { sort, order, limit } = req.body;

//   try {
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subcategories")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (error) {
//     console.log(error);
//     res.status(404).send("No products found");
//   }
// };

exports.list = async (req, res) => {
  // sort: createdAt/updatedAt, order: desc/asc, limit: 3..
  const { sort, order, page } = req.body;
  const currentPage = page || 1;
  const perPage = 3;

  try {
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subcategories")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send("No products found");
  }
};

exports.productsCount = async (req, res) => {
  const total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};
