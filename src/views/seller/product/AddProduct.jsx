import { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import FormFieldsGenerator from "../../../components/Form/FormFieldsGenerator";
import { AddProductFormSchema } from "../../../schemas/product/addProductSchema";
import { AddProductFieldsSchema } from "../../../schemas/product/addProductFieldsSchema";
import {
  useAddProduct,
  useGetProduct,
  useUpdateProduct,
  useDeleteProductImage,
} from "../../../hooks/useProduct";
import { useGetCategories } from "../../../hooks/useCategory";

const AddProduct = () => {
  const { productId } = useParams();
  const isEditMode = Boolean(productId);

  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Fetch categories from API
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetCategories({
      page: 1,
      perPage: 100, // Get all categories for dropdown
      search: "",
    });

  // Fetch product data if in edit mode
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
  } = useGetProduct(productId);

  // Add/Update product mutations
  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();
  const deleteProductImageMutation = useDeleteProductImage();

  // Convert categories to select options format
  const categoryOptions = useMemo(() => {
    if (!categoriesData?.categorys) return [];
    return categoriesData.categorys.map((cat) => ({
      label: cat.name,
      value: cat._id, // Use _id instead of name for the value
    }));
  }, [categoriesData]);

  // Form schema with category options
  const formSchema = useMemo(() => {
    return AddProductFieldsSchema({
      categoryOptions: categoryOptions,
    });
  }, [categoryOptions]);

  // Initialize react-hook-form with zod validation
  const methods = useForm({
    resolver: zodResolver(AddProductFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      stock: "",
      price: "",
      discount: "",
      description: "",
    },
  });

  // Populate form with product data in edit mode
  useEffect(() => {
    if (isEditMode && productData?.product) {
      const product = productData.product;

      // Set form values
      methods.reset({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category?._id || "",
        stock: product.stock || "",
        price: product.price || "",
        discount: product.discount || "",
        description: product.description || "",
      });

      // Set existing images
      if (product.images && product.images.length > 0) {
        setExistingImages(product.images);
        const imageUrls = product.images.map((url) => ({ url }));
        setImageShow(imageUrls);
      }
    }
  }, [isEditMode, productData, methods]);

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];

      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  };

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;

      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const imageToRemove = imageShow[i];

    // If it's an existing image (URL string), delete from server
    if (
      imageToRemove?.url &&
      typeof imageToRemove.url === "string" &&
      existingImages.includes(imageToRemove.url)
    ) {
      if (isEditMode && productId) {
        // Call API to delete image from server
        deleteProductImageMutation.mutate(
          {
            id: productId,
            imageUrl: imageToRemove.url,
          },
          {
            onSuccess: () => {
              // Remove from local state after successful deletion
              const updatedExistingImages = existingImages.filter(
                (url) => url !== imageToRemove.url
              );
              setExistingImages(updatedExistingImages);
              const filterImageUrl = imageShow.filter(
                (_, index) => index !== i
              );
              setImageShow(filterImageUrl);
            },
          }
        );
      }
    } else {
      // If it's a new image (File object), just remove from local state
      const newImageIndex = i - existingImages.length;
      if (newImageIndex >= 0) {
        const filterImage = images.filter(
          (_, index) => index !== newImageIndex
        );
        setImages(filterImage);
      }
      const filterImageUrl = imageShow.filter((_, index) => index !== i);
      setImageShow(filterImageUrl);
    }
  };

  const onSubmit = (data) => {
    // Validate images (at least one image - either existing or new)
    if (images.length === 0 && existingImages.length === 0) {
      toast.error("Please add at least one product image");
      return;
    }

    if (isEditMode) {
      // Update product
      updateProductMutation.mutate(
        {
          id: productId,
          name: data.name,
          brand: data.brand,
          category: data.category,
          stock: data.stock,
          price: data.price,
          discount: data.discount || 0,
          description: data.description,
          images: images.length > 0 ? images : undefined, // Only send new images if any
        },
        {
          onSuccess: () => {
            setImages([]);
          },
        }
      );
    } else {
      // Add new product
      addProductMutation.mutate(
        {
          name: data.name,
          brand: data.brand,
          category: data.category,
          stock: data.stock,
          price: data.price,
          discount: data.discount || 0,
          description: data.description,
          images: images,
        },
        {
          onSuccess: () => {
            // Reset form
            methods.reset();
            setImageShow([]);
            setImages([]);
          },
        }
      );
    }
  };

  // Show loading state while fetching product data in edit mode
  if (isEditMode && productLoading) {
    return (
      <div className="p-3">
        <div className="bg-white rounded-md shadow-lg p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-600">Loading product data...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if product not found
  if (isEditMode && productError) {
    return (
      <div className="p-3">
        <div className="bg-white rounded-md shadow-lg p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-red-600">
              Failed to load product. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="bg-white rounded-md shadow-lg p-6">
        <div className="flex justify-between items-center pb-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">
            {isEditMode ? "Edit Product" : "Add Product"}
          </h1>
          <Link
            to="/seller/dashboard/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all font-medium"
          >
            <FiArrowLeft className="text-sm" />
            <span>All Products</span>
          </Link>
        </div>

        {categoriesLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-600">Loading categories...</div>
          </div>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6">
              {/* Form Fields */}
              <FormFieldsGenerator formSchema={formSchema} />

              {/* Images */}
              <div className="mb-6 mt-4">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Product Images
                </label>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                  {imageShow.map((img, i) => (
                    <div key={i} className="h-[180px] relative group">
                      <label htmlFor={i} className="cursor-pointer">
                        <img
                          className="w-full h-full rounded-md object-cover border-2 border-slate-200 group-hover:border-blue-500 transition-all"
                          src={img.url}
                          alt=""
                        />
                      </label>
                      <input
                        onChange={(e) => changeImage(e.target.files[0], i)}
                        type="file"
                        id={i}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-all shadow-lg"
                      >
                        <IoMdCloseCircle size={20} />
                      </button>
                    </div>
                  ))}

                  <label
                    className="flex justify-center items-center flex-col h-[180px] cursor-pointer border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-md transition-all bg-slate-50 hover:bg-blue-50"
                    htmlFor="image"
                  >
                    <IoMdImages className="text-4xl text-slate-400 mb-2" />
                    <span className="text-sm text-slate-600 font-medium">
                      Select Images
                    </span>
                  </label>
                  <input
                    className="hidden"
                    onChange={imageHandle}
                    multiple
                    type="file"
                    id="image"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex">
                <button
                  type="submit"
                  disabled={
                    addProductMutation.isPending ||
                    updateProductMutation.isPending
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-2.5 font-medium transition-all min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditMode
                    ? updateProductMutation.isPending
                      ? "Updating Product..."
                      : "Update Product"
                    : addProductMutation.isPending
                    ? "Adding Product..."
                    : "Add Product"}
                </button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
