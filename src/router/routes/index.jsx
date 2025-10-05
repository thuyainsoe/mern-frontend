import { lazy } from "react";
import { privateRoutes } from "./privateRoutes";

const MainLayout = lazy(() => import("../../layout/MainLayout"));

export const getRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: privateRoutes,
  };
};
