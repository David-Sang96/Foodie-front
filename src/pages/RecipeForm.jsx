import axios from "axios";
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Form, useNavigate } from "react-router-dom";
import IngredientCard from "../components/IngredientCard";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

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

      const newRecipe = {
        title,
        description,
        ingredients,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}`,
        newRecipe,
      );

      if (res.status >= 200 && res.status < 300) {
        navigate("/");
      }
      setTitle("");
      setDescription("");
      setIngredients([]);
    } catch (error) {
      setIsError(error.response.data.errors);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessages = (field) => {
    return isError
      ? isError
          .filter((error) => error.path === field)
          .map((error) => (
            <p key={error.msg} className="text-red-500">
              {error.msg}
            </p>
          ))
      : null;
  };

  return (
    <div className="mx-auto max-w-md rounded-sm border-2 border-white p-4">
      <h1 className="text-orange mb-6 text-center text-2xl font-bold">
        Recipe Create Form
      </h1>
      <Form action="" className="space-y-5" onSubmit={handleSubmitForm}>
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
            className="w-full rounded-md p-2 outline-none"
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
            className="w-full rounded-md p-2 outline-none"
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
              className="text-orange cursor-pointer text-3xl"
              onClick={handleAddIngredients}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            <IngredientCard ingredients={ingredients} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-orange w-full rounded-md py-2 font-medium text-white ${isLoading ? "cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Creating ..." : "Create"}
        </button>
      </Form>
    </div>
  );
};

export default RecipeForm;
