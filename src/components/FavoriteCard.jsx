/* eslint-disable react/prop-types */
import { formatISO9075 } from "date-fns";
import { BsBookmarkXFill } from "react-icons/bs";

import { Link } from "react-router-dom";

const FavoriteCard = ({ recipe, handleDelete }) => {
  const { title, description, _id, photo, createdAt } = recipe;

  return (
    <div className="space-y-3 overflow-hidden rounded-2xl bg-white p-3 md:p-5">
      <Link to={`/recipes/${_id}`}>
        <img
          src={`${import.meta.env.VITE_API_ASSET_URL}${photo}`}
          alt={title}
          className="mx-auto rounded-md object-contain md:h-72"
        />
      </Link>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-orange md:text-xl">{title}</h3>
        <BsBookmarkXFill
          onClick={() => handleDelete(_id)}
          className="cursor-pointer text-xl text-orange md:text-2xl"
        />
      </div>

      <p className="text-sm md:text-base">
        {description.slice(0, 100) + "..."}
      </p>
      <p className="text-sm text-gray-500 md:text-base">
        <span> Published on -</span>
        {formatISO9075(createdAt, { representation: "date" })}
      </p>
    </div>
  );
};

export default FavoriteCard;
