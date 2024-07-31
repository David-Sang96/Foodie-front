/* eslint-disable react/prop-types */
import { formatISO9075 } from "date-fns";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { Link } from "react-router-dom";

const RecipeCard = ({ recipe, setIsModalOpen, setDeleteId }) => {
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
      </div>

      <p className="text-sm md:text-base">
        {description.slice(0, 100) + "..."}
      </p>
      {/* <div className="flex flex-wrap items-center space-x-1">
        <span className="mb-1 text-sm md:text-base">Ingredients - </span>
        <IngredientCard ingredients={ingredients} deleteAble={false} />
      </div> */}
      <p className="text-sm text-gray-500 md:text-base">
        <span> Published on -</span>
        {formatISO9075(createdAt, { representation: "date" })}
      </p>
    </div>
  );
};

export default RecipeCard;
