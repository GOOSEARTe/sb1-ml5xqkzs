"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { GiftResults } from "../gift-results";
import { getGiftRecommendations } from "@/lib/api";
import { giftFormSchema, type GiftFormValues } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Card } from "../ui/card";
import { FormFields } from "./form-fields";

export function GiftForm() {
  const [recommendations, setRecommendations] = useState<GiftRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<GiftFormValues>({
    resolver: zodResolver(giftFormSchema),
    defaultValues: {
      age: "",
      gender: "",
      interests: "",
      occasion: "",
    },
  });

  async function onSubmit(values: GiftFormValues) {
    try {
      setLoading(true);
      const recommendations = await getGiftRecommendations(values);
      setRecommendations(recommendations);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormFields control={form.control} />
            <Button 
              type="submit" 
              className="w-full text-lg py-6 bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingSpinner className="mr-2" />
                  Finding perfect gifts...
                </>
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </form>
        </Form>
      </Card>

      {recommendations.length > 0 && (
        <GiftResults recommendations={recommendations} />
      )}
    </div>
  );
}