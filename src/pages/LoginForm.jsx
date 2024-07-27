import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../helpers/axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(null);
      setIsLoading(true);
      const data = {
        email,
        password,
      };
      const res = await axios.post(`/users/log-in`, data);
      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem("token", res.data.token);
        toast.success("logged in successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setIsError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (field) => {
    if (isError && isError.message) {
      // Check if `isError.message` is an object and has `path` and `msg`
      if (
        typeof isError.message === "object" &&
        isError.message.path === field
      ) {
        return (
          <p className="text-xs font-medium italic text-red-500">
            {isError.message.msg}
          </p>
        );
      } else if (typeof isError.message === "string") {
        return (
          <p className="text-xs font-medium italic text-red-500">
            {isError.message}
          </p>
        );
      }
    }
    return null;
  };

  return (
    <div className="m-auto w-full max-w-md">
      <form
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-center text-xl font-bold text-orange">
          LogIn Form
        </h1>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${getErrorMessage("email") ? "border-red-500" : ""}`}
            id="email"
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {getErrorMessage("email")}
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${getErrorMessage("password") ? "border-red-500" : ""}`}
            id="password"
            name="password"
            type="text"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {getErrorMessage("password")}
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
            className={`focus:shadow-outline w-full rounded bg-orange px-4 py-2 font-bold text-white hover:bg-amber-600 focus:outline-none ${isLoading ? "cursor-not-allowed" : ""}`}
            type="submit"
          >
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
