const Product = require("../models/products");
const Seller = require("../models/sellers");


module.exports.getAllProducts = async (req,res) => {
    try{
        const products = await Product.find().
        populate("CreatedBy", {
            UserName: 1,
            Name: 1,
            ProfileUrl: 1,
            _id: 1,
        })
        .sort({ createdAt: -1 });
        res.send({ success: true, products});

    }catch(error){
        res.send({
            success: false,
            error : error,
        });
        console.log(error);
    }
};
module.exports.createProduct = async function (req, res) {
  try {
    const user = await Seller.findById(req.user._id);
    if (user) {
      const data = req.body;
      const opt = {
        ...data,
        CreatedBy: req.user._id,
      };
      const newProduct = new Product(opt);
      const savedProduct = await newProduct.save();
      res.status(201).send({
        success: true,
        message: "Product created successfully",
        Product: savedProduct
        });
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden request" });
    }
  } catch (err) {
      console.log(err);
      res.json('hello')
  }
};



