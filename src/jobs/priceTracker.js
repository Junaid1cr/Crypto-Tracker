const cron = require("node-cron");
const CryptoPrice = require("../models/cryptoPrice");
const coinGeckoService = require("../services/coinGecko");

const SUPPORTED_COINS = ["bitcoin", "matic-network", "ethereum"];

async function fetchAndStorePrices() {
  try {
    console.log("Starting price fetch job:", new Date().toISOString());

    for (const coinId of SUPPORTED_COINS) {
      try {
        
        const data = await coinGeckoService.getCoinData(coinId);

        
        await CryptoPrice.create({
          coinId,
          priceUsd: data.priceUsd,
          marketCapUsd: data.marketCapUsd,
          change24h: data.change24h,
        });

        console.log(`Successfully stored price data for ${coinId}`);
      } catch (error) {
        console.error(`Error processing ${coinId}:`, error.message);
        
        continue;
      }
    }

    console.log("Price fetch job completed:", new Date().toISOString());
  } catch (error) {
    console.error("Error in price tracking job:", error);
  }
}

function startPriceTracker() {
  
  cron.schedule("0 */2 * * *", fetchAndStorePrices);

  console.log("Price tracker job scheduled");

 
  fetchAndStorePrices();
}

module.exports = { startPriceTracker };
