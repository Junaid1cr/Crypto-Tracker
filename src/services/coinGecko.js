const axios = require("axios");

class CoinGeckoService {
  constructor() {
    this.baseUrl = "https://api.coingecko.com/api/v3";
  }

  async getCoinData(coinId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/simple/price?ids=${coinId}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
      );

      const data = response.data[coinId];
      return {
        priceUsd: data.usd,
        marketCapUsd: data.usd_market_cap,
        change24h: data.usd_24h_change,
      };
    } catch (error) {
      console.error(`Error fetching data for ${coinId}:`, error);
      throw error;
    }
  }
}

module.exports = new CoinGeckoService();
