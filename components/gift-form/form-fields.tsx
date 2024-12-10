"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Control } from "react-hook-form";
import { type GiftFormValues } from "@/lib/schemas";

interface FormFieldsProps {
  control: Control<GiftFormValues>;
}

export function FormFields({ control }: FormFieldsProps) {
  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
        control={control}
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
    </>
  );
}