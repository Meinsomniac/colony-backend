const multer = require("multer");
const path = require("path");
const fs = require("fs");

const folderPath = path.join(process.cwd(), "uploads");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!fs.existsSync(folderPath))
      fs.mkdirSync(folderPath, { recursive: true });
    callback(null, folderPath);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype.includes("image/")) callback(false, true);
    else callback(new Error("Only image files are allowed"), false);
  },
});

module.exports = { upload };
