import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import profileService from "../services/profileService";

/**
 * Custom hook for fetching seller profile
 */
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
    staleTime: 30000, // Data is considered fresh for 30 seconds
  });
};

/**
 * Custom hook for uploading profile image
 */
export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.uploadProfileImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(data.message || "Profile image updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Failed to upload profile image";
      toast.error(errorMessage);
    },
  });
};

/**
 * Custom hook for updating shop information
 */
export const useUpdateShopInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileService.updateShopInfo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(data.message || "Shop information updated successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Failed to update shop information";
      toast.error(errorMessage);
    },
  });
};

/**
 * Custom hook for changing password
 */
export const useChangePassword = () => {
  return useMutation({
    mutationFn: profileService.changePassword,
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully!");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error || "Failed to change password";
      toast.error(errorMessage);
    },
  });
};
