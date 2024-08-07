import { useCallback, useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { default as BackBtn, default as Button } from "../components/Button";
import FileUploadBtn from "../components/FileUploadBtn";
import IngredientCard from "../components/IngredientCard";
import useApiRequest from "../hooks/useApiRequest";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isError, isLoading, apiRequest } = useApiRequest();

  const getRecipe = useCallback(
    async (id) => {
      try {
        const options = {
          method: "get",
          url: `/api/v1/recipes/${id}`,
        };
        const res = await apiRequest(options);
        const { title, description, ingredients, photo } = res;
        setTitle(title);
        setDescription(description);
        setIngredients(ingredients);
        setFilePreview(photo);
      } catch (error) {
        console.error("Failed to getRecipe: ", error);
      }
    },
    [apiRequest],
  );

  useEffect(() => {
    if (id) {
      getRecipe(id);
    } else {
      setTitle("");
      setDescription("");
      setIngredients([]);
      setFilePreview(null);
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
      if (title.length < 5)
        return toast.error("title must be at least 5 words");

      if (title === "" || description === "" || ingredients.length < 3) {
        return toast.error(
          "Please fill up all fields and at least 3 ingredients",
        );
      }
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("ingredients", JSON.stringify(ingredients));

      const options = {
        method: "patch",
        url: `/api/v1/recipes/${id}`,
        data: formData,
      };

      const options1 = {
        method: "post",
        url: `/api/v1/recipes`,
        data: formData,
      };

      id
        ? await apiRequest(options, "updated recipe")
        : await apiRequest(options1, "created recipe");
      id ? navigate("/recipes/my-recipes") : navigate("/");
    } catch (error) {
      console.error("Failed to create or update recipe: ", error);
    }
  };

  const getErrorMessages = (field) => {
    if (isError) {
      if (
        typeof isError.message === "object" &&
        isError.message.path === field
      ) {
        return (
          <p className="text-xs font-medium italic text-red-500">
            {isError.message.msg}
          </p>
        );
      }
    }
    return null;
  };

  const filteredOut = (index) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImage = (e) => {
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
    const fileReader = new FileReader();
    fileReader.onload = (e) => setFilePreview(e.target.result);
    fileReader.readAsDataURL(chosenFile);
  };

  const inputClass =
    "focus:shadow-outline w-full rounded border p-2 text-sm leading-tight text-gray-700 shadow focus:outline-none md:px-3 md:py-2 md:text-base";

  return (
    <div className="mx-auto mt-4 max-w-md">
      <div className="flex justify-end pb-1">
        <BackBtn btnType={"back"} />
      </div>
      <div className="mb-4 rounded border-2 border-white bg-white p-2 shadow-md md:p-4">
        <h1 className="mb-2 text-center text-lg font-bold text-orange md:text-xl">
          Recipe {`${id ? "Update" : "Create"}`} Form
        </h1>
        <form
          className="mt-3 space-y-3 md:space-y-4"
          onSubmit={handleSubmitForm}
          encType="multipart/form-data"
        >
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-bold text-gray-700"
            >
              Title
            </label>
            <input
              required
              type="text"
              name="title"
              id="title"
              placeholder="title"
              className={twMerge(
                inputClass,
                getErrorMessages("title") ? "border border-red-600" : "",
              )}
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
              rows={4}
              className={twMerge(
                inputClass,
                getErrorMessages("description") ? "border border-red-600" : "",
              )}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            {getErrorMessages("description")}
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
                className={inputClass}
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
              <IoIosAddCircle
                className="cursor-pointer text-2xl text-orange md:text-3xl"
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

          {getErrorMessages("photo")}
          <div>
            <FileUploadBtn onChange={uploadImage} require={true} />
            {filePreview && (
              <div className="mt-4">
                <img
                  src={filePreview}
                  alt={"image"}
                  className="mx-auto h-36 rounded-md"
                />
              </div>
            )}
          </div>

          <Button
            status={isLoading}
            bg={true}
            btnType={"formBtn"}
            type={"submit"}
          >
            <div className="flex items-center justify-center text-sm font-bold md:text-base">
              {isLoading && (
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {isLoading
                ? id
                  ? "Updating ..."
                  : "Creating ..."
                : id
                  ? "Update"
                  : "Create"}
            </div>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
