const Coupon = require("../models/coupon");

// create, list, remove
exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    const newCoupon = await new Coupon({ name, expiry, discount }).save();
    res.json(newCoupon);
  } catch (error) {
    console.log(error);
  }
};

exports.remove = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (error) {
    console.log(error);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (error) {
    console.log(error);
  }
};
