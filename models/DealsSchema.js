const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dealsSchema = new Schema(
  {
    img: { type: String, required: true },
    title: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, required: true },
    vendor: { type: String, required: true },
    onlineAndOrStore: [String],
    url: { type: String, required: true },
    address: String,
    dealsCategory: String,
    priceBeforeDiscount: Number,
    priceAfterDiscount: Number,
    custom: String,
    startDate: Date,
    endDate: Date,
    likes: [String],
    submittedStatus: { type: String, default: "pending" },
    submittedBy: { type: String, required: true },
    moderatorComments: String,
  },
  { timestamps: true }
);

const Deals = mongoose.model("Deals", dealsSchema);

module.exports = Deals;
