"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { ExternalLink, TrendingDown, TrendingUp } from "lucide-react";
import { type GiftRecommendation } from "@/lib/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GiftResultsProps {
  recommendations: GiftRecommendation[];
}

export function GiftResults({ recommendations }: GiftResultsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
        Perfect Gift Suggestions
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {recommendations.map((gift) => (
          <Card 
            key={gift.id} 
            className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br from-background via-background to-secondary/10"
          >
            <div className="relative h-56 w-full">
              <Image
                src={gift.image}
                alt={gift.name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold gradient-text">
                  {gift.name}
                </CardTitle>
                {gift.predictedSales && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {gift.predictedSales.trend === 'increasing' ? (
                          <TrendingUp className="h-6 w-6 text-accent animate-pulse" />
                        ) : (
                          <TrendingDown className="h-6 w-6 text-destructive animate-pulse" />
                        )}
                      </TooltipTrigger>
                      <TooltipContent className="bg-card p-4 shadow-xl">
                        <p className="font-semibold">Sales Trend: {gift.predictedSales.trend}</p>
                        <p>Next week: {gift.predictedSales.nextWeek} units</p>
                        <p>Next month: {gift.predictedSales.nextMonth} units</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <CardDescription className="text-lg font-semibold">
                ${gift.price.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">{gift.description}</p>
              <p className="text-sm text-primary mt-4 font-medium">
                Category: {gift.category}
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300"
              >
                <a
                  href={gift.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg py-6"
                >
                  Buy Now
                  <ExternalLink className="h-5 w-5" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}