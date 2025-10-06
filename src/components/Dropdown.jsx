import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  className = "",
  required = false,
  position = "auto", // "auto", "top", "bottom"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropPosition, setDropPosition] = useState("bottom");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate position when dropdown opens
  useEffect(() => {
    if (isOpen && position === "auto" && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // If more space above or not enough space below, open upward
      if (spaceAbove > spaceBelow && spaceBelow < 200) {
        setDropPosition("top");
      } else {
        setDropPosition("bottom");
      }
    } else if (position !== "auto") {
      setDropPosition(position);
    }
  }, [isOpen, position]);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;
    const selected = options.find(opt =>
      typeof opt === 'object' ? opt.value === value : opt === value
    );
    return selected
      ? (typeof selected === 'object' ? selected.label : selected)
      : placeholder;
  };

  const dropdownClasses = dropPosition === "top"
    ? "bottom-full mb-1"
    : "top-full mt-1";

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-slate-300 rounded-md text-sm text-slate-700 hover:bg-slate-50 transition-all outline-none flex items-center justify-between focus:border-blue-500"
      >
        <span className={!value ? "text-slate-400" : ""}>{getDisplayValue()}</span>
        <FiChevronDown
          className={`transition-transform text-slate-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className={`absolute ${dropdownClasses} left-0 right-0 bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden z-10 max-h-60 overflow-y-auto`}>
          {options.map((option, index) => {
            const optionValue = typeof option === 'object' ? option.value : option;
            const optionLabel = typeof option === 'object' ? option.label : option;
            const isSelected = value === optionValue;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(optionValue)}
                className={`w-full px-4 py-2 text-sm text-left hover:bg-slate-50 transition-colors ${
                  isSelected
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-slate-700"
                }`}
              >
                {optionLabel}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
