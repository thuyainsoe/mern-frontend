import React from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const ActionButtons = ({
  onView,
  onEdit,
  onDelete,
  viewLink,
  editLink,
  canView = true,
  canEdit = true,
  canDelete = true,
  size = "sm",
}) => {
  // Size variants
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-7 h-7 text-sm",
    lg: "w-8 h-8 text-base",
  };

  const buttonClass = `${sizeClasses[size]} flex items-center justify-center rounded-md transition-all`;

  // View Button
  const ViewButton = () => {
    if (!canView) return null;

    if (viewLink) {
      return (
        <Link to={viewLink}>
          <div className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700 cursor-pointer`}>
            <FiEye />
          </div>
        </Link>
      );
    }

    return (
      <div
        className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700 cursor-pointer`}
        onClick={onView}
      >
        <FiEye />
      </div>
    );
  };

  // Edit Button
  const EditButton = () => {
    if (!canEdit) return null;

    if (editLink) {
      return (
        <Link to={editLink}>
          <div className={`${buttonClass} bg-slate-600 text-white hover:bg-slate-700 cursor-pointer`}>
            <FiEdit2 />
          </div>
        </Link>
      );
    }

    return (
      <div
        className={`${buttonClass} bg-slate-600 text-white hover:bg-slate-700 cursor-pointer`}
        onClick={onEdit}
      >
        <FiEdit2 />
      </div>
    );
  };

  // Delete Button
  const DeleteButton = () => {
    if (!canDelete) return null;

    return (
      <div
        className={`${buttonClass} bg-red-600 text-white hover:bg-red-700 cursor-pointer`}
        onClick={onDelete}
      >
        <FiTrash2 />
      </div>
    );
  };

  return (
    <div className="flex items-center gap-1">
      <ViewButton />
      <EditButton />
      <DeleteButton />
    </div>
  );
};

export default ActionButtons;
