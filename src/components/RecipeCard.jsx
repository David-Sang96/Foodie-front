/* eslint-disable react/prop-types */
import { formatISO9075 } from "date-fns";
import IngredientCard from "./IngredientCard";

const RecipeCard = ({ recipe }) => {
  const { title, description, ingredients } = recipe;

  return (
    <div className="space-y-3 rounded-2xl bg-white p-5">
      <h3 className="text-orange text-xl font-bold">{title}</h3>
      <p>Description</p>
      <p>{description}</p>
      <div className="space-x-1">
        <span>Ingredients -</span>
        <IngredientCard ingredients={ingredients} />
      </div>
      <p className="text-gray-500">
        <span> Published at -</span>
        {formatISO9075(recipe.createdAt, { representation: "date" })}
      </p>
    </div>
  );
};

export default RecipeCard;
