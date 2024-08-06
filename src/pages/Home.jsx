import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Loader from "../components/Loader.jsx";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search.jsx";
import useApiRequest from "../hooks/useApiRequest.js";

const Home = () => {
  const [resData, setResData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { isError, apiRequest, isLoading } = useApiRequest();
  const page = parseInt(searchParams.get("page")) || 1;
  const { recipes, totalPages } = resData;

  useEffect(() => {
    if (page > totalPages || page < 1) {
      navigate("/");
    }
  }, [page, totalPages, navigate]);

  const getRecipes = useCallback(async () => {
    try {
      const options = {
        method: "get",
        url: `/api/v1/recipes/?page=${page}`,
      };
      const res = await apiRequest(options);
      setResData(res);
      // window.scroll({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Failed to getting recipes:", error);
    }
  }, [page, apiRequest]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const filterRecipes = (id) => {
    if (resData.recipes.length === 1 && page > 1) {
      searchParams.set("page", page - 1);
      setSearchParams(searchParams);
    }
    getRecipes();

    setResData((prev) => ({
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
      <Search setResData={setResData} getRecipes={getRecipes} />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes?.length > 0 &&
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              setIsModalOpen={setIsModalOpen}
              setDeleteId={setDeleteId}
            />
          ))}
      </div>
      {recipes?.length === 0 && (
        <div className="mt-5 text-center text-xl font-bold text-orange md:text-3xl">
          No recipe found
        </div>
      )}
      {recipes?.length > 0 && (
        <Pagination totalPages={totalPages} currentPage={page} />
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
    </>
  );
};

export default Home;
