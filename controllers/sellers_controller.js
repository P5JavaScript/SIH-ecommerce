const Seller = require("../models/sellers");
const bcrypt = require("bcrypt");
const { regex } = require("../utils/regex");

module.exports.signUp = async function (req, res){
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
    const isEmail = await Seller.countDocuments({
      Email: req.body.Email,
    });
    if (isEmail) res.json({ success: false, message: "Email already existed" });
    const isUsernamePresent = await Seller.countDocuments({
      UserName: req.body.UserName,
    });

    if (isUsernamePresent) {
      res.json({ success: false, message: "Username already Exist" });
    }

    const seller = Seller(req.body);
    const salt = await bcrypt.genSalt(10);
    seller.Password = await bcrypt.hash(seller.Password, salt);

    await seller.save();
    const token = await seller.generateAuthToken();
    return res.status(201).send({
      success: true,
      message: "Seller Sign Up successfully",
      seller,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

module.exports.signIn = async function (req, res) {
  try {
    const seller = await Seller.findByCredentials(
      req.body.Email,
      req.body.Password
    );
    if (seller) {
      const token = await seller.generateAuthToken();
      return res.send({
        success: true,
        message: "Seller Sign in successfully",
        token,
        seller,
      });
    } else {
      return res.send({
        success: false,
        message: "Seller Not found",
      });
    }
  } catch (e) {
    return res.send({ success: false, message: e.message });
  }
};
