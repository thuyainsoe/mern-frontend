import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IoMdImages, IoMdCloseCircle } from "react-icons/io";

const SingleImageHookForm = ({
  name,
  label,
  isNotDisable = false,
  isRequired = false,
  classNames = "",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [preview, setPreview] = useState(null);

  const error = errors[name]?.message;

  const handleImageChange = (file, onChange) => {
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      // Update form value
      onChange(file);
    }
  };

  const handleRemoveImage = (onChange) => {
    // Revoke preview URL to free memory
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="w-full flex flex-col gap-2 items-start h-full">
      {label && (
        <label className="text-sm font-semibold text-slate-700">
          {label}
          {isRequired && <span className="text-sm ml-1 text-red-600">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="w-full">
            {preview ? (
              <div className="relative w-full h-[200px] rounded-md border-2 border-slate-200 overflow-hidden group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                {!isNotDisable && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(onChange)}
                    className="absolute top-2 right-2 w-8 h-8  text-white rounded-full flex items-center justify-center transition-all shadow-lg"
                  >
                    <IoMdCloseCircle size={20} />
                  </button>
                )}
              </div>
            ) : (
              <label
                className={`flex justify-center items-center flex-col w-full h-[200px] cursor-pointer border-2 border-dashed rounded-md transition-all ${
                  isNotDisable
                    ? "bg-slate-100 border-slate-300 cursor-not-allowed"
                    : "border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50"
                } ${error ? "border-red-600" : ""} ${classNames}`}
                htmlFor={`image-${name}`}
              >
                <IoMdImages className="text-4xl text-slate-400 mb-2" />
                <span className="text-sm text-slate-600 font-medium">
                  {isNotDisable ? "Image upload disabled" : "Select Image"}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  Click to upload
                </span>
              </label>
            )}

            <input
              id={`image-${name}`}
              type="file"
              accept="image/*"
              disabled={isNotDisable}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageChange(file, onChange);
                }
              }}
              className="hidden"
            />
          </div>
        )}
      />

      {error && <p className="text-red-600 min-w-full text-xs">* {error}</p>}
    </div>
  );
};

export default SingleImageHookForm;
