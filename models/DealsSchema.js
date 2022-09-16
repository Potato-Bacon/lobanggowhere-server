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
    onlineAndOrStore: String,
    url: { type: String, required: true },
    address: String,
    dealscategory: String,
    priceBeforeDiscount: Number,
    priceAfterDiscount: Number,
    Customs: String,
    startDate: Date,
    endDate: Date,
    likes: { type: Number, min: 0 },
    submittedStatus: String,
    submittedBy: String,
    moderatorComments: String,
  },
  { timestamps: true }
);

const Deals = mongoose.model("Deals", dealsSchema);

module.exports = Deals;
