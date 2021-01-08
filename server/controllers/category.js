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
exports.read = async (req, res) => {
  //
};
exports.update = async (req, res) => {
  //
};
exports.remove = async (req, res) => {
  //
};
exports.list = async (req, res) => {
  //
};
