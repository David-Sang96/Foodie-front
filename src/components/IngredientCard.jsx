/* eslint-disable react/prop-types */
import { RiDeleteBin5Fill } from "react-icons/ri";

const IngredientCard = ({ ingredients, deleteAble, filteredOut }) => {
  const handleDelete = (i) => {
    filteredOut(i);
  };

  return (
    <>
      {ingredients.length > 0 &&
        ingredients.map((ingredient, i) => (
          <div key={i}>
            {deleteAble ? (
              <div className="relative mt-4">
                <span className="rounded-lg bg-orange px-3 py-2 pt-3 text-sm text-white">
                  {ingredient}
                </span>
                <RiDeleteBin5Fill
                  className="absolute -top-2 right-0 cursor-pointer text-white"
                  title="delete"
                  onClick={() => handleDelete(i)}
                />
              </div>
            ) : (
              <span className="rounded-lg bg-orange px-2 py-1 text-sm text-white">
                {ingredient}
              </span>
            )}
          </div>
        ))}
    </>
  );
};

export default IngredientCard;
