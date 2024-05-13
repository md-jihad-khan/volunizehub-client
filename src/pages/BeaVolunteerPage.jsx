import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const BeaVolunteerPage = () => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const [reload, setReload] = useState(true);
  const [suggestion, setSuggestion] = useState("");

  const handleRequest = () => {
    // setLoading(true);

    // if (user.email == post.organizer_Email) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "You Can't be a Volunteer on your post !",
    //   });
    // }
    // if (post.numberOfVolunteer == 0) {
    //   setLoading(false);
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Maximum Number of Volunteer have been requested !",
    //   });
    // }

    const volunteer_name = user.displayName;
    const volunteer_email = user.email;
    const postId = post._id;
    const organizer_Email = post.organizer_Email;
    const status = "requested";
    const post_title = post.title;
    const post_category = post.category;
    const request = {
      volunteer_name,
      volunteer_email,
      status,
      postId,
      organizer_Email,
      post_title,
      post_category,
      suggestion,
    };

    console.log(request);

    // axiosSecure
    //   .post(`/request?email=${user?.email}`, request)
    //   .then((res) => {
    //     setLoading(false);
    //     setReload(!reload);
    //     if (res.data == "You have already placed a request on this post") {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "You have already placed a request on this post",
    //       });
    //     }
    //     if (res.data.insertedId) {
    //       Swal.fire({
    //         icon: "success",
    //         title: "Success",
    //         text: "Request Added Successfully",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     setLoading(false);
    //     console.error("An error occurred:", error);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "An error occurred while adding the Request. Please try again later.",
    //     });
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    console.log("hello");
    setLoading(true);
    axiosSecure
      .get(`/post/${params.id}?email=${user?.email}`)
      .then((res) => {
        setLoading(false);
        setPost(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("An error occurred:", error);
      });
  }, [reload, axiosSecure, params.id, user]);

  const deadlineDate = new Date(post?.deadline);

  // Options for formatting the date
  const options = { year: "numeric", month: "long", day: "numeric" };
  // Format the deadline date
  const formattedDeadline = deadlineDate.toLocaleDateString("en-US", options);

  return (
    <>
      <Helmet>
        <title>Volunize Hub | Be a Volunteer</title>
      </Helmet>

      <div className="container mx-auto font-poppins">
        <div
          className={`${loading ? "absolute" : "hidden"} left-[50%] top-[50%]`}
        >
          <span className="loading text-pink-500 loading-spinner loading-lg"></span>
        </div>
        <div className="text-center ">
          <h1 className="text-2xl md:text-4xl font-bold mb-1">
            <span className="text-pink-500">Be</span> a Volunteer
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
        <section className="py-6 bg-base-200 rounded-lg ">
          <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x items-center">
            <div className="py-6 md:py-0 md:px-6">
              <img
                src={post.photo_url}
                className=" rounded-lg h-60  object-cover w-full  "
              />
              <h1 className="text-3xl font-bold">{post.title}</h1>

              <p className=" my-1 font-medium text-xs text-gray-500 ">
                Description: {post.description}
              </p>
            </div>
            <div className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
              <div>
                <p className=" text-md ">
                  Category:{" "}
                  <span className="text-sm text-gray-500">{post.category}</span>
                </p>
                <p className=" text-md ">
                  Location:
                  <span className="text-sm ml-2 text-gray-500">
                    {post.location}
                  </span>
                </p>
                <p className=" text-md ">
                  Number of Volunteer need:
                  <span className="text-sm ml-2 text-gray-500">
                    {post.numberOfVolunteer}
                  </span>
                </p>
                <p className=" text-md ">
                  Deadline:
                  <span className="text-sm ml-2 text-gray-500">
                    {formattedDeadline}
                  </span>
                </p>
                <p className=" text-md ">
                  Organizer name:
                  <span className="text-sm ml-2 text-gray-500">
                    {" "}
                    {post.organizer_Name}
                  </span>
                </p>
                <p className=" text-md ">
                  Organizer email:
                  <span className="text-sm ml-2 text-gray-500">
                    {" "}
                    {post.organizer_Email}
                  </span>
                </p>
              </div>
              <hr className=" my-3 border" />
              <div>
                <p>Volunteer Name: {user.displayName}</p>
                <p>Volunteer Email: {user.email}</p>
              </div>

              <div>
                <textarea
                  onChange={(e) => setSuggestion(e.target.value)}
                  name="suggestion"
                  placeholder="Suggestion"
                  rows="5"
                  className="p-2 w-full rounded lg outline-none"
                ></textarea>
              </div>
              <button
                onClick={handleRequest}
                type="button"
                className="btn bg-pink-500 text-white"
              >
                Request
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BeaVolunteerPage;
