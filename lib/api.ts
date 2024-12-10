import { GiftFormValues, GiftRecommendation } from "./schemas";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getGiftRecommendations(userInput: GiftFormValues): Promise<GiftRecommendation[]> {
  const response = await fetch(`${API_BASE_URL}/recommendations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  });

  if (!response.ok) {
    throw new Error('Failed to get recommendations');
  }

  return response.json();
}

export async function getSalesPrediction(productId: number) {
  const response = await fetch(`${API_BASE_URL}/sales/${productId}`);

  if (!response.ok) {
    throw new Error('Failed to get sales prediction');
  }

  return response.json();
}

export { type GiftRecommendation } from "./schemas";