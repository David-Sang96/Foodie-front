import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import Button from "../components/Button";
import fetchErrorMsg from "../components/fetchErrorMsg";
import { useAuthContext } from "../contexts/AuthContext";
import useApiRequest from "../hooks/useApiRequest";

const PasswordUpdateForm = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const { isError, isLoading, apiRequest } = useApiRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "patch",
        url: "api/v1/users/update-my-password",
        data: { password, newPassword, passwordConfirmation },
      };

      const res = await apiRequest(
        options,
        "Successfully Updated the password.Please log in again!",
      );
      if (res) {
        localStorage.removeItem("token");
        dispatch({ type: "logout" });
        navigate("/sign-in");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputClass =
    "focus:shadow-outline mb-3 w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ";

  const btnClass =
    "item-center focus:shadow-outline flex w-full justify-center rounded bg-orange px-4 py-2 font-bold text-white transition-all duration-500 ease-out hover:bg-amber-600 focus:outline-none ";

  return (
    <div className="m-auto mt-5 w-full max-w-md">
      <div className="flex justify-end pb-1">
        <Button btnType={"back"} />
      </div>
      <form
        className="mb-4 rounded bg-white p-2 shadow-md md:px-8 md:pb-8 md:pt-6"
        onSubmit={handleSubmit}
      >
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
        <div>
          <label
            className="my-2 block text-sm font-bold text-gray-700 md:text-base"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className={twMerge(
              inputClass,
              fetchErrorMsg("password") ? "border-red-500" : "",
            )}
            id="newPassword"
            name="newPassword"
            type="text"
            placeholder="******************"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {fetchErrorMsg("newPassword", isError)}
        </div>
        <div className="mb-6">
          <label
            className="my-2 block text-sm font-bold text-gray-700"
            htmlFor="passwordConfirmation"
          >
            Confirm Password
          </label>
          <input
            className={twMerge(
              inputClass,
              fetchErrorMsg("passwordConfirmation") ? "border-red-500" : "",
            )}
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="text"
            placeholder="******************"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {fetchErrorMsg("passwordConfirmation", isError)}
        </div>

        <div className="flex flex-col items-center justify-between gap-4">
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
            {isLoading ? "Submitting ..." : " Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordUpdateForm;
