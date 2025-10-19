import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";
import FormFieldsGenerator from "../../components/Form/FormFieldsGenerator";
import { AddProductFormSchema } from "../../schemas/product/addProductSchema";
import { AddProductFieldsSchema } from "../../schemas/product/addProductFieldsSchema";

// Mock categories data
const mockCategories = [
  { _id: "1", name: "Electronics" },
  { _id: "2", name: "Clothing" },
  { _id: "3", name: "Home & Garden" },
  { _id: "4", name: "Sports & Outdoors" },
  { _id: "5", name: "Books" },
  { _id: "6", name: "Toys & Games" },
  { _id: "7", name: "Beauty & Health" },
  { _id: "8", name: "Automotive" },
];

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  // Convert mock categories to select options format
  const categoryOptions = useMemo(() => {
    return mockCategories.map((cat) => ({
      label: cat.name,
      value: cat.name,
    }));
  }, []);

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
    const filterImage = images.filter((img, index) => index !== i);
    const filterImageUrl = imageShow.filter((img, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageUrl);
  };

  const onSubmit = (data) => {
    // TODO: Replace with Redux dispatch when ready
    console.log("Product Data:", {
      ...data,
      images: images.length,
    });

    // Simulate success
    toast.success("Product added successfully! (UI Only)");

    // Reset form
    methods.reset();
    setImageShow([]);
    setImages([]);
  };

  return (
    <div className="p-3">
      <div className="bg-white rounded-md shadow-lg p-6">
        <div className="flex justify-between items-center pb-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">Add Product</h1>
          <Link
            to="/seller/dashboard/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all font-medium"
          >
            <FiArrowLeft className="text-sm" />
            <span>All Products</span>
          </Link>
        </div>

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
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-2.5 font-medium transition-all min-w-[200px]"
              >
                Add Product
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddProduct;
