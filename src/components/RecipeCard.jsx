/* eslint-disable react/prop-types */
import { formatISO9075 } from "date-fns";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { Link } from "react-router-dom";
import IngredientCard from "./IngredientCard";

const RecipeCard = ({ recipe, setIsModalOpen, setDeleteId }) => {
  const { title, description, ingredients, _id, photo } = recipe;

  return (
    <>
      <div className="space-y-3 rounded-2xl bg-white p-5">
        <img
          src={`${import.meta.env.VITE_API_URL}${photo}`}
          alt={title}
          className="mx-auto h-72 rounded-md object-contain"
        />
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-orange">{title}</h3>
          <div className="flex items-center gap-4">
            <Link to={`/recipes/edit/${_id}`}>
              <AiFillEdit
                className="cursor-pointer text-2xl text-orange"
                title="edit"
              />
            </Link>
            <RiDeleteBin5Fill
              className="cursor-pointer text-2xl text-orange"
              title="delete"
              onClick={() => {
                setDeleteId(_id);
                setIsModalOpen((prev) => !prev);
              }}
            />
          </div>
        </div>

        <p>{description}</p>
        <div className="flex space-x-1">
          <span>Ingredients -</span>
          <IngredientCard ingredients={ingredients} deleteAble={false} />
        </div>
        <p className="text-gray-500">
          <span> Published at -</span>
          {formatISO9075(recipe.createdAt, { representation: "date" })}
        </p>
      </div>
    </>
  );
};

export default RecipeCard;
