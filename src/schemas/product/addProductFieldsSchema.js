// AddProduct form fields schema
export const AddProductFieldsSchema = ({ categoryOptions = [] }) => {
  const fields = [
    {
      id: 1,
      type: "text",
      name: "name",
      label: "Product Name",
      fullWidth: false,
      placeholder: "Enter product name",
      required: true,
    },
    {
      id: 2,
      type: "text",
      name: "brand",
      label: "Product Brand",
      fullWidth: false,
      placeholder: "Enter brand name",
      required: true,
    },
    {
      id: 3,
      type: "single-select",
      name: "category",
      label: "Category",
      fullWidth: false,
      placeholder: "--Select Category--",
      required: true,
      options: categoryOptions,
    },
    {
      id: 4,
      type: "number",
      name: "stock",
      label: "Product Stock",
      fullWidth: false,
      placeholder: "Enter stock quantity",
      required: true,
    },
    {
      id: 5,
      type: "number",
      name: "price",
      label: "Price",
      fullWidth: false,
      placeholder: "Enter price",
      required: true,
    },
    {
      id: 6,
      type: "number",
      name: "discount",
      label: "Discount (%)",
      fullWidth: false,
      placeholder: "Enter discount percentage",
      required: false,
    },
    {
      id: 7,
      type: "textarea",
      name: "description",
      label: "Description",
      fullWidth: true,
      placeholder: "Enter product description",
      required: true,
      rows: 4,
    },
  ];

  return [
    {
      sectionId: 1,
      fields,
    },
  ];
};
