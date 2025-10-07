import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, messageClear } from "../../store/Reducers/authReducer";
import { PropagateLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loader, errorMessage, successMessage } = useSelector(
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
    dispatch(admin_login(state));
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigate("/");
    }
  }, [errorMessage, successMessage]);

  const overrideStyle = {
    dispatch: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItem: "center",
  };

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-md shadow-lg p-8">
          {/* Logo/Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-slate-800">Admin Login</h1>
            <p className="text-sm text-slate-600 mt-2">
              Sign in to access the admin dashboard
            </p>
          </div>

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
                placeholder="admin@example.com"
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
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-md px-7 py-2.5 font-medium transition-all"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
