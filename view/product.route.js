const express = require("express");
const {
  addProduct,
  getProducts,
  getSingleProduct,
  editProduct,
  deleteProduct,
} = require("../controller/product.controller");
const { upload } = require("../middleware/multer/multerLocal.middleware");
const router = express.Router();

router.get("/products", getProducts);
router.post("/products", addProduct);
router.get("/products/:id", getSingleProduct);
router.put("/products/:id", editProduct);
router.delete("/products/:id", deleteProduct);

// router.post("/products", upload.single("image"), addProduct);

module.exports = router;
