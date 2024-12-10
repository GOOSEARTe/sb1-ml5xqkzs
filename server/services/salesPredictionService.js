function predictSales(productId) {
  // Simple prediction logic based on product ID
  const baseNumber = productId * 7;
  
  const prediction = {
    nextWeek: Math.floor(Math.random() * baseNumber + 50),
    nextMonth: Math.floor(Math.random() * baseNumber * 4 + 200),
    trend: Math.random() > 0.5 ? 'increasing' : 'decreasing'
  };

  return Promise.resolve(prediction);
}

module.exports = {
  predictSales
};