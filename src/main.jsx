import { lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const App = lazy(() => import("./App.jsx"));

// Create a client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch on window focus
      retry: 1, // Retry failed requests once
      staleTime: 30000, // Data is fresh for 30 seconds
    },
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <App />
          <Toaster
            toastOptions={{
              position: "top-right",
              style: {
                background: "#283046",
                color: "white",
              },
            }}
          />
        </Suspense>
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
