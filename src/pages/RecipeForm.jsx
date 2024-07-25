import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

import IngredientCard from "../components/IngredientCard";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const apiURL = import.meta.env.VITE_API_URL;

  const getRecipe = useCallback(
    async (id) => {
      try {
        const res = await axios.get(`${apiURL}/${id}`);
        if (res.status >= 200 && res.status < 300) {
          const { title, description, ingredients } = res.data;
          setTitle(title);
          setDescription(description);
          setIngredients(ingredients);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [apiURL],
  );

  useEffect(() => {
    if (id) {
      getRecipe(id);
    }
  }, [id, getRecipe]);

  const handleAddIngredients = () => {
    if (ingredients.includes(newIngredient) || newIngredient === "") {
      setNewIngredient("");
      return;
    }
    setIngredients((prev) => [newIngredient, ...prev]);
    setNewIngredient("");
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setIsError(null);
      setIsLoading(true);

      const recipe = {
        title,
        description,
        ingredients,
      };
      const res = id
        ? await axios.patch(`${apiURL}/${id}`, recipe)
        : await axios.post(`${apiURL}`, recipe);
      if (res.status >= 200 && res.status < 300) {
        navigate("/");
      }
    } catch (error) {
      setIsError(error.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessages = (field) => {
    if (isError) {
      const error = isError.find((error) => error.path === field);
      if (error) {
        return (
          <p key={error.msg} className="text-red-500">
            {error.msg}
          </p>
        );
      }
    }
    return null;
  };

  const filteredOut = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-md">
      <div
        className="flex justify-end pb-1"
        title="back"
        onClick={() => navigate(-1)}
      >
        <RiArrowGoBackLine className="cursor-pointer rounded-md border border-white bg-orange py-1 text-4xl text-white" />
      </div>
      <div className="rounded-sm border-2 border-white p-4">
        <h1 className="mb-6 text-center text-2xl font-bold text-orange">
          Recipe {`${id ? "Edit" : "Create"}`} Form
        </h1>

        <form className="space-y-5" onSubmit={handleSubmitForm}>
          <div className="space-y-2">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            {getErrorMessages("title")}
            <input
              type="text"
              name="title"
              id="title"
              placeholder="title"
              className={`w-full rounded-md p-2 outline-none ${getErrorMessages("title") ? "border border-red-600" : ""}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            {getErrorMessages("description")}
            <textarea
              name="description"
              id="description"
              placeholder="description"
              rows={5}
              className={`w-full rounded-md p-2 outline-none ${getErrorMessages("description") ? "border border-red-600" : ""}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="space-y-2">
            <label htmlFor="ingredient" className="font-medium">
              Ingredients
            </label>
            {getErrorMessages("ingredients")}
            <div className="flex items-center gap-1">
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                placeholder="ingredient"
                className="w-full rounded-md p-2 outline-none"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <IoIosAddCircle
                className="cursor-pointer text-3xl text-orange"
                onClick={handleAddIngredients}
              />
            </div>
            <div className="flex flex-wrap gap-1">
              <IngredientCard
                ingredients={ingredients}
                deleteAble={true}
                filteredOut={filteredOut}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-md bg-orange py-2 font-medium text-white ${isLoading ? "cursor-not-allowed" : ""}`}
          >
            {isLoading
              ? id
                ? "Updating ..."
                : "Creating ..."
              : id
                ? "Update"
                : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
