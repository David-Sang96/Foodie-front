import { format } from "date-fns";
import { useEffect, useState } from "react";
import { BiBookmarkHeart } from "react-icons/bi";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import Button from "../components/Button";
import IngredientCard from "../components/IngredientCard";
import Loader from "../components/Loader";
import axios from "../helpers/axios";

const Detail = () => {
  const [recipe, getRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const { id } = useParams();

  const { title, description, ingredients, photo, createdAt } = recipe;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(null);
        setIsLoading(true);
        const res = await axios.get(`/api/v1/recipes/${id}`);
        if (res.status >= 200 && res.status < 300) {
          getRecipe(res.data);
        }
      } catch (error) {
        console.log(error.response.data);
        setIsError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddFavorite = async () => {
    try {
      const data = {
        recipeId: id,
      };
      const res = await axios.post("/api/v1/favorite", data);
      if (res.status >= 200 && res.status < 300) {
        toast.success("Added to favorite successfully");
      }
    } catch (error) {
      setIsError(error.response.data);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
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
          src={`${import.meta.env.VITE_API_ASSET_URL}${photo}`}
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
