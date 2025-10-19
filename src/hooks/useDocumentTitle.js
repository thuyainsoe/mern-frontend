import { useEffect } from "react";

/**
 * Custom hook to dynamically update document title
 * @param {string} title - The title to set
 * @param {boolean} keepSuffix - Whether to keep " - E-commerce" suffix (default: true)
 */
const useDocumentTitle = (title, keepSuffix = true) => {
  useEffect(() => {
    const suffix = keepSuffix ? " - E-commerce" : "";
    document.title = `${title}${suffix}`;

    // Cleanup - reset to default title on unmount
    return () => {
      document.title = "Dashboard - E-commerce";
    };
  }, [title, keepSuffix]);
};

export default useDocumentTitle;
