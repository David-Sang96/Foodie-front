/* eslint-disable react/prop-types */
import { formatISO9075 } from "date-fns";
import { BsBookmarkXFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import avatar from "../assets/avatar.jpg";

const FavoriteCard = ({ recipe, handleDelete, isHome }) => {
  const {
    title,
    description,
    _id,
    photo,
    createdAt,
    username,
    userId: { photo: userImage },
  } = recipe;

  return (
    <div className="space-y-3 overflow-hidden rounded-2xl bg-white p-3 md:p-5">
      <Link to={`/recipes/${_id}`}>
        <img
          src={photo}
          alt={title}
          className="mx-auto rounded-md object-contain md:h-72"
        />
      </Link>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-orange md:text-xl">{title}</h3>
        {!isHome ? (
          <BsBookmarkXFill
            onClick={() => handleDelete(_id)}
            className="cursor-pointer text-xl text-orange md:text-2xl"
          />
        ) : (
          <span></span>
        )}
      </div>

      <p className="text-sm md:text-base">
        {description.slice(0, 100) + "..."}
      </p>
      {!isHome ? (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <p className="text-sm text-gray-500 md:text-base">
            <span> Published on -</span>
            {formatISO9075(createdAt, { representation: "date" })}
          </p>
          <img
            src={userImage ? userImage : avatar}
            alt="profile image"
            className="mr-3 h-9 w-9 rounded-full border-2 border-orange object-cover md:h-10 md:w-10"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            <p>
              <span>Created By - {username}</span>
            </p>
            <p>
              <span> Published on -</span>
              {formatISO9075(createdAt, { representation: "date" })}
            </p>
          </div>
          <img
            src={userImage ? userImage : avatar}
            alt="profile image"
            className="mr-3 h-9 w-9 rounded-full border-2 border-orange object-cover md:h-10 md:w-10"
          />
        </div>
      )}
    </div>
  );
};

export default FavoriteCard;
