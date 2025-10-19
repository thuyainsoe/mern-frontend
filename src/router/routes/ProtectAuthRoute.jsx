import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectAuthRoute = ({ children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);

  // If user is already logged in, redirect them to their dashboard
  if (role && userInfo) {
    // Redirect based on user role
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === "seller") {
      // Check seller status and redirect accordingly
      if (userInfo.status === "pending") {
        return <Navigate to="/seller/account-pending" replace />;
      } else if (userInfo.status === "deactive") {
        return <Navigate to="/seller/account-deactive" replace />;
      } else {
        return <Navigate to="/seller/dashboard" replace />;
      }
    }
  }

  // User is not logged in, show the auth page (login/register)
  return <Suspense fallback={null}>{children}</Suspense>;
};

export default ProtectAuthRoute;
