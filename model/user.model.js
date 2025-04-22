const { default: mongoose } = require("mongoose");
const { hashPassword } = require("../utils/hashPassword");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    // age: {
    //   type: String,
    //   required: true,
    // },
    email: {
      type: String,
      required: true,
    },
    // username: {
    //   type: String,
    //   required: true,
    // },
    //   dateOfBirth: {
    //     type: String,
    //     required: true,
    //   },
    // address1: {
    //   type: String,
    //   required: true,
    // },
    // address2: {
    //   type: String,
    // },
    // city: {
    //   type: String,
    //   required: true,
    // },
    // state: {
    //   type: String,
    //   required: true,
    // },
    // country: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
    // contacts: {
    //   type: [Object],
    //   default: [],
    // },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;
