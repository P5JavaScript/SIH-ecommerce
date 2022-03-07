const jwt = require("jsonwebtoken");
const Customer = require("../models/customers");
const Seller = require("../models/sellers");

const getAuthenticatedCustomer = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const customer = await Customer.findById(decoded._id);
  if (!customer) {
    throw new Error("Unauthorized");
  }
  return customer;
};

const getAuthenticatedSeller = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const seller = await Seller.findById(decoded._id);
  if (!seller) {
    throw new Error("Unauthorized");
  }
  return seller;
};

const authCustomer = async (req, res, next) => {
  try {
    const Authorization = req.header("Authorization");
    if (!Authorization) {
      res.status(401).send({ error: "Auth-key Not found" });
    }
    const token = Authorization.replace("Bearer ", "");
    req.token = token;
    req.user = await getAuthenticatedCustomer(token);
    next();
    return;
  } catch (e) {
    return res
      .status(401)
      .send({ error: "Please authenticate", message: e.message });
  }
};

const authSeller = async (req, res, next) => {
  try {
    const Authorization = req.header("Authorization");
    if (!Authorization) {
      res.status(401).send({ error: "Auth-key Not found" });
    }
    const token = Authorization.replace("Bearer ", "");
    req.token = token;
    req.user = await getAuthenticatedSeller(token);
    next();
    return;
  } catch (e) {
    return res
      .status(401)
      .send({ error: "Please authenticate", message: e.message });
  }
};

module.exports = {
  authCustomer,
  authSeller,
};
