import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../helpers/axios";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsError(null);
      setIsLoading(true);
      const data = {
        username,
        email,
        password,
        passwordConfirmation,
      };
      const res = await axios.post(`/api/v1/users/register`, data);
      if (res.status >= 200 && res.status < 300) {
        toast.success("registered successfully");
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

  const getErrorMessages = (field) => {
    if (isError) {
      if (isError.message.path === field) {
        return (
          <p className="text-xs font-medium italic text-red-500">
            {isError.message.msg}
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
          Register Form
        </h1>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${getErrorMessages("username") ? "border-red-500" : ""}`}
            id="username"
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {getErrorMessages("username")}
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${getErrorMessages("email") ? "border-red-500" : ""}`}
            id="email"
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {getErrorMessages("email")}
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full rounded border ${getErrorMessages("password") ? "border-red-500" : ""} px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="password"
            name="password"
            type="text"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {getErrorMessages("password")}
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="passwordConfirmation"
          >
            Confirm Password
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full rounded border ${getErrorMessages("passwordConfirmation") ? "border-red-500" : ""} px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none`}
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="text"
            placeholder="******************"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {getErrorMessages("passwordConfirmation")}
        </div>
        <div className="flex flex-col items-center justify-between gap-4">
          <button
            className={`focus:shadow-outline w-full rounded bg-orange px-4 py-2 font-bold text-white hover:bg-amber-600 focus:outline-none ${isLoading ? "cursor-not-allowed" : ""}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering ..." : " Register"}
          </button>
          <div className="flex w-full justify-between gap-2 space-x-2 md:block md:text-center">
            <span className="text-sm">Already have account?</span>
            <Link
              to={"/sign-in"}
              className="inline-block align-baseline text-sm font-bold text-orange hover:text-amber-600"
            >
              Login Here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
