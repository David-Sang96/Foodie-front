import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import fetchErrorMsg from "../components/fetchErrorMsg";
import { useAuthContext } from "../contexts/AuthContext";
import axios from "../helpers/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(null);
      setIsLoading(true);
      const data = {
        email,
        password,
      };
      const res = await axios.post(`/api/v1/users/log-in`, data);
      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem("token", res.data.token);
        dispatch({ type: "login", payload: res.data.user });
        toast.success("logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("something went wrong");
        setIsError(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-auto mt-10 w-full max-w-md">
      <form
        className="mb-4 rounded bg-white p-3 shadow-md md:px-8 md:pb-8 md:pt-6"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-center text-xl font-bold text-orange">
          LogIn Form
        </h1>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${fetchErrorMsg("email") ? "border-red-500" : ""}`}
            id="email"
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fetchErrorMsg("email", isError)}
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${fetchErrorMsg("password") ? "border-red-500" : ""}`}
            id="password"
            name="password"
            type="text"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {fetchErrorMsg("password", isError)}
        </div>
        <div className="flex flex-col items-center justify-between gap-4">
          <Link
            to={"/forgot-password"}
            className="inline-block align-baseline text-sm font-bold text-orange hover:text-amber-600"
          >
            Forget password?
          </Link>
          <button
            disabled={isLoading}
            className={`item-center focus:shadow-outline flex w-full justify-center rounded bg-orange px-4 py-2 font-bold text-white hover:bg-amber-600 focus:outline-none ${isLoading ? "cursor-not-allowed" : ""}`}
            type="submit"
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
            {isLoading ? "Logging In ..." : " Login"}
          </button>
          <div className="flex w-full justify-between gap-2 space-x-2 md:block md:text-center">
            <span className="text-sm"> Don&apos;t have account?</span>
            <Link
              to={"/sign-up"}
              className="inline-block align-baseline text-sm font-bold text-orange hover:text-amber-600"
            >
              Signup
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
