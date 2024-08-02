import { useEffect, useState } from "react";

import { format } from "date-fns";
import Button from "../components/Button";
import fetchErrorMsg from "../components/fetchErrorMsg";
import Loader from "../components/Loader";
import axios from "../helpers/axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const { createdAt } = user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsError(null);
        setIsLoading(true);
        const res = await axios.get("/api/v1/profile");
        if (res.status >= 200 && res.status < 300) {
          setUser(res.data.user);
          setUsername(res.data.user.username);
        }
      } catch (error) {
        setIsError(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoading) return <Loader />;

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
          <h1 className="mb-1 text-xl font-bold text-orange">
            Your Profile Details
          </h1>
          <p className="mb-3 text-sm">
            <span> Created on : </span>
            {createdAt
              ? `${format(createdAt, "MM-dd-yyyy")} ( ${format(createdAt, "h:mm aa")} )`
              : "N/A"}
          </p>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Your Name
          </label>
          <input
            className={`focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${fetchErrorMsg("username") ? "border-red-500" : ""}`}
            id="username"
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {fetchErrorMsg("username", isError)}
        </div>
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

        <div className="flex flex-col items-center justify-between gap-4">
          <button
            className={`item-center focus:shadow-outline flex w-full justify-center rounded bg-orange px-4 py-2 font-bold text-white hover:bg-amber-600 focus:outline-none ${isLoading ? "cursor-not-allowed" : ""}`}
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
          {/* <div className="flex w-full justify-between gap-2 space-x-2 md:block md:text-center">
        <span className="text-sm">Already have account?</span>
        <Link
          to={"/sign-in"}
          className="inline-block align-baseline text-sm font-bold text-orange hover:text-amber-600"
        >
          Login Here
        </Link>
      </div> */}
        </div>
      </form>
    </div>
  );
};

export default Profile;
