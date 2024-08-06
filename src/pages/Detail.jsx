import { format } from "date-fns";
import { useEffect, useState } from "react";
import { BiBookmarkHeart } from "react-icons/bi";
import { useParams } from "react-router-dom";

import Button from "../components/Button";
import IngredientCard from "../components/IngredientCard";
import Loader from "../components/Loader";
import useApiRequest from "../hooks/useApiRequest";

const Detail = () => {
  const [recipe, getRecipe] = useState({});
  const { id } = useParams();
  const { isLoading, apiRequest } = useApiRequest();
  const { title, description, ingredients, photo, createdAt } = recipe;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "get",
          url: `/api/v1/recipes/${id}`,
        };
        const res = await apiRequest(options);
        getRecipe(res);
      } catch (error) {
        console.error("Failed to get recipe: ", error);
      }
    };

    fetchData();
  }, [id, apiRequest]);

  const handleAddFavorite = async () => {
    try {
      const options = {
        method: "post",
        url: "/api/v1/favorite",
        data: {
          recipeId: id,
        },
      };
      await apiRequest(options, "Added to favorite successfully");
    } catch (error) {
      console.error("Failed to add favorite recipe: ", error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="sm:mx-auto lg:w-[1000px]">
      <div className="flex justify-end pb-1">
        <Button btnType={"back"} />
      </div>
      <div className="space-y-3 overflow-hidden rounded-2xl bg-white p-3 md:p-5">
        <img
          src={photo}
          alt={title}
          className="mx-auto rounded-md object-contain md:h-96"
        />
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-orange md:text-xl">{title}</h3>
          <BiBookmarkHeart
            className="cursor-pointer text-2xl text-orange md:text-3xl"
            onClick={handleAddFavorite}
          />
        </div>

        <p className="break-words text-sm md:text-base">{description}</p>
        <div className="flex flex-wrap items-center space-x-1">
          <span className="mb-1 text-sm md:text-base">Ingredients - </span>
          <IngredientCard ingredients={ingredients} deleteAble={false} />
        </div>
        <div className="flex flex-col text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between md:text-base">
          <p>
            <span> Published on - </span>
            {createdAt ? format(createdAt, "MM/dd/yyyy") : "N/A"}
          </p>
          <p>
            <span> Published at - </span>
            {createdAt ? format(createdAt, "h:mm:ss aa") : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
