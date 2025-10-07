import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { messageClear, seller_login } from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_login(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-md shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Please sign in to your account
          </p>

          <form onSubmit={submit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all"
                type="email"
                name="email"
                placeholder="Enter your email"
                id="email"
                required
                onChange={inputHandler}
                value={state.email}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 rounded-md outline-none text-slate-700 placeholder:text-slate-400 focus:border-blue-500 transition-all"
                type="password"
                name="password"
                placeholder="Enter your password"
                id="password"
                required
                onChange={inputHandler}
                value={state.password}
              />
            </div>

            <button
              disabled={loader ? true : false}
              className="w-full mb-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-md px-7 py-2.5 font-medium transition-all"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center text-sm text-slate-600 mb-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign Up
              </Link>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="px-3 text-sm text-slate-500">or</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                className="flex-1 h-10 flex items-center justify-center rounded-md bg-red-600 hover:bg-red-700 text-white transition-all"
              >
                <FaGoogle />
              </button>
              <button
                type="button"
                className="flex-1 h-10 flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all"
              >
                <FaFacebook />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
