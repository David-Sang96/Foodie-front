import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="m-auto w-full max-w-md">
      <form className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
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
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="email"
            name="email"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="focus:shadow-outline rounded bg-orange px-4 py-2 font-bold text-white hover:bg-amber-600 focus:outline-none"
            type="submit"
          >
            Login
          </button>
          <div className="flex flex-col items-end">
            <Link
              to={"/forgot-password"}
              className="inline-block align-baseline text-sm font-bold text-orange hover:text-amber-600"
            >
              forget password?
            </Link>

            <Link
              to={"/sign-up"}
              className="inline-block align-baseline text-sm font-bold text-orange hover:text-amber-600"
            >
              Don&apos;t have account? Register here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
