import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

const SideDrawer = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  submitButtonClass = "bg-blue-600 hover:bg-blue-700",
  isLoading = false,
  width = "md", // sm, md, lg, xl
}) => {
  // Width variants
  const widthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-90  transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full ${widthClasses[width]} w-full bg-white shadow-2xl z-95 flex flex-col transform transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-all"
            aria-label="Close drawer"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 transition-all"
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white transition-all ${submitButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
