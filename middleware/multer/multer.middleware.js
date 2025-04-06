const multer = require("multer");
const cloudinary = require("../../utils/cloudinary.config");
const storage = multer.memoryStorage();
const bufferStream = require("../../utils/bufferStream");

const upload = multer({ storage });

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    bufferStream(buffer).pipe(uploadStream);
  });
}

module.exports = { uploadToCloudinary };
