import { useState } from "react";
import { useParams } from "react-router-dom";

import fetchErrorMsg from "../components/fetchErrorMsg";
import useApiRequest from "../hooks/useApiRequest";

const PasswordResetForm = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { resetToken } = useParams();
  const { isError, isLoading, apiRequest } = useApiRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "patch",
        url: `/api/v1/users/reset-password/${resetToken}`,
        data: { password, passwordConfirmation },
      };
      await apiRequest(options, "Success! please log in again.");
    } catch (error) {
      console.error("Failed to reset password: ", error);
    }
  };

  return (
    <div className="mx-auto mt-9 sm:w-[500px]">
      <form
        className="rounded bg-white p-3 shadow-md md:px-8 md:pb-8 md:pt-6"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4">Please Enter your new password</h2>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full rounded border ${fetchErrorMsg("password") ? "border-red-500" : ""} px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="password"
            name="password"
            type="text"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {fetchErrorMsg("password", isError)}
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="passwordConfirmation"
          >
            Confirm Password
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full rounded border ${fetchErrorMsg("passwordConfirmation") ? "border-red-500" : ""} px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="text"
            placeholder="******************"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {fetchErrorMsg("passwordConfirmation", isError)}
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded border border-orange bg-orange px-4 py-2 font-bold text-white outline-none"
          >
            <div className="flex items-center justify-center text-sm md:text-base">
              {isLoading && (
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin"
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
              {isLoading ? "Submitting ..." : "Submit"}
            </div>{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetForm;
