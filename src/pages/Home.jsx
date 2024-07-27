/* eslint-disable react-refresh/only-export-components */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";
import axios from "../helpers/axios";

const Home = () => {
  const [resData, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get("page")) || 1;
  const { recipes, totalPages } = resData;

  useEffect(() => {
    if (page > totalPages || page < 1) {
      navigate("/");
    }
  }, [page, totalPages, navigate]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setIsError(null);
        setIsLoading(true);
        const res = await axios(`/recipes/?page=${page}`);
        if (res.status >= 200 && res.status < 300) {
          setResData(res.data);
        }
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      } catch (error) {
        setIsError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipes();
  }, [page]);

  const filterRecipes = (id) => {
    if (resData.recipes.length === 1 && page > 1) {
      searchParams.set("page", page - 1);
      setSearchParams(searchParams);
    }
    setResData((prev) => ({
      ...prev,
      recipes: prev.recipes.filter((recipe) => recipe._id !== id),
    }));
  };

  if (isError) return navigate("/sign-in");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="space-y-3">
          {recipes?.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                filterRecipes={filterRecipes}
              />
            ))
          ) : (
            <div>No recipe found</div>
          )}
          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
      )}
    </>
  );
};

export default Home;
