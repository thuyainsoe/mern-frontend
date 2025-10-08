import React, { useMemo, useState, useEffect, useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";
import DataTable from "../../components/DataTable";
import {
  BoldTextCell,
  TextCell,
  DateCell,
  AvatarCell,
} from "../../components/TableCells";
import ActionButtons from "../../components/ActionButtons";
import SideDrawer from "../../components/SideDrawer";
import FormFieldsGenerator from "../../components/Form/FormFieldsGenerator";
import { AddCategoryFormSchema } from "../../schemas/category/addCategorySchema";
import { AddCategoryFieldsSchema } from "../../schemas/category/addCategoryFieldsSchema";
import {
  useGetCategories,
  useAddCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../../hooks/useCategory";

const Categories = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const debounceTimerRef = useRef(null);

  // Memoize query params
  const queryParams = useMemo(() => {
    return {
      page: parseInt(searchParams.get("page")) || 1,
      perPage: parseInt(searchParams.get("perPage")) || 10,
      search: searchParams.get("search") || "",
    };
  }, [searchParams]);

  const { page, perPage, search } = queryParams;

  // Form schema
  const formSchema = useMemo(() => {
    return AddCategoryFieldsSchema();
  }, []);

  // TanStack Query hooks
  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useGetCategories(queryParams);

  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // Initialize react-hook-form with zod validation
  const methods = useForm({
    resolver: zodResolver(AddCategoryFormSchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  // Open drawer for adding new category
  const handleAddNew = () => {
    setEditingCategory(null);
    methods.reset({
      name: "",
      image: null,
    });
    setIsDrawerOpen(true);
  };

  // Open drawer for editing category
  const handleEdit = (category) => {
    setEditingCategory(category);
    methods.reset({
      name: category.name,
      image: null,
    });
    setIsDrawerOpen(true);
  };

  // Handle delete category
  const handleDelete = (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryMutation.mutate(categoryId);
    }
  };

  // Handle form submit
  const handleSubmit = async (data) => {
    if (editingCategory) {
      // Update existing category
      updateCategoryMutation.mutate(
        {
          id: editingCategory._id,
          name: data.name,
          image: data.image,
        },
        {
          onSuccess: () => {
            methods.reset();
            setIsDrawerOpen(false);
            setEditingCategory(null);
          },
        }
      );
    } else {
      // Add new category
      addCategoryMutation.mutate(
        {
          name: data.name,
          image: data.image,
        },
        {
          onSuccess: () => {
            methods.reset();
            setIsDrawerOpen(false);
          },
        }
      );
    }
  };

  // Handle drawer close
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setEditingCategory(null);
    methods.reset();
  };

  // Prepare data for table
  const data = useMemo(() => {
    return categoriesData?.categorys || [];
  }, [categoriesData]);

  // Define columns for the categories table
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Category Name",
        cell: (info) => {
          console.log(info, "info");
          return (
            <AvatarCell
              name={info.getValue()}
              image={info.row.original.image}
            />
          );
        },
      },
      {
        accessorKey: "slug",
        header: "Slug",
        cell: (info) => <TextCell value={info.getValue()} truncate={true} />,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: (info) => <DateCell value={info.getValue()} format="long" />,
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: (info) => <DateCell value={info.getValue()} format="long" />,
      },
      {
        id: "action",
        header: "Actions",
        meta: { sticky: true },
        cell: (info) => (
          <ActionButtons
            viewLink={`/admin/dashboard/category/details/${info.row.original._id}`}
            onEdit={() => handleEdit(info.row.original)}
            onDelete={() => handleDelete(info.row.original._id)}
            canView={false}
            canEdit={true}
            canDelete={true}
          />
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  // Debounced search handler
  const handleSearchChange = (value) => {
    setSearchInput(value);

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      setSearchParams({
        page: "1",
        perPage: perPage.toString(),
        search: value,
      });
    }, 500); // 500ms debounce delay
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handlePageChange = (newPage) => {
    setSearchParams({
      page: newPage.toString(),
      perPage: perPage.toString(),
      search: search,
    });
  };

  const handlePageSizeChange = (newSize) => {
    setSearchParams({
      page: "1",
      perPage: newSize.toString(),
      search: search,
    });
  };

  return (
    <div className="p-3">
      {isError ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-md shadow-lg">
          <div className="text-red-600">
            Failed to load categories. Please try again.
          </div>
        </div>
      ) : (
        <DataTable
          data={data}
          columns={columns}
          title="Categories Management"
          searchPlaceholder="Search by category ID, name..."
          pageSize={perPage}
          showPagination={true}
          showSearch={true}
          showAddNew={true}
          onAddNew={handleAddNew}
          handleSearchChange={handleSearchChange}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          pagination={categoriesData?.pagination}
          queryParams={{ ...queryParams, search: searchInput }}
          isLoading={isLoading}
        />
      )}

      {/* Side Drawer for Add/Edit Category */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        title={editingCategory ? "Edit Category" : "Add New Category"}
        onSubmit={methods.handleSubmit(handleSubmit)}
        submitLabel={editingCategory ? "Update" : "Create"}
        isLoading={
          addCategoryMutation.isPending || updateCategoryMutation.isPending
        }
        width="sm"
      >
        <FormProvider {...methods}>
          <form>
            <FormFieldsGenerator formSchema={formSchema} />
          </form>
        </FormProvider>
      </SideDrawer>
    </div>
  );
};

export default Categories;
