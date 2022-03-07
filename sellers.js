const express = require("express");
const bcrypt = require("bcrypt");
const Seller = require('../models/sellers');
const router = express.Router();

const {
    validateLogindata,
    validateSignupData,
} = require('../utils/validators')

module.exports.sign_up = async (req, res) => {
    try{
        const {errors, valid} = validateSignupData(req.body);
        if(!valid) res.status(403).json(errors);
        
        const isEmail = await Seller.countDocuments({
            Email : req.body.Email,
        });
        if(isEmail)
        res.json({success: false, message: "Email already existed"});
        const isUsernamePresent = await Seller.countDocuments({
            UserName : req.body.UserName,
        });

        if(isUsernamePresent){
            res.json({success: false, message: 'Username already Exist'});
        }

        const seller = Seller(req.body);
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);

        await seller.save();
        const token = await user.generateAuthToken();
        return res.status(201).send({
            success: true,
            message: "User Sign Up successfully",
            user,
            token,
        });
    }catch(err){
        console.log(err);
        return res.status(400).send(err.message);
    }
};

module.exports.sign_in = async (req,res) => {
    try{
        const seller = await Seller.findByCredentials(
            req.body.Email,
            req.body.Password
        );
        if(seller)
        {
            const token = await user.generateAuthToken();
            return res.send({
                success: true,
                message: "User Sign in successfully",
                token,
                user,
            });
        }else{
            return res.send({
                success: false,
                message: "user Not found",
            });
        }
    }catch(e){
        return res.send({success: false, message: e.message});
    }
};

module.exports = router;
