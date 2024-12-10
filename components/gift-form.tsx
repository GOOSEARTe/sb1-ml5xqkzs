"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { GiftResults } from "./gift-results";
import { getGiftRecommendations } from "@/lib/api";
import { giftFormSchema, type GiftFormValues } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./ui/loading-spinner";
import { Card } from "./ui/card";

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
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Age</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter age" 
                      className="transition-all duration-300 hover:border-primary focus:border-primary focus:ring-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-all duration-300 hover:border-primary focus:border-primary">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-Binary</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Interests</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., reading, gaming, cooking"
                      className="transition-all duration-300 hover:border-primary focus:border-primary focus:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="occasion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Occasion</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="transition-all duration-300 hover:border-primary focus:border-primary">
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="graduation">Graduation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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