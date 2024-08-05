/* eslint-disable react/prop-types */
import { formatISO9075 } from "date-fns";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, setIsModalOpen, setDeleteId }) => {
  const { title, description, _id, photo, createdAt, userId, username } =
    recipe;
  const currentUserPost =
    JSON.parse(localStorage.getItem("user"))?._id === userId;

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
        {currentUserPost ? (
          <div className="flex items-center gap-4">
            <Link to={`/recipes/edit/${_id}`}>
              <AiFillEdit
                className="cursor-pointer text-xl text-orange md:text-2xl"
                title="edit"
              />
            </Link>
            <RiDeleteBin5Fill
              className="cursor-pointer text-xl text-orange md:text-2xl"
              title="delete"
              onClick={(e) => {
                e.preventDefault();
                setDeleteId(_id);
                setIsModalOpen((prev) => !prev);
              }}
            />
          </div>
        ) : (
          <span></span>
        )}
      </div>

      <p className="text-sm md:text-base">
        {description.slice(0, 100) + "..."}
      </p>
      <div className="text-sm text-gray-500 sm:flex sm:items-center sm:justify-between">
        <p>
          <span>Created By - {username}</span>
        </p>
        <p>
          <span> Published on -</span>
          {formatISO9075(createdAt, { representation: "date" })}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
