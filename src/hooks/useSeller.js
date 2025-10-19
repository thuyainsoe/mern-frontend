import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import sellerService from "../services/sellerService";

/**
 * Custom hook for fetching all sellers with pagination and search
 */
export const useGetSellers = (queryParams) => {
  return useQuery({
    queryKey: ["sellers", queryParams],
    queryFn: () => sellerService.getSellers({ ...queryParams }),
    keepPreviousData: true,
    staleTime: 30000,
  });
};

/**
 * Custom hook for fetching sellers by status with pagination and search
 */
export const useGetSellersByStatus = (queryParams) => {
  return useQuery({
    queryKey: ["sellers", "status", queryParams],
    queryFn: () => sellerService.getSellersByStatus({ ...queryParams }),
    keepPreviousData: true,
    staleTime: 30000,
  });
};

/**
 * Custom hook for fetching a single seller by ID
 */
export const useGetSeller = (id) => {
  return useQuery({
    queryKey: ["seller", id],
    queryFn: () => sellerService.getSeller(id),
    enabled: !!id,
    staleTime: 30000,
  });
};

/**
 * Custom hook for updating seller status
 */
export const useUpdateSellerStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sellerService.updateSellerStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["sellers"] });
      queryClient.invalidateQueries({ queryKey: ["seller"] });
      toast.success(data.message || "Seller status updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Failed to update seller status";
      toast.error(errorMessage);
    },
  });
};
