import { Link } from "react-router-dom";

import PropTypes from "prop-types";

const PostCard = ({ post }) => {
  const {
    _id,
    category,
    description,
    location,
    numberOfVolunteer,
    photo_url,
    title,
  } = post;

  return (
    <div className="rounded-lg shadow-xl  cursor-pointer transition-transform duration-300 transform hover:scale-105 border">
      <figure className="px-10 pt-2 ">
        <img
          className="rounded-lg h-48 w-full object-cover"
          src={photo_url}
          alt={title}
        />
      </figure>
      <div className=" px-10 p-2">
        <h2 className="card-title text-2xl">{title}</h2>
        <p className="line-clamp-2 text-sm text-gray-500">{category}</p>

        <p>
          <strong>Category:</strong>
          <span className="text-sm ml-2 text-gray-500">{category}</span>
        </p>

        <p>
          <strong>Deadline:</strong>
          <span className="text-sm ml-2 text-gray-500">{category}</span>
        </p>

        <div className="card-actions justify-center mt-2">
          <Link
            to={`/craft/${_id}`}
            className="btn cursor-pointer bg-pink-500 text-white"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
PostCard.propTypes = {
  post: PropTypes.object,
};
export default PostCard;
