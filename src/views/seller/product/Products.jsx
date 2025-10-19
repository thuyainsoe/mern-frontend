import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataTable";
import {
  TextCell,
  PriceCell,
  DateCell,
  AvatarCell,
} from "../../../components/TableCells";
import ActionButtons from "../../../components/ActionButtons";
import { useGetProducts, useDeleteProduct } from "../../../hooks/useProduct";
import { useSearchParamsWithDebounce } from "../../../hooks/useSearchParams";

const Products = () => {
  const navigate = useNavigate();

  // Use custom search params hook
  const {
    queryParams,
    searchInput,
    handleSearchChange,
    handlePageChange,
    handlePageSizeChange,
  } = useSearchParamsWithDebounce({
    page: 1,
    perPage: 10,
    search: "",
  });

  const { perPage } = queryParams;

  // TanStack Query hooks
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProducts(queryParams);

  const deleteProductMutation = useDeleteProduct();

  // Handle delete product
  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(productId);
    }
  };

  // Prepare data for table
  const data = useMemo(() => {
    return productsData?.products || [];
  }, [productsData]);

  // Define columns for the products table
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: (info) => {
          const images = info.row.original.images || [];
          const firstImage = images.length > 0 ? images[0] : null;
          return <AvatarCell name={info.getValue()} image={firstImage} />;
        },
      },
      {
        accessorKey: "brand",
        header: "Brand",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (info) => {
          const categoryName = info.row.original.category?.name || "N/A";
          return <TextCell value={categoryName} />;
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => <PriceCell value={info.getValue()} />,
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: (info) => {
          const stock = info.getValue();
          const stockClass = stock === 0 ? "text-red-600" : "";
          return (
            <span className={`font-semibold ${stockClass}`}>
              {stock === 0 ? "Out of Stock" : stock}
            </span>
          );
        },
      },
      {
        accessorKey: "discount",
        header: "Discount",
        cell: (info) => {
          const discount = info.getValue();
          return <TextCell value={discount ? `${discount}%` : "0%"} />;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Date Added",
        cell: (info) => <DateCell value={info.getValue()} format="long" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            viewLink={`/seller/dashboard/product/detail/${info.row.original._id}`}
            onEdit={() =>
              navigate(`/seller/dashboard/products/${info.row.original._id}`)
            }
            onDelete={() => handleDelete(info.row.original._id)}
            canView={true}
            canEdit={true}
            canDelete={true}
          />
        ),
      },
    ],
    [navigate, handleDelete]
  );

  return (
    <div className="p-3">
      {isError ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-md shadow-lg">
          <div className="text-red-600">
            Failed to load products. Please try again.
          </div>
        </div>
      ) : (
        <DataTable
          data={data}
          columns={columns}
          title="Products Management"
          searchPlaceholder="Search by product name, brand, description..."
          pageSize={perPage}
          showPagination={true}
          showSearch={true}
          showAddNew={true}
          onAddNew={() => {
            navigate(`/seller/dashboard/add-product`);
          }}
          handleSearchChange={handleSearchChange}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          pagination={productsData?.pagination}
          queryParams={{ ...queryParams, search: searchInput }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Products;
