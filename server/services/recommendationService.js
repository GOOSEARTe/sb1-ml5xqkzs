const { products } = require('../data/products');

function getInterestTags(interests) {
  return interests.toLowerCase().split(',').map(i => i.trim());
}

function calculateGiftScore(product, userInput) {
  let score = 0;
  const interestTags = getInterestTags(userInput.interests);
  
  // Match by interests/tags
  product.tags.forEach(tag => {
    if (interestTags.some(interest => tag.includes(interest) || interest.includes(tag))) {
      score += 3;
    }
  });

  // Age-based scoring
  const age = parseInt(userInput.age);
  if (age < 18 && product.price > 300) score -= 2;
  if (age > 50 && product.category === 'Technology') score -= 1;
  if (age < 12 && product.category === 'Electronics') score -= 2;

  // Occasion-based scoring
  switch (userInput.occasion.toLowerCase()) {
    case 'wedding':
      if (product.price > 100) score += 2;
      if (product.category === 'Home & Garden') score += 2;
      break;
    case 'birthday':
      if (product.category === 'Games' || product.category === 'Electronics') score += 1;
      break;
    case 'graduation':
      if (product.category === 'Electronics' || product.category === 'Education') score += 2;
      break;
    case 'holiday':
      if (product.price < 100) score += 1;
      break;
  }

  return score;
}

async function getRecommendations(userInput) {
  try {
    // Score all products based on user input
    const scoredProducts = products.map(product => ({
      ...product,
      score: calculateGiftScore(product, userInput)
    }));

    // Sort by score and get top 3
    const recommendations = scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ score, tags, ...product }) => ({
        ...product,
        image: `https://source.unsplash.com/800x600/?${encodeURIComponent(product.category)}`,
        buyUrl: `https://amazon.com/s?k=${encodeURIComponent(product.name)}`
      }));

    return recommendations;
  } catch (error) {
    console.error('Recommendation error:', error);
    throw new Error('Failed to generate recommendations');
  }
}

module.exports = {
  getRecommendations
};