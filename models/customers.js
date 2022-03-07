const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const customerSchema = new mongoose.Schema(
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
    Verified: { type: Boolean, default: false },
    EmailVerifyToken: { type: String },
    // SecurityActions: [
    //   { type: mongoose.Schema.Types.ObjectId, ref: "PasswordReset" },
    // ],
    Tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    Carts:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
  },
  {
    timestamps: true,
  }
);

customerSchema.methods.generateAuthToken = async function () {
  const customer = this;
  const token = jwt.sign({ _id: customer._id.toString() }, process.env.JWT_SECRET);
  await customer.save();
  return token;
};

customerSchema.statics.findByCredentials = async (Email, password) => {
  const customer = await Customer.findOne({ Email });

  if (!customer) {
    throw new Error("Unable to find the customer");
  }
  const isMatch = await bcrypt.compare(password, customer.Password);

  if (!isMatch) {
    throw new Error("Incorrect Password");
  }
  return customer;
};

const Customer = mongoose.model("Customer", customerSchema);
// mongoose.set("useFindAndModify", false);
module.exports = Customer;
