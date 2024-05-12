import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_SERVER}/posts`).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container mx-auto mt-12 ">
      <div className="text-center " data-aos="fade-down">
        <h1 className="text-2xl md:text-4xl font-bold mb-1">
          <span className="text-pink-500"> Volunteer</span> Needs Now
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
      <div className="relative">
        <div
          className={`${
            loading ? "absolute" : "hidden"
          } left-[50%] top-[50%] z-10`}
        >
          <span className="loading text-pink-500 loading-spinner loading-lg"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="card-actions mt-14 justify-center">
        <Link
          to={`/needVolunteer`}
          className="btn px-10 cursor-pointer bg-pink-500 text-white"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default VolunteerNeedsNow;
