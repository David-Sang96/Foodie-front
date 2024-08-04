/* eslint-disable react-refresh/only-export-components */

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal.jsx";
import Loader from "../components/Loader.jsx";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search.jsx";
import axios from "../helpers/axios";

const Home = () => {
  const [resData, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const page = parseInt(searchParams.get("page")) || 1;
  const { recipes, totalPages } = resData;

  useEffect(() => {
    if (page > totalPages || page < 1) {
      navigate("/");
    }
  }, [page, totalPages, navigate]);

  const getRecipes = useCallback(async () => {
    try {
      setIsError(null);
      setIsLoading(true);
      const res = await axios(`/api/v1/recipes/?page=${page}`);
      if (res.status >= 200 && res.status < 300) {
        setResData(res.data);
        // window.scroll({ top: 0, left: 0, behavior: "smooth" });
      }
    } catch (error) {
      setIsError(error.response.data);
    } finally {
      //  slight delay to avoid flicker (showing loader component)
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }
  }, [page]);

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
      const res = await axios.delete(`/api/v1/recipes/${deleteId}`);
      if (res.status >= 200 && res.status < 300) {
        filterRecipes(deleteId);
        setIsModalOpen(false);
        toast.success("deleted successfully");
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
