import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MyVolunteerNeedposts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
    console.log(reload);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/post/${id}?email=${user?.email}`, {
            method: "DELETE",
          })
          .then((res) => {
            if (res.data.deletedCount > 0) {
              handleReload();
              Swal.fire({
                title: "Deleted!",
                text: "Your post has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

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
  }, [reload]);

  return (
    <div>
      <div
        className={`${loading ? "absolute" : "hidden"} left-[50%] top-[50%]`}
      >
        <span className="loading text-pink-500 loading-spinner loading-lg"></span>
      </div>

      {posts.length ? (
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
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="btn px-0 btn-ghost btn-xs"
                    >
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
      ) : (
        <div>
          <p className="text-xl font-bold font-poppins mt-10">
            " You Don't have any Post "
          </p>
        </div>
      )}
    </div>
  );
};

export default MyVolunteerNeedposts;
