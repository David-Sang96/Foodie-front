import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import fetchErrorMsg from "../components/fetchErrorMsg";
import axios from "../helpers/axios";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(null);
      setIsLoading(true);
      const res = await axios.post("/api/v1/users/forgot-password", { email });

      if (res.status >= 200 && res.status < 300) {
        toast.success("Check your email");
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setIsError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-9 sm:w-[500px]">
      <form
        className="mb-4 rounded bg-white p-3 shadow-md md:px-8 md:pb-8 md:pt-6"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4">
          Please Enter your email address to reset the password
        </h2>

        <input
          className={`focus:shadow-outline mb-3 w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${fetchErrorMsg("email") ? "border-red-500" : ""}`}
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {fetchErrorMsg("email", isError)}
        <div className="flex justify-end gap-3">
          <button
            className="rounded border border-orange bg-transparent px-4 py-1 font-semibold text-orange hover:border-transparent hover:bg-orange hover:text-white"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded border border-orange bg-orange px-4 py-1 font-bold text-white"
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
              {isLoading ? "Sending ..." : "Send"}
            </div>{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
