import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import InputHookForm from "./InputHookForm";
import SelectHookForm from "./SelectHookForm";
import SingleImageHookForm from "./SingleImageHookForm";

const FormFieldsGenerator = ({ formSchema, className = "" }) => {
  const { control, watch } = useFormContext();

  // Function to check if field should be shown based on conditional logic and display property
  const shouldShowField = (field) => {
    // Check if field should be hidden based on display property
    if (field.display === "hidden") return false;

    // Check conditional logic if it exists
    if (!field.conditional) return true;

    const { field: watchField, value, operator } = field.conditional;
    let watchedValue = watch(watchField);

    switch (operator) {
      case "equals":
        return watchedValue === value;
      case "not_equals":
        return watchedValue !== value;
      case "contains":
        return Array.isArray(value)
          ? value?.includes(watchedValue)
          : value?.includes?.(watchedValue);
      case "greater_than":
        return Number(watchedValue) > Number(value);
      case "less_than":
        return Number(watchedValue) < Number(value);
      default:
        return true;
    }
  };

  return (
    <>
      {formSchema.map(
        (schema) =>
          schema?.fields?.length > 0 && (
            <div className={className} key={schema.sectionId}>
              <div className="w-full grid grid-cols-2 gap-5">
                {schema?.fields?.map((field) => {
                  // Check if field should be shown
                  if (!shouldShowField(field)) return null;

                  const containerClass = field.fullWidth
                    ? "col-span-2"
                    : "w-full lg:col-span-1 col-span-2";

                  switch (field.type) {
                    case "text":
                    case "number":
                    case "password":
                      return (
                        <div key={field.id} className={containerClass}>
                          <InputHookForm
                            type={field.type}
                            name={field.name}
                            label={field.label}
                            placeholder={field.placeholder || ""}
                            isRequired={field.required || false}
                            isNotDisable={field.disabled || false}
                          />
                        </div>
                      );

                    case "single-select":
                      return (
                        <div key={field.id} className={containerClass}>
                          <SelectHookForm
                            name={field.name}
                            label={field.label}
                            placeholder={field.placeholder || "Select..."}
                            options={field.options || []}
                            isRequired={field.required || false}
                            isNotDisable={field.disabled || false}
                          />
                        </div>
                      );

                    case "textarea":
                      return (
                        <div key={field.id} className={containerClass}>
                          <InputHookForm
                            type="textarea"
                            name={field.name}
                            label={field.label}
                            placeholder={field.placeholder || ""}
                            isRequired={field.required || false}
                            isNotDisable={field.disabled || false}
                            rows={field.rows || 4}
                          />
                        </div>
                      );

                    case "image":
                      return (
                        <div key={field.id} className={containerClass}>
                          <SingleImageHookForm
                            name={field.name}
                            label={field.label}
                            isRequired={field.required || false}
                            isNotDisable={field.disabled || false}
                          />
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          )
      )}
    </>
  );
};

export default FormFieldsGenerator;
