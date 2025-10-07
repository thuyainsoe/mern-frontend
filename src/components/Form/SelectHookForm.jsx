import { useState, useRef, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";

const SelectHookForm = ({
  name,
  label,
  placeholder = "Select...",
  options = [],
  isRequired = false,
  isNotDisable = false,
  classNames = "",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const error = errors[name]?.message;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get display value from selected option
  const getDisplayValue = (value) => {
    if (!value) return "";
    const selectedOption = options.find((opt) => opt.value === value);
    return selectedOption ? selectedOption.label : "";
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
          <div className="relative w-full" ref={dropdownRef}>
            <button
              type="button"
              disabled={isNotDisable}
              onClick={() => !isNotDisable && setIsOpen(!isOpen)}
              className={`w-full px-3 py-2.5 border border-slate-300 outline-none text-slate-700 focus:border-blue-500 transition-colors flex items-center justify-between text-left ${
                isNotDisable
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-white text-slate-700"
              } ${error ? "border-red-600" : "border-slate-300"} ${classNames}`}
            >
              <span
                className={
                  field.value ? "text-slate-700" : "text-slate-400"
                }
              >
                {getDisplayValue(field.value) || placeholder}
              </span>
              <FiChevronDown
                className={`transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && !isNotDisable && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 shadow-lg z-10 max-h-[200px] overflow-y-auto">
                {options.length > 0 ? (
                  options.map((option) => (
                    <div
                      key={option.value}
                      className={`px-3 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors ${
                        field.value === option.value
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-slate-700"
                      }`}
                      onClick={() => {
                        field.onChange(option.value);
                        setIsOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2.5 text-slate-500 text-sm">
                    No options available
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      />
      {error && (
        <p className="text-red-600 min-w-full text-xs">* {error}</p>
      )}
    </div>
  );
};

export default SelectHookForm;
