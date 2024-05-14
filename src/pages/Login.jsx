/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Link,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login.json";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { signIn, googleLogin, reload, setReload } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    await signIn(email, password)
      .then((result) => {
        axios.post(
          `${import.meta.env.VITE_SERVER}/jwt`,
          {
            email: result?.user?.email,
          },
          { withCredentials: true }
        );
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
        return setReload(!reload);
      })
      .catch((error) => {
        if (error.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Email or Password !",
          });
        }
      });
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        axios.post(
          `${import.meta.env.VITE_SERVER}/jwt`,
          {
            email: result?.user?.email,
          },
          { withCredentials: true }
        );
        Swal.fire({
          icon: "success",
          title: "Google Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Google Login Failed",
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Volunize Hub | Login</title>
      </Helmet>
      <div className="md:w-10/12 mx-auto mb-10 ">
        <div className="text-center " data-aos="fade-down">
          <h1 className="text-2xl md:text-4xl font-bold mb-1">Login</h1>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64  my-4 border-pink-500 border rounded "></hr>
            <div className="absolute px-4 -translate-x-1/2 bg-base-100 left-1/2 ">
              <svg
                className="w-2 h-2 text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 14"
              >
                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="md:flex font-poppins">
          <div className="md:w-1/2">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
          <div className="w-full max-w-md mx-auto p-8 space-y-3 rounded-xl md:w-1/2">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="space-y-1 text-sm">
                <label className="block ">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="input w-full text-gray-800 border-pink-500  border "
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <div className="flex items-center relative">
                  <span
                    className="cursor-pointer absolute right-4"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="input w-full  border-pink-500  border "
                  />
                </div>
              </div>
              <button className="block w-full p-3 text-center rounded-sm bg-pink-500 text-white">
                Login
              </button>
            </form>
            <div className="flex items-center w-full my-4">
              <hr className="w-full text-pink-500" />
              <p className="px-3 text-pink-500">OR</p>
              <hr className="w-full text-pink-500" />
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleGoogleLogin}
                aria-label="Login with Google"
                type="button"
                className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-pink-500 hover:bg-pink-500 hove:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
                <p>Login with Google</p>
              </button>
            </div>
            <p className="text-xs text-center sm:px-6 text-gray-600">
              Don't have an account?
              <Link
                to={"/register"}
                className="underline text-pink-500 text-lg font-bold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <ScrollRestoration />
      </div>
    </>
  );
};

export default Login;
