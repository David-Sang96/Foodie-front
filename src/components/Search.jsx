/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "react-toastify";

import axios from "../helpers/axios";

const Search = ({ setResData, getRecipes }) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchText.trim().length === 0) return getRecipes();
      const res = await axios.get(
        `/api/v1/recipes/filter?searchKey=${searchText.trim()}`,
      );
      if (res.status >= 200 && res.status < 300) {
        setResData(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form
      action=""
      className="mx-auto mb-3 mt-2 flex w-8/12 items-center gap-1 md:mb-5 md:w-[400px]"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="search recipe"
        className="w-full rounded-lg bg-gray-200 p-2 text-sm text-gray-500 outline-none md:text-base"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button type="submit">
        <IoSearchSharp className="text-xl text-orange md:text-2xl" />
      </button>
    </form>
  );
};

export default Search;
