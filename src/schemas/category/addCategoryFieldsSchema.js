// AddCategory form fields schema
export const AddCategoryFieldsSchema = () => {
  const fields = [
    {
      id: 1,
      type: "text",
      name: "name",
      label: "Category Name",
      fullWidth: true,
      placeholder: "Enter category name",
      required: true,
    },
    {
      id: 2,
      type: "image",
      name: "image",
      label: "Category Image",
      fullWidth: true,
      required: false,
    },
  ];

  return [
    {
      sectionId: 1,
      fields,
    },
  ];
};
