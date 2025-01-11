const express = require("express");
const router = express.Router();
const CryptoPrice = require("../models/cryptoPrice");
const { calculateStandardDeviation } = require("../utils/statistics");

const validateCoin = (req, res, next) => {
  const validCoins = ["bitcoin", "matic-network", "ethereum"];
  const coin = req.query.coin;

  if (!coin) {
    return res.status(400).json({ error: "Coin parameter is required" });
  }

  if (!validCoins.includes(coin)) {
    return res.status(400).json({
      error: "Invalid coin. Must be one of: bitcoin, matic-network, ethereum",
    });
  }

  next();
};

router.get("/stats", validateCoin, async (req, res) => {
  try {
    const latestData = await CryptoPrice.findOne(
      { coinId: req.query.coin },
      { priceUsd: 1, marketCapUsd: 1, change24h: 1 }
    ).sort({ timestamp: -1 });

    if (!latestData) {
      return res
        .status(404)
        .json({ error: "No data found for the specified coin" });
    }

    res.json({
      price: latestData.priceUsd,
      marketCap: latestData.marketCapUsd,
      "24hChange": latestData.change24h,
    });
  } catch (error) {
    console.error("Error in /stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/deviation", validateCoin, async (req, res) => {
  try {
    const prices = await CryptoPrice.find(
      { coinId: req.query.coin },
      { priceUsd: 1 }
    )
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    const priceValues = prices.map((p) => p.priceUsd);
    const deviation = calculateStandardDeviation(priceValues);

    res.json({
      deviation: Number(deviation.toFixed(2)),
    });
  } catch (error) {
    console.error("Error in /deviation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
