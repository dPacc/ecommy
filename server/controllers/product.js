const Product = require("../models/product");
const User = require("../models/user");
const slugify = require("slugify");
const { aggregate } = require("../models/product");

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

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  const user = await User.findOne({ email: req.user.email });
  const { star } = req.body;

  // check if the user is logged in and already added rating to product
  const existingRatingObject = product.ratings.find(
    (elem) => elem.postedBy.toString() === user._id.toString()
  );

  // if previous user rating is not present, update the product rating array with user rating
  if (existingRatingObject === undefined) {
    const ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subcategories")
    .populate("postedBy")
    .exec();

  res.json(related);
};

// Search / Filter

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subcategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subcategories", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subcategories", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleStars = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregate) => {
      if (err) {
        console.log("AGGREGATES ERROR", err);
      } else {
        Product.find({ _id: aggregate })
          .populate("category", "_id name")
          .populate("subcategories", "_id name")
          .populate("postedBy", "_id name")
          .exec((err, products) => {
            if (err) console.log("PRODUCT AGG ERROR", err);
            res.json(products);
          });
      }
    });
};

const handleSubcategories = async (req, res, subcategory) => {
  const products = await Product.find({ subcategories: subcategory })
    .populate("category", "_id name")
    .populate("subcategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subcategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subcategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subcategories", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

exports.searchFilters = async (req, res) => {
  const {
    query,
    price,
    category,
    stars,
    subcategory,
    brand,
    color,
    shipping,
  } = req.body;

  if (query) {
    console.log("QUERY ---->", query);
    await handleQuery(req, res, query);
  }

  // price --> array[20, 200]
  if (price !== undefined) {
    console.log("PRICE ---->", price);
    await handlePrice(req, res, price);
  }

  if (category) {
    console.log("CATEGORY ---->", category);
    await handleCategory(req, res, category);
  }

  if (stars) {
    console.log("STARS ----->", stars);
    await handleStars(req, res, stars);
  }

  if (subcategory) {
    console.log("SUBCATEGORY ----->", stars);
    await handleSubcategories(req, res, subcategory);
  }

  if (brand) {
    console.log("BRAND ----->", brand);
    await handleBrand(req, res, brand);
  }

  if (color) {
    console.log("COLOR ----->", color);
    await handleColor(req, res, color);
  }

  if (shipping) {
    console.log("SHIPPING ----->", shipping);
    await handleShipping(req, res, shipping);
  }
};
