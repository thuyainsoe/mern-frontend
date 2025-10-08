import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);

  // User not authenticated
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Route has no role requirement (public for authenticated users)
  if (!route.role) {
    // Special case: seller ability routes
    if (route.ability === "seller") {
      return <Suspense fallback={null}>{children}</Suspense>;
    }
    return null;
  }

  // User info not loaded yet
  if (!userInfo) {
    return null;
  }

  // Check if user has the required role
  if (userInfo.role !== route.role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Route requires specific status
  if (route.status) {
    if (route.status === userInfo.status) {
      return <Suspense fallback={null}>{children}</Suspense>;
    }

    // Status mismatch - redirect based on user status
    const redirectPath = userInfo.status === "pending"
      ? "/seller/account-pending"
      : "/seller/account-deactive";
    return <Navigate to={redirectPath} replace />;
  }

  // Route has visibility restrictions (allowed statuses)
  if (route.visibility) {
    const hasAccess = route.visibility.some((status) => status === userInfo.status);
    if (!hasAccess) {
      return <Navigate to="/seller/account-pending" replace />;
    }
  }

  // User is authorized
  return <Suspense fallback={null}>{children}</Suspense>;
};

export default ProtectRoute;
