import api from "../api/api";

/**
 * Profile Service - All API calls for profile operations
 */
const profileService = {
  /**
   * Get seller profile
   */
  getProfile: async () => {
    const { data } = await api.get("/profile-get", {
      withCredentials: true,
    });
    return data;
  },

  /**
   * Upload profile image
   * @param {File} image - Profile image file
   */
  uploadProfileImage: async (image) => {
    const formData = new FormData();
    formData.append("image", image);

    const { data } = await api.post("/profile-image-upload", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  /**
   * Update shop information
   * @param {Object} shopInfo - Shop information
   */
  updateShopInfo: async (shopInfo) => {
    const { data } = await api.put("/shop-info-update", shopInfo, {
      withCredentials: true,
    });
    return data;
  },

  /**
   * Change password
   * @param {Object} passwordData - { email, old_password, new_password }
   */
  changePassword: async (passwordData) => {
    const { data } = await api.put("/change-password", passwordData, {
      withCredentials: true,
    });
    return data;
  },
};

export default profileService;
