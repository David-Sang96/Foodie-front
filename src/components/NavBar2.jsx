import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiCook } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import avatar from "../assets/avatar.jpg";
import { useAuthContext } from "../contexts/AuthContext";
import axios from "../helpers/axios.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const LoggedLinks = [
    { name: "Profile", to: "/user/profile" },
    { name: "Home", to: "/" },
    { name: "Create", to: "/recipes/create" },
  ];

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/v1/users/log-out");
      if (res.status >= 200 && res.status < 300) {
        localStorage.removeItem("token");
        dispatch({ type: "logout" });
        setOpen((prev) => !prev);
        navigate("/sign-in");
        toast.success("logged out successfully!");
      }
    } catch (error) {
      toast.error(toast.error(`${error.response.data.message}`));
    }
  };

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"))?.photo;
    setImage(localUser);
  }, [user]);

  return (
    <nav className="sticky right-0 top-0 w-full">
      <div className="items-center justify-between bg-white px-3 py-3 md:flex md:px-5">
        <div className="flex items-center gap-5">
          <Link to={"/"} className="flex cursor-pointer items-center gap-1">
            <GiCook className="text-3xl text-orange md:text-4xl" />
            <h1 className="text-xl font-bold text-orange md:text-3xl">
              Recipes
            </h1>
          </Link>
          <img
            src={
              image ? `${import.meta.env.VITE_API_ASSET_URL}${image}` : avatar
            }
            alt="profile image"
            className="h-10 w-10 rounded-full border-2 border-orange object-cover md:hidden"
          />
        </div>
        {user !== null && (
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="absolute right-3 top-4 cursor-pointer text-3xl text-orange md:hidden"
          >
            {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
          </div>
        )}
        <ul
          className={`absolute left-0 w-full py-10 text-orange backdrop-blur-lg transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:space-x-4 md:py-0 md:pb-0 md:pl-0 ${open ? "top-14" : "top-[-490px]"}`}
        >
          {user !== null && (
            <>
              <img
                src={
                  image
                    ? `${import.meta.env.VITE_API_ASSET_URL}${image}`
                    : avatar
                }
                alt="profile image"
                className="hidden h-12 w-12 rounded-full border-2 border-orange object-cover md:block"
              />
              {LoggedLinks.map((link) => (
                <li
                  key={link.name}
                  className="pb-4 pr-16 text-end font-bold text-orange md:pb-0 md:pr-0 md:text-lg md:font-normal md:text-black"
                >
                  <NavLink
                    to={link.to}
                    className="transition-all duration-500 ease-out hover:text-orange"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <li className="pr-10 text-end md:pr-0 md:text-lg">
                <button
                  className="btn rounded bg-orange px-3 py-1 font-semibold text-white duration-500 md:static md:font-normal"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        {/* button */}
      </div>
    </nav>
  );
};

export default Navbar;
