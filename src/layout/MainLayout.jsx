import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";

// Route title mapping
const routeTitles = {
  // Admin Routes
  "/admin/dashboard": "Admin Dashboard",
  "/admin/dashboard/orders": "Orders",
  "/admin/dashboard/category": "Categories",
  "/admin/dashboard/sellers": "Sellers",
  "/admin/dashboard/payment-request": "Payment Requests",
  "/admin/dashboard/deactive-sellers": "Deactive Sellers",
  "/admin/dashboard/seller-request": "Seller Requests",
  "/admin/dashboard/chat-seller": "Chat with Sellers",

  // Seller Routes
  "/seller/dashboard": "Seller Dashboard",
  "/seller/dashboard/add-product": "Add Product",
  "/seller/dashboard/products": "Products",
  "/seller/dashboard/discount-product": "Discount Products",
  "/seller/dashboard/orders": "Orders",
  "/seller/dashboard/payments": "Payments",
  "/seller/dashboard/chat-customer": "Chat with Customers",
  "/seller/dashboard/chat-support": "Chat Support",
  "/seller/dashboard/profile": "Profile",
  "/seller/account-pending": "Account Pending",
  "/seller/account-deactive": "Account Deactive",
};

// Function to get title from path
const getTitleFromPath = (pathname) => {
  // Check for exact match
  if (routeTitles[pathname]) {
    return routeTitles[pathname];
  }

  // Check for dynamic routes
  if (pathname.includes("/seller/dashboard/products/")) {
    return "Edit Product";
  }
  if (pathname.includes("/seller/dashboard/product/detail/")) {
    return "Product Details";
  }
  if (pathname.includes("/seller/dashboard/order/details/")) {
    return "Order Details";
  }
  if (pathname.includes("/admin/dashboard/order/details/")) {
    return "Order Details";
  }
  if (pathname.includes("/admin/dashboard/seller-request/")) {
    return "Seller Request Details";
  }

  return "Dashboard";
};

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const [currentTitle, setCurrentTitle] = useState("Dashboard");

  useEffect(() => {
    const title = getTitleFromPath(location.pathname);
    setCurrentTitle(title);
  }, [location.pathname]);

  // Set document title
  useDocumentTitle(currentTitle);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="ml-0 lg:ml-[260px] pt-[70px] transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
