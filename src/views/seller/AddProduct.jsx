import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

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
  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState(mockCategories);
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let srcValue = mockCategories.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(srcValue);
    } else {
      setAllCategory(mockCategories);
    }
  };

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

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

  const add = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("price", state.price);
    formData.append("stock", state.stock);
    formData.append("category", category);
    formData.append("discount", state.discount);
    formData.append("shopName", "EasyShop");
    formData.append("brand", state.brand);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // TODO: Replace with Redux dispatch when ready
    console.log("Product Data:", {
      name: state.name,
      description: state.description,
      price: state.price,
      stock: state.stock,
      category: category,
      discount: state.discount,
      brand: state.brand,
      images: images.length,
    });

    // Simulate success
    toast.success("Product added successfully! (UI Only)");

    // Reset form
    setState({
      name: "",
      description: "",
      discount: "",
      price: "",
      brand: "",
      stock: "",
    });
    setImageShow([]);
    setImages([]);
    setCategory("");
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

        <form onSubmit={add} className="mt-6">
          {/* Name and Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Product Name
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all"
                onChange={inputHandle}
                value={state.name}
                type="text"
                name="name"
                id="name"
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Product Brand
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all"
                onChange={inputHandle}
                value={state.brand}
                type="text"
                name="brand"
                id="brand"
                placeholder="Enter brand name"
                required
              />
            </div>
          </div>

          {/* Category and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Category
              </label>
              <input
                readOnly
                onClick={() => setCateShow(!cateShow)}
                className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all cursor-pointer"
                value={category}
                type="text"
                id="category"
                placeholder="--Select Category--"
                required
              />

              {cateShow && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-md shadow-lg z-10">
                  <div className="p-3 border-b border-slate-200">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all"
                      type="text"
                      placeholder="Search category..."
                    />
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {allCategory.length > 0 ? (
                      allCategory.map((c, i) => (
                        <div
                          key={i}
                          className={`px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors ${
                            category === c.name
                              ? "bg-blue-50 text-blue-700 font-semibold"
                              : "text-slate-700"
                          }`}
                          onClick={() => {
                            setCateShow(false);
                            setCategory(c.name);
                            setSearchValue("");
                            setAllCategory(mockCategories);
                          }}
                        >
                          {c.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-slate-500 text-sm">
                        No categories found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="stock"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Product Stock
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all"
                onChange={inputHandle}
                value={state.stock}
                type="number"
                name="stock"
                id="stock"
                placeholder="Enter stock quantity"
                required
              />
            </div>
          </div>

          {/* Price and Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Price
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all"
                onChange={inputHandle}
                value={state.price}
                type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                required
              />
            </div>

            <div>
              <label
                htmlFor="discount"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Discount (%)
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all"
                onChange={inputHandle}
                value={state.discount}
                type="number"
                name="discount"
                id="discount"
                placeholder="Enter discount percentage"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-slate-700 mb-2"
            >
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all resize-none"
              onChange={inputHandle}
              value={state.description}
              name="description"
              id="description"
              placeholder="Enter product description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Images */}
          <div className="mb-6">
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
      </div>
    </div>
  );
};

export default AddProduct;
