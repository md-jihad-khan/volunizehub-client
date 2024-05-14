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
  const [count, setCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  const handleSearch = (e) => {
    setLoading(true);
    e.preventDefault();
    setSearch(e.target.search.value);
  };
  useEffect(() => {
    setLoading(true);
    setPosts([]);
    axiosSecure
      .get(
        `/allPosts?page=${currentPage}&size=${itemsPerPage}&search=${search}`
      )
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      });
  }, [currentPage, itemsPerPage, search]);

  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`/post-count?search=${search}`).then((res) => {
      setCount(res.data.count);
    });
  }, [search]);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    console.log(value);
    setCurrentPage(value);
  };
  const handleDate = (date) => {
    const deadlineDate = new Date(date);

    // Options for formatting the date
    const options = { year: "numeric", month: "long", day: "numeric" };
    // Format the deadline date
    const formattedDeadline = deadlineDate.toLocaleDateString("en-US", options);
    return formattedDeadline;
  };
  return (
    <>
      <Helmet>
        <title>Volunize Hub | Need Volunteer</title>
      </Helmet>
      <div className="container mx-auto relative">
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
                name="search"
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
          className={`${
            loading ? "absolute" : "hidden"
          } left-[50%] top-[50%] z-10`}
        >
          <span className="loading text-pink-500 loading-spinner loading-lg"></span>
        </div>
        <div
          className={`${
            layout === "table" ? "hidden" : ""
          } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 min-h-52`}
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
                <th>Volunteer Need</th>
                <th>Deadline</th>
                <th className="hidden md:block">View Details</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id}>
                  <th>{index + 1}</th>
                  <td className="line-clamp-1 h-7 lg:h-full">{post.title}</td>
                  <td>{post.category}</td>

                  <td className="text-left">{post.numberOfVolunteer}</td>
                  <td className="">
                    <Link
                      to={`/updatePost/${post._id}`}
                      className="btn btn-ghost btn-xs px-0 "
                    >
                      {handleDate(post.deadline)}
                    </Link>
                  </td>
                  <td className="hidden md:block">
                    <Link
                      to={`/post/${post._id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Section */}
        <div className="flex justify-center mt-12">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-pink-500  hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>

              <span className="mx-1">previous</span>
            </div>
          </button>
          {/* Numbers */}
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-pink-500 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-pink-500  hover:text-white`}
            >
              {btnNum}
            </button>
          ))}
          {/* Next Button */}
          <button
            disabled={currentPage === numberOfPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-pink-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default NeedVolunteer;
