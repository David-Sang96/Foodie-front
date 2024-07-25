/* eslint-disable react/prop-types */
import axios from "axios";
import { formatISO9075 } from "date-fns";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import IngredientCard from "./IngredientCard";

const RecipeCard = ({ recipe, filterRecipes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { title, description, ingredients, _id } = recipe;
  const apiURL = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${apiURL}/${_id}`);
      if (res.status >= 200 && res.status < 300) {
        filterRecipes(_id);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="space-y-3 rounded-2xl bg-white p-5">
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
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>
        <p>Description</p>
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
      {isOpen && (
        <div>
          <ConfirmModal setIsOpen={setIsOpen} handleDelete={handleDelete} />
        </div>
      )}
    </>
  );
};

export default RecipeCard;
