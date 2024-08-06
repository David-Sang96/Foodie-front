import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FavoriteCard from "../components/FavoriteCard";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import useApiRequest from "../hooks/useApiRequest";

const Favorite = () => {
  const [favoriteRecipe, setFavoriteRecipe] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { isError, isLoading, apiRequest } = useApiRequest();
  const page = parseInt(searchParams.get("page")) || 1;
  const { recipes, totalPages } = favoriteRecipe;

  useEffect(() => {
    if (page > totalPages || page < 1) {
      navigate("/recipes/favorite");
    }
  }, [page, totalPages, navigate]);

  const getAllRecipes = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: `/api/v1/favorite?page=${page}`,
      };
      const res = await apiRequest(options);
      setFavoriteRecipe(res);
    } catch (error) {
      console.error("Failed to get Favorite recipes:", error);
    }
  }, [page, apiRequest]);

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
      const options = {
        method: "delete",
        url: `/api/v1/favorite/${id}`,
      };
      await apiRequest(options, "Removed successfully");
      filterRecipes(id);
    } catch (error) {
      console.error("Failed to remove recipe:", error);
    }
  };

  if (isLoading) return <Loader />;

  if (isError) return <p>{isError.message}</p>;

  return (
    <>
      <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
