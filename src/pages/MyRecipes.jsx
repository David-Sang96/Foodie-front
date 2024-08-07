import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import useApiRequest from "../hooks/useApiRequest";

const MyRecipes = () => {
  const [recipesData, setRecipesData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const { apiRequest, isLoading, isError } = useApiRequest();
  const { recipes, totalPages } = recipesData;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    if (currentPage > totalPages || currentPage < 1) {
      navigate("/recipes/my-recipes");
    }
  }, [currentPage, totalPages, navigate]);

  const getRecipes = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: "/api/v1/recipes/user",
      };

      const res = await apiRequest(options);
      setRecipesData(res);
    } catch (error) {
      console.error("Failed to get my recipes: ", error);
    }
  }, [apiRequest]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const filterRecipes = (id) => {
    if (recipes.length === 1 && currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
    getRecipes();

    setRecipesData((prev) => ({
      ...prev,
      recipes: prev.recipes.filter((recipe) => recipe._id !== id),
    }));
  };

  const handleDelete = async () => {
    try {
      const options = {
        method: "delete",
        url: `/api/v1/recipes/${deleteId}`,
      };
      await apiRequest(options, "deleted successfully");
      filterRecipes(deleteId);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  if (isLoading) return <Loader />;

  if (isError) return <p>{isError.message}</p>;

  return (
    <>
      <div className="mt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes?.length > 0 &&
          recipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              key={recipe._id}
              setDeleteId={setDeleteId}
              setIsModalOpen={setIsModalOpen}
            />
          ))}
      </div>

      {recipes?.length === 0 && (
        <div className="text-center">
          <p className="mt-5 text-xl font-bold text-orange transition duration-500 ease-in md:text-3xl">
            No recipe found
          </p>
          <Link
            to={"/recipes/create"}
            className="mt-3 block text-sm underline transition-all duration-500 ease-out hover:text-orange md:text-base"
          >
            Create
          </Link>
        </div>
      )}

      {recipes?.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}

      {isModalOpen && (
        <div>
          <ConfirmModal
            setIsModalOpen={setIsModalOpen}
            handleDelete={handleDelete}
            name={"Delete Recipe"}
          >
            Are you sure you want to delete your recipe? All of your data will
            be permanently removed. This action cannot be undone.
          </ConfirmModal>
        </div>
      )}
      <ScrollToTopBtn />
    </>
  );
};

export default MyRecipes;
