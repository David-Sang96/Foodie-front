import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { format } from "date-fns";
import Button from "../components/Button";
import IngredientCard from "../components/IngredientCard";
import Loader from "../components/Loader";
import axios from "../helpers/axios";

const Detail = () => {
  // const { title, description, ingredients, _id, photo } = recipe;
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
        setIsError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <Loader />;

  if (isError) return <p>{isError.message}</p>;

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
            {createdAt ? format(createdAt, "HH:mm:ss aa") : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
