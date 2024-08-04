import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import FavoriteCard from "../components/FavoriteCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import axios from "../helpers/axios";

const Favorite = () => {
  const [favoriteRecipe, setFavoriteRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page")) || 1;

  const { recipes, totalPages } = favoriteRecipe;

  console.log(favoriteRecipe);

  useEffect(() => {
    if (page > totalPages || page < 1) {
      navigate("/recipes/favorite");
    }
  }, [page, totalPages, navigate]);

  const getAllRecipes = useCallback(async () => {
    try {
      setIsError(null);
      setIsLoading(true);
      const res = await axios.get(`/api/v1/favorite?page=${page}`);
      if (res.status >= 200 && res.status < 300) {
        setFavoriteRecipe(res.data);
      }
    } catch (error) {
      setIsError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    getAllRecipes();
  }, [getAllRecipes]);

  const filterRecipes = (id) => {
    if (favoriteRecipe.recipes.length === 1 && page > 1) {
      searchParams.set("page", page - 1);
      setSearchParams(searchParams);
    }
    getAllRecipes();
    setFavoriteRecipe((prev) => ({
      ...prev,
      recipes: prev.recipes.filter((recipe) => recipe._id !== id),
    }));
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/favorite/${id}`);
      if (res.status >= 200 && res.status < 300) {
        filterRecipes(id);
        toast.success("Removed successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  if (isLoading) return <Loader />;

  if (isError) return <p>{isError.message}</p>;

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {recipes?.length > 0 &&
          recipes.map((recipe) => (
            <FavoriteCard
              key={recipe._id}
              recipe={recipe}
              handleDelete={handleDelete}
            />
          ))}
      </div>
      {recipes?.length === 0 && (
        <div className="text-center">
          <p className="mt-5 text-xl font-bold text-orange transition duration-500 ease-in md:text-3xl">
            No recipe found
          </p>
          <Link
            to={"/"}
            className="mt-3 block text-sm underline transition-all duration-500 ease-out hover:text-orange md:text-base"
          >
            Back to Home
          </Link>
        </div>
      )}
      {recipes?.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
    </>
  );
};

export default Favorite;
