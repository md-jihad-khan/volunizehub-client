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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { createUser, updateUserProfile, reload, setReload } =
    useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    const email = e.target.email.value;
    const photoUrl = e.target.photourl.value;
    const password = e.target.password.value;

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must be at least 6 characters long",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (!uppercaseRegex.test(password)) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must contain at least one uppercase letter",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (!lowercaseRegex.test(password)) {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password must contain at least one lowercase letter",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      await createUser(email, password)
        .then((result) => {
          axios.post(
            `${import.meta.env.VITE_SERVER}/jwt`,
            {
              email: result?.user?.email,
            },
            { withCredentials: true }
          );
          updateUserProfile(name, photoUrl).then(() => {
            Swal.fire({
              icon: "success",
              title: "Registration Successful",
              showConfirmButton: false,
              timer: 1500,
            });
            setReload(!reload);
            navigate("/");
          });
        })
        .catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Email is already in use",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${error.message}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  return (
    <>
      <Helmet>
        <title>Volunize Hub | Register</title>
      </Helmet>
      <div className="md:w-10/12 mx-auto mb-10 ">
        <div className="text-center " data-aos="fade-down">
          <h1 className="text-2xl md:text-4xl font-bold mb-1">Register</h1>
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
        <div className="md:flex justify-center items-center font-poppins">
          <div className="md:w-1/2">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
          <div className="w-full max-w-md mx-auto p-8 space-y-3 rounded-xl md:w-1/2">
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="username" className="block">
                  Username
                </label>
                <input
                  required
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  className="w-full px-4 py-3 rounded-md input border-pink-500 border"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block ">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-md input border-pink-500 border"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label className="block ">Photo URL</label>
                <input
                  required
                  type="text"
                  name="photourl"
                  placeholder="Photo URL"
                  className="w-full px-4 py-3 rounded-md input border-pink-500 border"
                />
              </div>
              <div className="space-y-1 text-sm">
                <label htmlFor="password" className="block ">
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
                    required
                    id="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md input border-pink-500 border"
                  />
                </div>
              </div>
              <button
                className="block w-full p-3 text-center rounded-sm bg-pink-500 text-white"
                type="submit"
              >
                Register
              </button>
            </form>

            <p className="text-xs text-center sm:px-6 text-gray-600">
              Already have an account?
              <Link
                to={"/login"}
                className="underline text-pink-500 text-lg  font-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
        <ScrollRestoration />
      </div>
    </>
  );
};

export default Register;
