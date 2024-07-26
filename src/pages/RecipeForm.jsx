import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import { default as BackBtn, default as Button } from "../components/Button";
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
        const res = await axios.get(`${apiURL}/recipes/${id}`);
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
        ? await axios.patch(`${apiURL}/recipes/${id}`, recipe)
        : await axios.post(`${apiURL}/recipes`, recipe);
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
          <p key={error.msg} className="text-xs italic text-red-500">
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
      <div className="flex justify-end pb-1">
        <BackBtn btnType={"back"} />
      </div>
      <div className="mb-4 rounded border-2 border-white bg-white p-4 px-8 pb-8 pt-6 shadow-md">
        <h1 className="mb-6 text-center text-xl font-bold text-orange">
          Recipe {`${id ? "Update" : "Create"}`} Form
        </h1>
        <form className="space-y-5" onSubmit={handleSubmitForm}>
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="title"
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${getErrorMessages("title") ? "border border-red-600" : ""}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {getErrorMessages("title")}
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="description"
              rows={5}
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${getErrorMessages("description") ? "border border-red-600" : ""}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            {getErrorMessages("description")}
          </div>
          <div className="space-y-2">
            <label htmlFor="ingredient" className="font-medium">
              Ingredients
            </label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                name="ingredient"
                id="ingredient"
                placeholder="ingredient"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <IoIosAddCircle
                className="cursor-pointer text-3xl text-orange"
                onClick={handleAddIngredients}
              />
            </div>

            {getErrorMessages("ingredients")}

            <div className="flex flex-wrap gap-1">
              <IngredientCard
                ingredients={ingredients}
                deleteAble={true}
                filteredOut={filteredOut}
              />
            </div>
          </div>
          <Button
            status={isLoading}
            bg={true}
            btnType={"formBtn"}
            type={"submit"}
          >
            {isLoading
              ? id
                ? "Updating ..."
                : "Creating ..."
              : id
                ? "Update"
                : "Create"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
