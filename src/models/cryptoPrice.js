const mongoose = require("mongoose");

const cryptoPriceSchema = new mongoose.Schema({
  coinId: {
    type: String,
    required: true,
    enum: ["bitcoin", "matic-network", "ethereum"],
  },
  priceUsd: {
    type: Number,
    required: true,
  },
  marketCapUsd: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

cryptoPriceSchema.index({ coinId: 1, timestamp: -1 });

module.exports = mongoose.model("cryptoPrice", cryptoPriceSchema);
