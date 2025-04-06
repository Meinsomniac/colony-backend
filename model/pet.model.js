const mongoose = require("mongoose");

const PetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["adopted", "available", "pending"],
  },
  tags: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  adoptionDate: {
    type: Date,
    required: true,
  },
});

const Pets = mongoose.model("pets", PetSchema);
module.exports = Pets;
