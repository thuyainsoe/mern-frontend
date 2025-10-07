import { z } from "zod";

export const AddProductFormSchema = z.object({
  name: z
    .string({
      required_error: "Product name is required",
    })
    .min(1, { message: "Product name cannot be empty" }),

  brand: z
    .string({
      required_error: "Brand is required",
    })
    .min(1, { message: "Brand cannot be empty" }),

  category: z
    .string({
      required_error: "Category is required",
    })
    .min(1, { message: "Please select a category" }),

  stock: z
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .min(0, { message: "Stock cannot be negative" }),

  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0, { message: "Price must be greater than 0" }),

  discount: z
    .number({
      invalid_type_error: "Discount must be a number",
    })
    .min(0, { message: "Discount cannot be negative" })
    .max(100, { message: "Discount cannot exceed 100%" })
    .optional()
    .nullable(),

  description: z
    .string({
      required_error: "Description is required",
    })
    .min(10, { message: "Description must be at least 10 characters" }),
});
