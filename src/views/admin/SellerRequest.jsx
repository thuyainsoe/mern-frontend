import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable";
import { TextCell, DateCell, AvatarCell } from "../../components/TableCells";
import ActionButtons from "../../components/ActionButtons";
import { useGetSellers } from "../../hooks/useSeller";
import { useSearchParamsWithDebounce } from "../../hooks/useSearchParams";

const SellerRequests = () => {
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
    data: sellersData,
    isLoading,
    isError,
  } = useGetSellers(queryParams);

  // Prepare data for table
  const data = useMemo(() => {
    return sellersData?.sellers || [];
  }, [sellersData]);

  // Define columns for the seller requests table
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Applicant",
        cell: (info) => (
          <AvatarCell name={info.getValue()} image={info.row.original.image} />
        ),
      },
      {
        accessorKey: "shopInfo.shopName",
        header: "Proposed Store",
        cell: (info) => {
          const shopName =
            info.row.original.shopInfo?.shopName || "Not provided";
          return <TextCell value={shopName} />;
        },
      },
      {
        accessorKey: "email",
        header: "Contact Email",
        cell: (info) => <TextCell value={info.getValue()} />,
      },
      {
        accessorKey: "shopInfo.district",
        header: "District",
        cell: (info) => {
          const district = info.row.original.shopInfo?.district || "N/A";
          return <TextCell value={district} />;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Requested On",
        cell: (info) => <DateCell value={info.getValue()} format="long" />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          const statusColors = {
            pending: "bg-yellow-100 text-yellow-800",
            active: "bg-green-100 text-green-800",
            deactive: "bg-red-100 text-red-800",
          };
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                statusColors[status] || "bg-gray-100 text-gray-800"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          );
        },
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            viewLink={`/admin/dashboard/seller-request/${info.row.original._id}`}
            canView={true}
            canEdit={false}
            canDelete={false}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="p-3">
      {isError ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-md shadow-lg">
          <div className="text-red-600">
            Failed to load seller requests. Please try again.
          </div>
        </div>
      ) : (
        <DataTable
          data={data}
          columns={columns}
          title="Seller Requests"
          searchPlaceholder="Search by applicant, store name, email..."
          pageSize={perPage}
          showPagination={true}
          showSearch={true}
          showAddNew={false}
          handleSearchChange={handleSearchChange}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          pagination={sellersData?.pagination}
          queryParams={{ ...queryParams, search: searchInput }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default SellerRequests;
