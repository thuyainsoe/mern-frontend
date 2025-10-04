import { lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense>
      <App />
    </Suspense>
  </BrowserRouter>
);
