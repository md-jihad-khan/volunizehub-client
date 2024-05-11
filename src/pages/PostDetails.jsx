import { ScrollRestoration, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const params = useParams();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/post/${params.id}?email=${user?.email}`, post)
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }, []);

  const deadlineDate = new Date(post?.deadline);

  // Options for formatting the date
  const options = { year: "numeric", month: "long", day: "numeric" };
  // Format the deadline date
  const formattedDeadline = deadlineDate.toLocaleDateString("en-US", options);

  return (
    <div className="container mx-auto font-poppins">
      {" "}
      <div className="hero-content flex-col gap-10 lg:flex-row min-h-[80vh] ">
        <ScrollRestoration />
        <div className=" bg-[#1313130D] rounded-lg w-full lg:w-1/2 ">
          <img
            src={post.photo_url}
            className="md:p-20 rounded-lg lg:h-[80vh] object-cover w-full  "
          />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold">{post.title}</h1>

          <p className=" my-4 font-medium text-sm text-gray-500 ">
            Description: {post.description}
          </p>
          <hr className="  border" />
          <p className="my-3 text-lg font-semibold">
            Category: {post.category}
          </p>
          <hr className=" border mb-4" />
          <p>
            <strong>Location:</strong>{" "}
            <span className="text-sm ml-2 text-gray-500">{post.location}</span>
          </p>
          <p>
            <strong>Number of Volunteer need:</strong>{" "}
            <span className="text-sm ml-2 text-gray-500">
              {post.numberOfVolunteer}
            </span>
          </p>
          <p>
            <strong>Deadline:</strong>{" "}
            <span className="text-sm ml-2 text-gray-500">
              {formattedDeadline}
            </span>
          </p>
          <p>
            <strong>Organizer name:</strong>
            <span className="text-sm ml-2 text-gray-500">
              {" "}
              {post.user_Name}
            </span>
          </p>
          <p>
            <strong>Organizer email:</strong>{" "}
            <span className="text-sm ml-2 text-gray-500">
              {" "}
              {post.user_Email}
            </span>
          </p>

          <hr className=" border mt-4" />
          <div className="card-actions mt-4 justify-center">
            <button className="btn px-10 cursor-pointer bg-pink-500 text-white">
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
