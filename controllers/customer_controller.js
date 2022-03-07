const Customer = require("../models/customers");
const bcrypt = require("bcrypt");
const {regex} = require('../utils/regex');

module.exports.signUp = async function (req, res) {
  try {
    if (!req.body.Name.First || !req.body.Name.Last) {
      return res.send({
        success: false,
        message: "First and Last name Required",
      });
    }

    if (!regex("username", req.body.UserName)) {
      return res.send({
        success: false,
        message: "Username is not Valid",
      });
    }

    if (!regex("email", req.body.Email)) {
      return res.send({
        success: false,
        message: "Email is not Valid",
      });
    }
    const isEmailPresent = await Customer.countDocuments({
      Email: req.body.Email,
    });
    if (isEmailPresent)
      res.json({ success: false, message: "Email already Registered" });
    const customer = new Customer(req.body);
    const salt = await bcrypt.genSalt(10);
    customer.Password = await bcrypt.hash(customer.Password, salt);
    await customer.save();
    const token = await customer.generateAuthToken();
    return res.json({
      success: true,
      message: "Customer SignUp Successfully",
      customer,
      token,
    });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

module.exports.signIn = async function (req, res) {
  try {
    const customer = await Customer.findByCredentials(
      req.body.Email,
      req.body.Password
    );
    if (customer) {
      const token = await customer.generateAuthToken();
      return res.send({
        success: true,
        message: "User Sign In Successfully",
        token,
        customer,
      });
    } else {
      return res.send({
        success: false,
        message: "User not exist",
      });
    }
  } catch (err) {
    console.log(err);
    return res.send({ success: false, message: err.message });
  }
};
