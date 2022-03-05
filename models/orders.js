import mongoose from "mongoose";
const shippingSchema = {
  Address: { type: String, required: true },
  City: { type: String, required: true },
  PostalCode: { type: String, required: true },
  Country: { type: String, required: true },
};

const paymentSchema = {
  paymentMethod: { type: String, required: true },
};

const orderItemSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Image: { type: String, required: true },
  Price: { type: String, required: true },
  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema(
  {
    Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    OrderItems: [orderItemSchema],
    Shipping: shippingSchema,
    Payment: paymentSchema,
    ItemsPrice: { type: Number },
    TaxPrice: { type: Number },
    ShippingPrice: { type: Number },
    TotalPrice: { type: Number },
    IsPaid: { type: Boolean, default: false },
    PaidAt: { type: Date },
    IsDelivered: { type: Boolean, default: false },
    DeliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
