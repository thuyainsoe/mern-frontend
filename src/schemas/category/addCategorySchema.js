import { z } from "zod";

export const AddCategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "Category name is required",
    })
    .min(1, { message: "Category name cannot be empty" })
    .max(100, { message: "Category name cannot exceed 100 characters" }),

  image: z
    .any()
    .refine((file) => file instanceof File || file === null, {
      message: "Please upload a valid image file",
    })
    .optional()
    .nullable(),
});
