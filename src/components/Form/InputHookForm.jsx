import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const InputHookForm = ({
  name,
  label,
  placeholder,
  isNotDisable = false,
  type = "text",
  classNames = "",
  isRequired = false,
  rows = 4,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  const error = errors[name]?.message;

  // Handle keydown for number inputs to prevent non-numeric characters
  const handleKeyDown = (e) => {
    if (type === "number") {
      // Prevent 'e', 'E', '+', '-' characters
      if (["e", "E", "+", "-"].includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  // Handle input to remove any non-numeric characters that might get pasted
  const handleInputChange = (e) => {
    if (type === "number") {
      // Remove any non-numeric characters including 'e', 'E', '+', '-'
      const sanitizedValue = e.target.value.replace(/[^0-9.]/g, "");
      // Prevent multiple decimal points
      const parts = sanitizedValue.split(".");
      const finalValue =
        parts.length > 2
          ? parts[0] + "." + parts.slice(1).join("")
          : sanitizedValue;

      const numericValue =
        finalValue === ""
          ? ""
          : isNaN(parseFloat(finalValue))
          ? ""
          : parseFloat(finalValue);
      return { value: finalValue, numericValue };
    }
    return { value: e.target.value, numericValue: e.target.value };
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
        render={({ field }) => (
          <div className="relative w-full">
            {type === "textarea" ? (
              <textarea
                {...field}
                disabled={isNotDisable}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                }}
                value={field.value || ""}
                placeholder={placeholder}
                rows={rows}
                className={`w-full px-3 py-2.5 border border-slate-300 outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors resize-none ${
                  isNotDisable
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-white text-slate-700"
                } ${
                  error ? "border-red-600" : "border-slate-300"
                } ${classNames}`}
              />
            ) : (
              <>
                <input
                  {...field}
                  type={
                    type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  step={type === "number" ? "any" : undefined}
                  disabled={isNotDisable}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    if (type === "number") {
                      const { value, numericValue } = handleInputChange(e);
                      field.onChange(numericValue);
                    } else {
                      const value = e.target.value;
                      field.onChange(value);
                    }
                  }}
                  value={type === "number" ? field.value ?? "" : field.value}
                  placeholder={placeholder}
                  className={`w-full px-3 py-2.5 border border-slate-300 outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-colors ${
                    isNotDisable
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-white text-slate-700"
                  } ${
                    error ? "border-red-600" : "border-slate-300"
                  } ${classNames} ${type === "password" ? "pr-10" : ""}`}
                />
                {/* Password show/hide icon */}
                {type === "password" && (
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 focus:outline-none"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      />
      {error && <p className="text-red-600 min-w-full text-xs">* {error}</p>}
    </div>
  );
};

export default InputHookForm;
