import * as z from "zod";

export const giftFormSchema = z.object({
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  interests: z.string().min(1, "Interests are required"),
  occasion: z.string().min(1, "Occasion is required"),
});

export type GiftFormValues = z.infer<typeof giftFormSchema>;

export interface GiftRecommendation {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  buyUrl: string;
  predictedSales?: {
    trend: 'increasing' | 'decreasing';
    nextWeek: number;
    nextMonth: number;
  };
}