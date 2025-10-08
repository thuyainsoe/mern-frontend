import React, { useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DataTable from "../../components/DataTable";
import {
  BoldTextCell,
  TextCell,
  StatusCell,
  DateCell,
  AvatarCell,
  BadgeCell,
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
  const [page, setPage] = useState(1);
  const [parPage, setParPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  // Form schema
  const formSchema = useMemo(() => {
    return AddCategoryFieldsSchema();
  }, []);

  // TanStack Query hooks
  const {
    data: categoriesData,
    isLoading,
    isError,
  } = useGetCategories({
    page,
    parPage,
    searchValue,
  });

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
        accessorKey: "_id",
        header: "Category ID",
        cell: (info) => <BoldTextCell value={info.getValue()} />,
      },
      {
        accessorKey: "name",
        header: "Category Name",
        cell: (info) => (
          <AvatarCell name={info.getValue()} image={info.row.original.image} />
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) => <TextCell value={info.getValue()} truncate={true} />,
      },
      {
        accessorKey: "productCount",
        header: "Products",
        cell: (info) => (
          <BadgeCell value={info.getValue()} variant="secondary" />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => <StatusCell value={info.getValue()} type="category" />,
      },
      {
        accessorKey: "created_at",
        header: "Date Created",
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
            canView={true}
            canEdit={true}
            canDelete={true}
          />
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  // // Show loading state
  // if (isLoading) {
  //   return (
  //     <div className="p-3 flex items-center justify-center h-64">
  //       <div className="text-slate-600">Loading categories...</div>
  //     </div>
  //   );
  // }

  // // Show error state
  // if (isError) {
  //   return (
  //     <div className="p-3 flex items-center justify-center h-64">
  //       <div className="text-red-600">Failed to load categories. Please try again.</div>
  //     </div>
  //   );
  // }

  return (
    <div className="p-3">
      <DataTable
        data={data}
        columns={columns}
        title="Categories Management"
        searchPlaceholder="Search by category ID, name..."
        pageSize={parPage}
        showPagination={true}
        showSearch={true}
        showAddNew={true}
        onAddNew={handleAddNew}
      />

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
