import React from "react";
import { Link } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

const UnAuthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-md shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <FiAlertTriangle className="text-red-600 text-4xl" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Access Denied
          </h1>

          {/* Error Code */}
          <p className="text-slate-500 text-sm mb-4">Error 403</p>

          {/* Message */}
          <p className="text-slate-600 mb-8 leading-relaxed">
            You don't have permission to access this page. Please contact your
            administrator if you believe this is a mistake.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              <FiArrowLeft className="text-lg" />
              <span>Go Back Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
            >
              <span>Go Back</span>
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Need help?{" "}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnAuthorized;
