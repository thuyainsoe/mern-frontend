import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useGetProduct } from "../../../hooks/useProduct";

const ProductDetail = () => {
  const { productId } = useParams();

  const {
    data: productData,
    isLoading,
    isError,
  } = useGetProduct(productId);

  if (isLoading) {
    return (
      <div className="p-3">
        <div className="bg-white rounded-md shadow-lg p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-600">Loading product details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !productData?.product) {
    return (
      <div className="p-3">
        <div className="bg-white rounded-md shadow-lg p-6">
          <div className="flex items-center justify-center py-12">
            <div className="text-red-600">
              Failed to load product details. Please try again.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const product = productData.product;

  return (
    <div className="p-3">
      <div className="bg-white rounded-md shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center pb-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">Product Details</h1>
          <Link
            to="/seller/dashboard/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-all font-medium"
          >
            <FiArrowLeft className="text-sm" />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="mt-6">
          {/* Product Images */}
          {product.images && product.images.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">
                Product Images
              </h2>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="h-[200px] rounded-md overflow-hidden border-2 border-slate-200"
                  >
                    <img
                      src={image}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Information Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Product Name
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {product.name}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Brand
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {product.brand}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Category
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {product.category?.name || "N/A"}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Stock
                </label>
                <p
                  className={`text-base font-medium mt-1 ${
                    product.stock === 0 ? "text-red-600" : "text-slate-800"
                  }`}
                >
                  {product.stock === 0 ? "Out of Stock" : product.stock}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Price
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  ${product.price?.toFixed(2)}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Discount
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {product.discount ? `${product.discount}%` : "No discount"}
                </p>
              </div>

              {product.discount > 0 && (
                <div className="bg-slate-50 p-4 rounded-md">
                  <label className="text-xs font-semibold text-slate-500 uppercase">
                    Discounted Price
                  </label>
                  <p className="text-base font-medium text-green-600 mt-1">
                    $
                    {(
                      product.price -
                      (product.price * product.discount) / 100
                    ).toFixed(2)}
                  </p>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-md">
                <label className="text-xs font-semibold text-slate-500 uppercase">
                  Rating
                </label>
                <p className="text-base font-medium text-slate-800 mt-1">
                  {product.rating ? `${product.rating} / 5` : "No ratings yet"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <div className="bg-slate-50 p-4 rounded-md">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Description
              </label>
              <p className="text-base text-slate-700 mt-2 whitespace-pre-line">
                {product.description}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-50 p-4 rounded-md">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Product ID
              </label>
              <p className="text-sm font-mono text-slate-600 mt-1">
                {product._id}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-md">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Slug
              </label>
              <p className="text-sm text-slate-600 mt-1">{product.slug}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-md">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Created At
              </label>
              <p className="text-sm text-slate-600 mt-1">
                {new Date(product.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-md">
              <label className="text-xs font-semibold text-slate-500 uppercase">
                Last Updated
              </label>
              <p className="text-sm text-slate-600 mt-1">
                {new Date(product.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
            <Link
              to={`/seller/dashboard/products/${product._id}`}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-all"
            >
              Edit Product
            </Link>
            <Link
              to="/seller/dashboard/products"
              className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-medium transition-all"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
