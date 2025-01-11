const axios = require("axios");

class CoinGeckoService {
  constructor() {
    this.baseUrl = "https://api.coingecko.com/api/v3";
    this.apiKey = process.env.COIN_GECKO_API_KEY;
  }

  async getCoinData(coinId) {
    try {
      const url = `${this.baseUrl}/coins/markets?vs_currency=usd&ids=${coinId}&x_cg_demo_api_key=${this.apiKey}`;

      const response = await axios.get(url);

      const data = response.data[0];
      return {
        priceUsd: data.current_price,
        marketCapUsd: data.market_cap,
        change24h: data.price_change_percentage_24h,
      };
    } catch (error) {
      console.error(`Error fetching data for ${coinId}:`, error.message);
      throw error;
    }
  }
}

module.exports = new CoinGeckoService();
