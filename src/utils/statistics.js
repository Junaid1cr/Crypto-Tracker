function calculateStandardDeviation(prices) {
  if (!prices || prices.length === 0) {
    return 0;
  }
  const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const squaredDiffs = prices.map((price) => Math.pow(price - mean, 2));
  const variance =
    squaredDiffs.reduce((sum, diff) => sum + diff, 0) / prices.length;

  return Math.sqrt(variance);
}

module.exports = { calculateStandardDeviation };
