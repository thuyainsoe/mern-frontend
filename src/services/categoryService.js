import api from "../api/api";

/**
 * Category Service - All API calls for category operations
 */
const categoryService = {
  /**
   * Get all categories with pagination and search
   * @param {Object} params - { page, perPage, searchValue }
   */
  getCategories: async ({ page = 1, perPage = 10, search = "" }) => {
    const { data } = await api.get(
      `/category-get?page=${page}&searchValue=${search}&perPage=${perPage}`,
      { withCredentials: true }
    );
    return data;
  },

  /**
   * Add new category
   * @param {Object} categoryData - { name, image }
   */
  addCategory: async ({ name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    const { data } = await api.post("/category-add", formData, {
      withCredentials: true,
    });
    return data;
  },

  /**
   * Update existing category
   * @param {Object} params - { id, name, image }
   */
  updateCategory: async ({ id, name, image }) => {
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }
    const { data } = await api.put(`/category-update/${id}`, formData, {
      withCredentials: true,
    });
    return data;
  },

  /**
   * Delete category
   * @param {string} id - Category ID
   */
  deleteCategory: async (id) => {
    const { data } = await api.delete(`/category-delete/${id}`, {
      withCredentials: true,
    });
    return data;
  },
};

export default categoryService;
