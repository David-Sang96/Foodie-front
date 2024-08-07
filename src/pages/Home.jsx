import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FavoriteCard from "../components/FavoriteCard.jsx";
import Loader from "../components/Loader.jsx";
import Pagination from "../components/Pagination";
import ScrollToTopBtn from "../components/ScrollToTopBtn.jsx";
import Search from "../components/Search.jsx";
import useApiRequest from "../hooks/useApiRequest.js";

const Home = () => {
  const [resData, setResData] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { apiRequest, isLoading } = useApiRequest();
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
      console.error("Failed to getting recipes: ", error);
    }
  }, [page, apiRequest]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Search setResData={setResData} getRecipes={getRecipes} page={page} />
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recipes?.length > 0 &&
          recipes.map((recipe) => (
            <FavoriteCard key={recipe._id} recipe={recipe} isHome={true} />
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
      <ScrollToTopBtn />
    </>
  );
};

export default Home;
