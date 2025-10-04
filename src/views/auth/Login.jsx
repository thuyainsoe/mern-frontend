import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <div className="min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center">
      <div className="w-[350px] text-white p-2">
        <div className="bg-[#6f68d1] p-4 rounded-md">
          <h2 className="text-xl mb-3 font-bold">Welcome to Ecommerce</h2>
          <p className="text-sm mb-3 font-medium">
            Please sign in your account.
          </p>
          <form>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="bg-transparent rounded-md px-3 outline-none py-2 border border-slate-700"
                type="text"
                name="email"
                placeholder="Email"
                id="email"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                className="bg-transparent rounded-md px-3 outline-none py-2 border border-slate-700"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>

            <button className="bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
              Sign In
            </button>
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Don't have an account ?{" "}
                <Link to="/register" className="font-bold">
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="w-full flex justify-center items-center mb-3 ">
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[1px]"></div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div
                className="w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-400/50 justify-center
              cursor-pointer items-center overflow-hidden"
              >
                <span>
                  <FaGoogle />
                </span>
              </div>
              <div
                className="w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-400/50 justify-center
              cursor-pointer items-center overflow-hidden"
              >
                <span>
                  <FaFacebook />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
