import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PostCard from "../components/PostCard";
import { FaSearch } from "react-icons/fa";

const NeedVolunteer = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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
    <div className="container mx-auto">
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
      <form onSubmit={handleSearch}>
        <label className=" md:w-1/2 mx-auto flex items-center border-r-0 pr-0">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            className="grow input focus:outline-none border border-gray-300 rounded-full rounded-r-none"
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
      <div
        className={`${loading ? "absolute" : "hidden"} left-[50%] top-[50%]`}
      >
        <span className="loading text-pink-500 loading-spinner loading-lg"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default NeedVolunteer;
