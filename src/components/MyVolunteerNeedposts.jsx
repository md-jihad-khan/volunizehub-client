import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const MyVolunteerNeedposts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosSecure
      .get(`/post/?email=${user?.email}`)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div
        className={`${loading ? "absolute" : "hidden"} left-[50%] top-[50%]`}
      >
        <span className="loading text-pink-500 loading-spinner loading-lg"></span>
      </div>
      <div className="overflow-x-auto">
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
  );
};

export default MyVolunteerNeedposts;
