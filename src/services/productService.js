import api from "../api/api";

/**
 * Product Service - All API calls for product operations
 */
const productService = {
  /**
   * Get all products with pagination and search
   * @param {Object} params - { page, perPage, search }
   */
  getProducts: async ({ page = 1, perPage = 10, search = "" }) => {
    const { data } = await api.get(
      `/product-get?page=${page}&searchValue=${search}&perPage=${perPage}`,
      { withCredentials: true }
    );
    return data;
  },

  /**
   * Get single product by ID
   * @param {string} id - Product ID
   */
  getProduct: async (id) => {
    const { data } = await api.get(`/product-get/${id}`, {
      withCredentials: true,
    });
    return data;
  },

  /**
   * Add new product
   * @param {Object} productData - { name, brand, category, stock, price, discount, description, images }
   */
  addProduct: async ({
    name,
    brand,
    category,
    stock,
    price,
    discount,
    description,
    images,
  }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("discount", discount || 0);
    formData.append("description", description);

    // Append multiple images
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const { data } = await api.post("/product-add", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  /**
   * Update existing product
   * @param {Object} params - { id, name, brand, category, stock, price, discount, description, images }
   */
  updateProduct: async ({
    id,
    name,
    brand,
    category,
    stock,
    price,
    discount,
    description,
    images,
  }) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("price", price);
    formData.append("discount", discount || 0);
    formData.append("description", description);

    // Append new images if provided
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    const { data } = await api.put(`/product-update/${id}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  },

  /**
   * Delete product
   * @param {string} id - Product ID
   */
  deleteProduct: async (id) => {
    const { data } = await api.delete(`/product-delete/${id}`, {
      withCredentials: true,
    });
    return data;
  },

  /**
   * Delete product image
   * @param {Object} params - { id, imageUrl }
   */
  deleteProductImage: async ({ id, imageUrl }) => {
    const { data } = await api.put(
      `/product-image-delete`,
      { id, imageUrl },
      {
        withCredentials: true,
      }
    );
    return data;
  },
};

export default productService;
