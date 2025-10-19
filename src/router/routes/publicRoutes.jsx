import { lazy } from "react";
import ProtectAuthRoute from "./ProtectAuthRoute";

const Login = lazy(() => import("../../views/auth/Login.jsx"));
const Register = lazy(() => import("../../views/auth/Register.jsx"));
const AdminLogin = lazy(() => import("../../views/auth/AdminLogin.jsx"));
const Home = lazy(() => import("../../views/Home.jsx"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized.jsx"));

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
    ability: ["admin", "seller"],
  },
  {
    path: "/login",
    element: (
      <ProtectAuthRoute>
        <Login />
      </ProtectAuthRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <ProtectAuthRoute>
        <Register />
      </ProtectAuthRoute>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <ProtectAuthRoute>
        <AdminLogin />
      </ProtectAuthRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
];

export default publicRoutes;
