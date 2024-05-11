import { Link, NavLink, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleThemeChange = (e) => {
    if (e.target.checked) {
      document.querySelector("html").setAttribute("data-theme", "synthwave");
      setTheme("synthwave");
    } else {
      document.querySelector("html").setAttribute("data-theme", "light");
      setTheme("light");
    }
  };

  const handleLogout = () => {
    navigate("/");
    logOut();
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 border-b-2 rounded-none border-pink-500 font-bold"
              : "font-normal hover:gradient-text "
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-pink-500 border-b-2 rounded-none border-pink-500 font-bold"
              : "font-normal hover:gradient-text "
          }
          to={"/needVolunteer"}
        >
          Need Volunteer
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-base-100 py-2 font-poppins fixed w-full ">
      <div className="mx-auto lg:container ">
        <div className="navbar font-poppins">
          <div className="navbar-start ">
            <div className="dropdown ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-base-100"
              >
                {navLinks}
              </ul>
            </div>
            <Link
              to={"/"}
              className=" text-lg md:text-3xl font-semi-bold gradient-text font-rancho justify-center flex flex-col items-center"
            >
              <p className="font-poppins font-bold">
                <span className="text-pink-500">Volunize </span> Hub
              </p>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3">{navLinks}</ul>
          </div>
          <div className="navbar-end md:mr-10 mr-3 ">
            {user ? (
              <>
                <div className="flex items-center gap-4">
                  <div
                    className="tooltip hover:tooltip-open tooltip-left "
                    data-tip={user.displayName}
                  >
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className=" border-gray-200 border rounded-full avatar w-14 md:w-16"
                      >
                        <div className="md:w-48 w-36 rounded-full">
                          <img className="w-full" src={user.photoURL} />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                      >
                        <li>
                          <Link to={"/addVolunteerPost"}>
                            Add Volunteer Post
                          </Link>
                        </li>
                        <li>
                          <Link to={"/manageMyPost"}>Manage MyPost</Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <button
                    className="btn  rounded-3xl lg:px-5 border-none bg-pink-500 text-white"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="btn rounded-3xl px-5 border-none bg-pink-500 text-white"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <label className="cursor-pointer grid place-items-center">
            <input
              type="checkbox"
              onChange={handleThemeChange}
              checked={theme == "synthwave" ? true : false}
              className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
            />
            <svg
              className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <svg
              className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
