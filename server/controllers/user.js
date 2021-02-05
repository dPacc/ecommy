const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");

const uniqueid = require("uniqueid");

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // Check if cart with logged in user ID already exists
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    // get price for creating total instead of getting from client as it can be manipulated
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // Save to cart collection
  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  console.log("NEW CART", newCart);

  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;

  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();

  if (validCoupon === null) {
    return res.json({ err: "Invalid Coupon" });
  }

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  // Calculate total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  // update users cart with the discounted price
  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

// save order to database
exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email }).exec();

  const { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  // decrement quantity, increment sold from product
  const bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  // Bulk write
  let updated = await Product.bulkWrite(bulkOption, { new: true });
  console.log("PRODUCT QUANT DEC, SOLD UPD", updated);

  // console.log("NEW ORDER SAVED", newOrder);

  res.json({ ok: true });
};

// get user orders
exports.getUserOrders = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const orders = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  res.json(orders);
};

// wishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
    { new: true }
  ).exec();

  res.json({ added: true });
};

exports.wishlist = async (req, res) => {
  const allWishlist = await User.find({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(allWishlist);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } },
    { new: true }
  ).exec();

  res.json({ ok: true });
};

// save COD order to database
exports.createCashOrder = async (req, res) => {
  const { cod, couponApplied } = req.body;

  if (!cod)
    return res.status(400).send("Create COD Order Failed, Send COD Status");

  const user = await User.findOne({ email: req.user.email }).exec();

  const { products, cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  let payableAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    payableAmount = totalAfterDiscount * 100;
  } else {
    payableAmount = cartTotal * 100;
  }

  // Create payment intent
  let paymentIntent = {
    id: uniqueid(),
    amount: payableAmount,
    currency: "usd",
    status: "Cash on Delivery",
    created: Date.now(),
    payment_method_types: ["cash"],
  };

  // Create order with status of Cash on Delivery

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
    orderStatus: "Cash on Delivery",
  }).save();

  // decrement quantity, increment sold from product
  const bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  // Bulk write
  let updated = await Product.bulkWrite(bulkOption, { new: true });
  console.log("PRODUCT QUANT DEC, SOLD UPD", updated);

  // console.log("NEW ORDER SAVED", newOrder);

  res.json({ ok: true });
};
