import api from "../api/api";

/**
 * Seller Service - All API calls for seller operations
 */
const sellerService = {
  /**
   * Get all sellers with pagination and search
   * @param {Object} params - { page, perPage, search }
   */
  getSellers: async ({ page = 1, perPage = 10, search = "" }) => {
    const { data } = await api.get(
      `/sellers-get?page=${page}&searchValue=${search}&perPage=${perPage}`,
      { withCredentials: true }
    );
    return data;
  },

  /**
   * Get sellers by status with pagination and search
   * @param {Object} params - { page, perPage, search, status }
   */
  getSellersByStatus: async ({
    page = 1,
    perPage = 10,
    search = "",
    status = "active",
  }) => {
    const { data } = await api.get(
      `/sellers-get-by-status?page=${page}&searchValue=${search}&perPage=${perPage}&status=${status}`,
      { withCredentials: true }
    );
    return data;
  },

  /**
   * Get single seller by ID
   * @param {string} id - Seller ID
   */
  getSeller: async (id) => {
    const { data } = await api.get(`/seller-get/${id}`, {
      withCredentials: true,
    });
    return data;
  },

  /**
   * Update seller status
   * @param {Object} params - { id, status }
   */
  updateSellerStatus: async ({ id, status }) => {
    const { data } = await api.put(
      `/seller-status-update/${id}`,
      { status },
      {
        withCredentials: true,
      }
    );
    return data;
  },
};

export default sellerService;
