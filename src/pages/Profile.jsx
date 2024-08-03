import { format } from "date-fns";
import { useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.jpg";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import fetchErrorMsg from "../components/fetchErrorMsg";
import FileUploadBtn from "../components/FileUploadBtn";
import Loader from "../components/Loader";
import { useAuthContext } from "../contexts/AuthContext";
import axios from "../helpers/axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [imageFromDB, setImageFromDB] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const { createdAt } = user;

  const fetchUser = async () => {
    try {
      setIsError(null);
      setIsLoading(true);
      const res = await axios.get("/api/v1/profile");
      if (res.status >= 200 && res.status < 300) {
        setUser(res.data.user);
        setUsername(res.data.user.username);
      }
      if (res.data.user.photo) {
        setImageFromDB(
          `${import.meta.env.VITE_API_ASSET_URL}${res.data.user.photo}`,
        );
      }
    } catch (error) {
      setIsError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(null);
      setIsLoading(true);

      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      if (file) formData.append("photo", file);
      const res = await axios.patch("/api/v1/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status >= 200 && res.status < 300) {
        setUsername(res.data.data.username);
        toast.success(res.data.message);
        window.location.reload();
      }
      setPassword("");
      setFilePreview(null);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setIsError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const res = await axios.delete("/api/v1/profile");
    if (res.status >= 200 && res.status < 300) {
      localStorage.removeItem("token");
      dispatch({ type: "logout" });
      setIsModalOpen((prev) => !prev);
      navigate("/sign-in");
      toast.success("Deleted successfully!");
    }
  };

  const onChange = (e) => {
    const chosenFile = e.target.files[0];
    setFile(chosenFile);
    const fileReader = new FileReader();
    fileReader.onload = (e) => setFilePreview(e.target.result);
    fileReader.readAsDataURL(chosenFile);
  };

  if (isLoading) return <Loader />;

  const inputClass =
    "focus:shadow-outline mb-3 w-full  rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ";

  const btnClass =
    "item-center focus:shadow-outline flex w-full justify-center rounded bg-orange px-4 py-2 font-bold text-white transition-all duration-500 ease-out hover:bg-amber-600 focus:outline-none";

  return (
    <div className="m-auto mt-5 w-full max-w-md">
      <div className="flex justify-end pb-1">
        <Button btnType={"back"} />
      </div>
      <form
        className="rounded bg-white p-2 shadow-md md:px-8 md:pb-8 md:pt-3"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <img
          src={imageFromDB || avatar}
          alt={"image"}
          className="mx-auto h-20 w-20 rounded-full border-2 border-orange object-cover"
        />

        <div className="mt-2 flex items-center justify-between">
          <h1 className="mb-1 text-xl font-bold text-orange">Your Profile</h1>
          <RiDeleteBin5Fill
            className="cursor-pointer text-xl text-orange md:text-2xl"
            title="delete"
            onClick={() => setIsModalOpen((prev) => !prev)}
          />
        </div>
        <p className="mb-2 text-sm font-medium">
          <span> Created on : </span>
          {createdAt
            ? `${format(createdAt, "MM-dd-yyyy")} ( ${format(createdAt, "h:mm aa")} )`
            : "N/A"}
        </p>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700 md:text-base"
            htmlFor="username"
          >
            Your Name
          </label>
          <input
            className={twMerge(
              inputClass,
              fetchErrorMsg("username") ? "border-red-500" : "",
            )}
            id="username"
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {fetchErrorMsg("username", isError)}
        </div>
        <div>
          <label
            className="mb-2 block text-sm font-bold text-gray-700 md:text-base"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={twMerge(
              inputClass,
              fetchErrorMsg("password") ? "border-red-500" : "",
            )}
            id="password"
            name="password"
            type="text"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {fetchErrorMsg("password", isError)}
        </div>
        <div className="flex items-center justify-between">
          <div className="my-4 text-sm font-medium text-gray-700 transition-all duration-500 ease-out hover:text-orange md:text-base">
            <Link to={"/user/profile/update"}>Update Password Here</Link>
          </div>
          <div className="space-y-2">
            {fetchErrorMsg("photo", isError)}
            <FileUploadBtn onChange={onChange} require={false} />
          </div>
        </div>
        {filePreview && (
          <div className="mt-4">
            <img
              src={filePreview}
              alt={"image"}
              className="mx-auto h-36 rounded-md"
            />
          </div>
        )}
        <div className="mt-4 flex flex-col items-center justify-between gap-4">
          <button
            className={twMerge(btnClass, isLoading ? "cursor-not-allowed" : "")}
            type="submit"
            disabled={isLoading}
          >
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
            {isLoading ? "Updating ..." : " Update Profile"}
          </button>
        </div>
      </form>
      {isModalOpen && (
        <ConfirmModal
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
          name={"Delete Account"}
        >
          Are you sure you want to delete your account? All of your data will be
          permanently removed. This action cannot be undone.
        </ConfirmModal>
      )}
    </div>
  );
};

export default Profile;
