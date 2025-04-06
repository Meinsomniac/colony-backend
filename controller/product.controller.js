const path = require("path");
const { Product } = require("../model/product.model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.status(200).json({
      status: true,
      product: products,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });
    res.status(200).json({ status: true, product });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

const addProduct = async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const product = await Product.create(body);
    res.status(200).json({
      status: true,
      message: "Product created successfully",
      product: product.toJSON(),
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
  //   console.log(path.extname(req.file.originalname));
  //   res.status(200).json({ success: true, body });
};

const editProduct = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const product = await Product.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id: id });
    res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      product: product.toJSON(),
    });
  } catch (err) {
    res.status(403).json({ success: false, message: err.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getSingleProduct,
  editProduct,
  deleteProduct,
};
