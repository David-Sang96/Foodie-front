import { useCallback, useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../helpers/axios";

import { toast } from "react-toastify";
import { default as BackBtn, default as Button } from "../components/Button";
import FileUploadBtn from "../components/FileUploadBtn";
import IngredientCard from "../components/IngredientCard";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const getRecipe = useCallback(async (id) => {
    try {
      setIsError(null);
      setIsLoading(true);
      const res = await axios.get(`/api/v1/recipes/${id}`);
      if (res.status >= 200 && res.status < 300) {
        const { title, description, ingredients, photo } = res.data;
        setTitle(title);
        setDescription(description);
        setIngredients(ingredients);
        setFilePreview(`${import.meta.env.VITE_API_URL}${photo}`);
      }
    } catch (error) {
      setIsError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      getRecipe(id);
    } else {
      setTitle("");
      setDescription("");
      setIngredients([]);
      setIsError(null);
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
      setIsError(null);
      setIsLoading(true);

      const recipe = {
        title,
        description,
        ingredients,
      };
      const res = id
        ? await axios.patch(`/api/v1/recipes/${id}`, recipe)
        : await axios.post(`/api/v1/recipes`, recipe);

      // upload the image
      const formData = new FormData();
      formData.set("photo", file);

      await axios.post(`/api/v1/recipes/${res.data._id}/upload`, formData, {
        headers: {
          Accept: "multipart/form-data",
        },
      });

      if (res.status >= 200 && res.status < 300) {
        toast.success(`${id ? "updated recipe" : "created recipe"}`);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setIsError(error.response.data);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
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
    fileReader.onload = (e) => {
      setFilePreview(e.target.result);
    };
    fileReader.readAsDataURL(chosenFile);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="flex justify-end pb-1">
        <BackBtn btnType={"back"} />
      </div>
      <div className="mb-4 rounded border-2 border-white bg-white p-4 px-8 pb-8 pt-6 shadow-md">
        <h1 className="mb-2 text-center text-xl font-bold text-orange">
          Recipe {`${id ? "Update" : "Create"}`} Form
        </h1>
        <form className="mt-3 space-y-4" onSubmit={handleSubmitForm}>
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
              rows={4}
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
            {getErrorMessages("ingredients")}
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
            <FileUploadBtn onChange={uploadImage} />
            {filePreview && (
              <div className="mt-4">
                <img src={filePreview} alt={"image"} className="rounded-md" />
              </div>
            )}
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
