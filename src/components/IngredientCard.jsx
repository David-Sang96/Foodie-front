/* eslint-disable react/prop-types */
const IngredientCard = ({ ingredients }) => {
  return (
    <>
      {ingredients.length > 0 &&
        ingredients.map((ingredient, i) => (
          <span
            className="bg-orange rounded-lg px-2 py-1 text-sm text-white"
            key={i}
          >
            {ingredient}
          </span>
        ))}
    </>
  );
};

export default IngredientCard;
