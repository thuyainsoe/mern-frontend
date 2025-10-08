import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import categoryService from "../services/categoryService";

/**
 * Custom hook for fetching categories with pagination and search
 */
export const useGetCategories = (queryParams) => {
  return useQuery({
    queryKey: ["categories", queryParams],
    queryFn: () => categoryService.getCategories({ ...queryParams }),
    keepPreviousData: true, // Keep showing previous data while fetching new data
    staleTime: 30000, // Data is considered fresh for 30 seconds
  });
};

/**
 * Custom hook for adding a new category
 */
export const useAddCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.addCategory,
    onSuccess: (data) => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data.message || "Category added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Failed to add category";
      toast.error(errorMessage);
    },
  });
};

/**
 * Custom hook for updating a category
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.updateCategory,
    onSuccess: (data) => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data.message || "Category updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Failed to update category";
      toast.error(errorMessage);
    },
  });
};

/**
 * Custom hook for deleting a category
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryService.deleteCategory,
    onSuccess: (data) => {
      // Invalidate and refetch categories
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(data.message || "Category deleted successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete category";
      toast.error(errorMessage);
    },
  });
};
