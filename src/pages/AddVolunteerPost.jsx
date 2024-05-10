import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import { ScrollRestoration } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddVolunteerPost = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleAddPost = (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const location = form.location.value;
    const numberOfVolunteer = form.numberOfVolunteer.value;
    const user_Email = user.email;
    const user_Name = user.displayName;
    const photo_url = form.photo.value;
    const description = form.description.value;
    const deadline = startDate;

    const post = {
      title,
      category,
      location,
      numberOfVolunteer,
      user_Email,
      user_Name,
      photo_url,
      description,
      deadline,
    };
    console.log(post);

    axiosSecure
      .post(`/post?email=${user?.email}`, post)
      .then((res) => {
        setLoading(false);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Post Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        form.reset();
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while adding the post. Please try again later.",
        });
        setLoading(false);
      });
  };
  return (
    <div className="relative">
      <div
        className={`${loading ? "absolute" : "hidden"} left-[50%] top-[50%]`}
      >
        <span className="loading text-pink-500 loading-spinner loading-lg"></span>
      </div>
      <ScrollRestoration />
      <div className="md:w-4/5 mx-auto p-5">
        <div className="bg-base-200  p-5 rounded-lg text-center ">
          <div className="flex items-center justify-center gap-3 text-2xl md:text-5xl mb-2 mt-3 font-poppins font-bold">
            <h3 className="text-pink-500">Add </h3>
            <span className="text-2xl md:text-5xl">Volunteer Post</span>
          </div>
          <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64  my-4 border-pink-500 border rounded "></hr>
            <div className="absolute px-4 -translate-x-1/2 bg-base-200 left-1/2 ">
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

          <form className="p-4" onSubmit={handleAddPost}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text gradient-text font-semibold text-xl">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  className="input "
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text gradient-text font-semibold text-xl">
                    Category Name
                  </span>
                </label>
                <select
                  className="input w-full text-gray-400"
                  name="category"
                  required
                >
                  <option value="" disabled>
                    Select Category name
                  </option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Social service</option>
                  <option>Animal welfare</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text gradient-text font-semibold text-xl">
                    Location
                  </span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter the Location"
                  className="input  "
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text gradient-text font-semibold text-xl">
                    Date
                  </span>
                </label>
                <DatePicker
                  selected={startDate}
                  className="input w-full"
                  onChange={(date) => setStartDate(date)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text gradient-text font-semibold text-xl">
                    No. of volunteers needed
                  </span>
                </label>
                <input
                  type="number"
                  name="numberOfVolunteer"
                  placeholder="Enter the No. of volunteers needed"
                  className="input  "
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text gradient-text font-semibold text-xl">
                    Thumbnail URL
                  </span>
                </label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Enter the photo url"
                  className="input  "
                  required
                />
              </div>
            </div>
            <label className="label">
              <span className="label-text gradient-text font-semibold text-xl">
                Description
              </span>
            </label>
            <textarea
              name="description"
              placeholder="description"
              rows="5"
              className="input h-full w-full"
            ></textarea>
            <button
              type="submit"
              className="border text-white bg-pink-500 btn mt-4 w-full  text-xl  "
            >
              Add Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVolunteerPost;
