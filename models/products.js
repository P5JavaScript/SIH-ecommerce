const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
      min: 0,
    },
    Stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    Catogories: [
      {
        type: String,
      },
    ],
    LikedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Likes: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Shares: {
    // 	type: Number,
    // 	default: 0,
    // },
    Images: [
      {
        type: String,
        min: 1,
        max: 6,
      },
    ],
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
    },
    Reviews: [
      {
        ReviewedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Customer",
        },
        Comment: {
          type: String,
        },
        Images: [
          {
            type: String,
            min: 1,
            max: 6,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Post", ProductSchema);

module.exports = Product;
