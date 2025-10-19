import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import productService from "../services/productService";

/**
 * Custom hook for fetching products with pagination and search
 */
export const useGetProducts = (queryParams) => {
  return useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => productService.getProducts({ ...queryParams }),
    keepPreviousData: true, // Keep showing previous data while fetching new data
    staleTime: 30000, // Data is considered fresh for 30 seconds
  });
};

/**
 * Custom hook for fetching a single product by ID
 */
export const useGetProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getProduct(id),
    enabled: !!id, // Only run query if id is provided
    staleTime: 30000,
  });
};

/**
 * Custom hook for adding a new product
 */
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.addProduct,
    onSuccess: (data) => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(data.message || "Product added successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Failed to add product";
      toast.error(errorMessage);
    },
  });
};

/**
 * Custom hook for updating a product
 */
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.updateProduct,
    onSuccess: (data) => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
      toast.success(data.message || "Product updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Failed to update product";
      toast.error(errorMessage);
    },
  });
};

/**
 * Custom hook for deleting a product
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: (data) => {
      // Invalidate and refetch products
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(data.message || "Product deleted successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to delete product";
      toast.error(errorMessage);
    },
  });
};

/**
 * Custom hook for deleting a product image
 */
export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.deleteProductImage,
    onSuccess: (data) => {
      // Invalidate and refetch product data
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(data.message || "Image removed successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Failed to remove image";
      toast.error(errorMessage);
    },
  });
};
