/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import useApiRequest from "../hooks/useApiRequest.js";

const Search = ({ setResData, getRecipes, page }) => {
  const [searchText, setSearchText] = useState("");
  const { apiRequest } = useApiRequest();
  const [debounceSearchInput] = useDebounce(searchText, 1000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (debounceSearchInput.trim().length === 0) return;
        const options = {
          method: "get",
          url: `/api/v1/recipes/filter?searchKey=${debounceSearchInput.trim()}&page=${page}`,
        };
        const res = await apiRequest(options);
        setResData(res);
      } catch (error) {
        console.log("Failed to search recipes: ", error);
      }
    };

    fetchData();
  }, [apiRequest, page, debounceSearchInput, setResData]);

  const handleClear = async () => {
    setSearchText("");
    getRecipes();
  };

  return (
    <div className="mx-auto mb-3 flex w-8/12 items-center gap-1 md:mb-5 md:w-[400px]">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="search recipe"
          className="w-full rounded-lg bg-gray-200 p-2 ps-8 text-sm text-gray-500 outline-none md:text-base lg:ps-11"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <IoSearchSharp className="absolute left-2 top-2 text-xl text-orange md:text-2xl lg:left-4" />
      </div>

      {searchText.trim().length > 0 && (
        <button
          className="ml-2 rounded-lg bg-orange px-2 py-1 text-white"
          onClick={handleClear}
        >
          clear
        </button>
      )}
    </div>
  );
};

export default Search;
