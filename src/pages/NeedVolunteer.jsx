import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PostCard from "../components/PostCard";
import { FaPen, FaSearch } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NeedVolunteer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState("column");

  const handleSearch = (e) => {
    setPosts([]);
    setLoading(true);
    e.preventDefault();
    axiosSecure.get(`/allPosts?search=${search}`).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  };
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`/allPosts?search=${search}`).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Volunize Hub | Need Volunteer</title>
      </Helmet>
      <div className="container mx-auto ">
        <div className="text-center ">
          <h1 className="text-2xl md:text-4xl font-bold mb-1">
            <span className="text-pink-500">Need</span> Volunteer Posts
          </h1>
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
        <div className="flex md:w-1/2 mx-auto items-center gap-2">
          <form onSubmit={handleSearch} className="w-full">
            <label className=" flex items-center border-r-0 pr-0">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className="w-full input  focus:outline-none border border-gray-300 rounded-full rounded-r-none"
                placeholder="Search"
              />
              <button
                type="submit"
                className="btn-square  rounded-r-full px-10 bg-pink-500 text-white"
              >
                <FaSearch />
              </button>
            </label>
          </form>

          <button
            onClick={() => setLayout("column")}
            className={`text-4xl ${layout === "column" ? "text-pink-500" : ""}`}
          >
            <CgMenuGridR />
          </button>
          <button
            onClick={() => setLayout("table")}
            className={`text-4xl ${layout === "table" ? "text-pink-500" : ""}`}
          >
            <GiHamburgerMenu />
          </button>
        </div>
        <div
          className={`${loading ? "absolute" : "hidden"} left-[50%] top-[50%] `}
        >
          <span className="loading text-pink-500 loading-spinner loading-lg"></span>
        </div>
        <div
          className={`${
            layout === "table" ? "hidden" : ""
          } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 min-h-screen`}
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        <div
          className={`${layout === "column" ? "hidden" : ""} overflow-x-auto`}
        >
          <table className="table table-sm">
            <thead>
              <tr className="text-pink-500">
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th className="hidden md:block">View Details</th>
                <th>Update</th>
                <th>Delete</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id}>
                  <th>{index + 1}</th>
                  <td className="line-clamp-1 h-7 lg:h-full">{post.title}</td>
                  <td>{post.category}</td>

                  <td className="hidden md:block">
                    <Link
                      to={`/post/${post._id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      Details
                    </Link>
                  </td>
                  <td className="">
                    <Link
                      to={`/updatePost/${post._id}`}
                      className="btn btn-ghost btn-xs px-0 "
                    >
                      Update
                      <FaPen />
                    </Link>
                  </td>
                  <td>
                    <button className="btn px-0 btn-ghost btn-xs">
                      {" "}
                      Delete
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NeedVolunteer;
