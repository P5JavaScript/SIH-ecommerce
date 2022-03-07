const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sellerSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    EmailVerified: { type: Boolean, default: false },
    Password: {
      type: String,
      required: true,
    },
    Contact: {
      Number: { type: Number },
      Visibility: { type: Boolean, default: true },
      Verified: { type: Boolean, default: false },
    },
    Badges: [
      {
        type: String,
        default: "",
      },
    ],
    DateOfBirth: {
      type: String,
      default: "",
    },
    Points: { type: Number, default: 0 },
    Gender: { type: String, default: "" },
    Location: {
      Address: { type: String },
      City: { type: String },
      District: { type: String },
      State: { type: String },
      ZipCode: { type: String },
    },
    Name: {
      First: { type: String, required: true },
      Last: { type: String, required: true },
    },
    ProfileUrl: {
      type: String,
      default: "https://i.ibb.co/R74JSvc/ec-default.png",
    },
    UserName: { type: String, required: true },
    Verified: { type: Boolean, default: false },
    EmailVerifyToken: { type: String },
    SecurityActions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "PasswordReset" },
    ],
    Tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    Products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    Profit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

sellerSchema.methods.generateAuthToken = async function () {
  const seller = this;
  const token = jwt.sign({ _id: seller._id.toString() }, process.env.JWT_SECRET);
  await seller.save();
  return token;
};

sellerSchema.statics.findByCredentials = async (Email, password) => {
  const seller = await Seller.findOne({ Email });

  if (!seller) {
    throw new Error("Unable to find the seller");
  }
  const isMatch = await bcrypt.compare(password, seller.Password);

  if (!isMatch) {
    throw new Error("Incorrect Password");
  }
  return seller;
};

const Seller = mongoose.model("Seller", sellerSchema);
// mongoose.set("useFindAndModify", false);

module.exports = Seller;
