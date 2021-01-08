const Category = require("../models/category");
const slugify = require("slugify");

exports.create = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create category failed");
  }
  //
};

exports.list = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
    if (categories) {
      res.json(categories);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("No categories found");
  }
};

exports.read = async (req, res) => {
  const { slug } = req.params;
  const category = await Category.findOne({ slug }).exec();

  if (category) {
    res.json(category);
  } else {
    res.status(404).send("Category not found");
  }
};

exports.update = async (req, res) => {
  const { slug } = req.params;
  const { name } = req.body;

  try {
    const categoryUpdated = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    ).exec();
    res.json(categoryUpdated);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create update failed");
  }
};

exports.remove = async (req, res) => {
  const { slug } = req.params;

  try {
    const categoryDeleted = await Category.findOneAndDelete({ slug }).exec();
    res.json(categoryDeleted);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create delete failed");
  }
};
