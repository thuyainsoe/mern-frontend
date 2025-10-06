import React from "react";
import { Link } from "react-router-dom";

// Text Cell - Basic text display
export const TextCell = ({ value, className = "" }) => (
  <span className={`text-slate-700 whitespace-nowrap ${className}`}>{value}</span>
);

// Bold Text Cell - For IDs, names, etc.
export const BoldTextCell = ({ value, prefix = "", className = "" }) => (
  <span className={`font-semibold text-slate-800 whitespace-nowrap ${className}`}>
    {prefix}
    {value}
  </span>
);

// Price Cell - For monetary values
export const PriceCell = ({ value, currency = "$", className = "" }) => (
  <span className={`text-slate-700 font-medium whitespace-nowrap ${className}`}>
    {currency}
    {typeof value === "number" ? value.toFixed(2) : value}
  </span>
);

// Date Cell - For formatted dates
export const DateCell = ({ value, format = "short", className = "" }) => {
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (format === "short") {
      return d.toLocaleDateString();
    } else if (format === "long") {
      return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    }
    return d.toLocaleDateString();
  };

  return (
    <span className={`text-slate-600 text-sm whitespace-nowrap ${className}`}>
      {formatDate(value)}
    </span>
  );
};

// Status Cell - For status badges
export const StatusCell = ({ value, type = "default", className = "" }) => {
  const getStatusStyles = () => {
    // Payment Status
    if (type === "payment") {
      if (value === "Paid") return "bg-green-50 text-green-700";
      if (value === "Pending") return "bg-orange-50 text-orange-700";
      if (value === "Failed") return "bg-red-50 text-red-700";
      if (value === "Refunded") return "bg-blue-50 text-blue-700";
    }

    // Delivery Status
    if (type === "delivery") {
      if (value === "Delivered") return "bg-green-50 text-green-700";
      if (value === "Shipped") return "bg-blue-50 text-blue-700";
      if (value === "Processing") return "bg-orange-50 text-orange-700";
      if (value === "Cancelled") return "bg-red-50 text-red-700";
    }

    // Generic Status
    if (value === "Active" || value === "Success" || value === "Approved")
      return "bg-green-50 text-green-700";
    if (value === "Inactive" || value === "Error" || value === "Rejected")
      return "bg-red-50 text-red-700";
    if (value === "Pending" || value === "Warning")
      return "bg-orange-50 text-orange-700";

    return "bg-slate-100 text-slate-700";
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${getStatusStyles()} ${className}`}
    >
      {value}
    </span>
  );
};

// Link Cell - For actionable links
export const LinkCell = ({ to, text, className = "" }) => (
  <Link
    to={to}
    className={`font-semibold text-indigo-600 hover:text-indigo-700 transition-colors whitespace-nowrap ${className}`}
  >
    {text}
  </Link>
);

// Button Cell - For action buttons
export const ButtonCell = ({
  onClick,
  text,
  variant = "primary",
  className = "",
}) => {
  const getVariantStyles = () => {
    if (variant === "primary")
      return "bg-indigo-600 text-white hover:bg-indigo-700";
    if (variant === "secondary")
      return "bg-slate-200 text-slate-700 hover:bg-slate-300";
    if (variant === "danger") return "bg-red-600 text-white hover:bg-red-700";
    return "bg-slate-200 text-slate-700 hover:bg-slate-300";
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${getVariantStyles()} ${className}`}
    >
      {text}
    </button>
  );
};

// Avatar Cell - Text only with initials
export const AvatarCell = ({ name, className = "" }) => {
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 min-w-8 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center font-semibold text-xs">
        {getInitials(name)}
      </div>
      <span className="text-slate-700 font-medium whitespace-nowrap">{name}</span>
    </div>
  );
};

// Badge Cell - For count badges
export const BadgeCell = ({ value, variant = "default", className = "" }) => {
  const getVariantStyles = () => {
    if (variant === "primary") return "bg-slate-200 text-slate-700";
    if (variant === "success") return "bg-green-50 text-green-700";
    if (variant === "warning") return "bg-orange-50 text-orange-700";
    if (variant === "danger") return "bg-red-50 text-red-700";
    return "bg-slate-200 text-slate-700";
  };

  return (
    <span
      className={`inline-flex items-center justify-center w-8 h-6 min-w-8 rounded-md text-xs font-semibold whitespace-nowrap ${getVariantStyles()} ${className}`}
    >
      {value}
    </span>
  );
};

// Boolean Cell - For yes/no, true/false
export const BooleanCell = ({ value, className = "" }) => (
  <span
    className={`inline-block px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
      value ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"
    } ${className}`}
  >
    {value ? "Yes" : "No"}
  </span>
);
