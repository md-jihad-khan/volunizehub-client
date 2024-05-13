import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyRequest = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
    console.log(reload);
  };

  const handleCancel = (requestId, postId) => {
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
          .delete(`/request/${requestId}?email=${user?.email}&id=${postId}`, {
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
      .get(`/allRequest/?email=${user?.email}`)
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
        <div className="overflow-x-auto text-center">
          <table className="table table-sm text-center">
            <thead>
              <tr className="text-pink-500">
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th className="hidden md:block">View Details</th>
                <th>Cancel</th>

                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id}>
                  <th>{index + 1}</th>
                  <td className="line-clamp-1 h-7 lg:h-full">
                    {post.post_title}
                  </td>
                  <td>{post.post_category}</td>

                  <td className="hidden md:block">
                    <Link
                      to={`/post/${post.postId}`}
                      className="btn btn-ghost btn-xs"
                    >
                      Details
                    </Link>
                  </td>

                  <td>
                    <button
                      onClick={() => handleCancel(post._id, post.postId)}
                      className="btn bg-red-50 text-red-600 px-3 btn-ghost btn-xs"
                    >
                      {" "}
                      Cancel
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
            " You Don't post any request "
          </p>
        </div>
      )}
    </div>
  );
};

export default MyRequest;
