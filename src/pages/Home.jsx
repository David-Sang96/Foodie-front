/* eslint-disable react-refresh/only-export-components */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [resData, setResData] = useState([]);
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}?page=${page}`);
      const data = await res.json();
      setResData(data);

      window.scroll({ top: 0, left: 0, behavior: "smooth" });
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

  return (
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
  );
};

export default Home;
