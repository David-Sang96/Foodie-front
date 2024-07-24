/* eslint-disable react-refresh/only-export-components */

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import RecipeCard from "../components/RecipeCard";

const Home = () => {
  const [resData, setResData] = useState([]);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1; // Default to page 1 if no page param
  const { recipes, totalPages } = resData;

  useEffect(() => {
    const getRecipes = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}?page=${page}`);
      const data = await res.json();
      setResData(data);

      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    };
    getRecipes();
  }, [page]);

  return (
    <div className="space-y-3">
      {recipes?.length > 0 ? (
        recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} />)
      ) : (
        <div>No recipe found</div>
      )}
      <Pagination totalPages={totalPages} currentPage={page} />
    </div>
  );
};

export default Home;
