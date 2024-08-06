import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineProfile } from "react-icons/ai";
import { BiSolidBookmarkHeart } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { GiCook } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { SlLogout } from "react-icons/sl";
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
    { name: "Home", to: "/", icon: <IoHome /> },
    {
      name: "MyRecipes",
      to: "/recipes/my-recipes",
      icon: <AiOutlineProfile />,
    },
    {
      name: "Favorite",
      to: "/recipes/favorite",
      icon: <BiSolidBookmarkHeart />,
    },
    {
      name: "Create",
      to: "/recipes/create",
      icon: <MdOutlineCreateNewFolder />,
    },
    { name: "Profile", to: "/user/profile", icon: <CgProfile /> },
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
      <div className="items-center justify-between bg-white px-3 py-3 lg:flex lg:px-5">
        <div className="flex items-center gap-5">
          <Link to={"/"} className="flex cursor-pointer items-center gap-1">
            <GiCook className="text-3xl text-orange md:text-4xl" />
            <h1 className="text-xl font-bold text-orange md:text-3xl">
              Foodie
            </h1>
          </Link>
          <img
            src={image ? image : avatar}
            alt="profile image"
            className="h-10 w-10 rounded-full border-2 border-orange object-cover md:h-12 md:w-12 lg:hidden"
          />
        </div>
        {user !== null && (
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="absolute right-3 top-4 cursor-pointer text-3xl text-orange md:text-4xl lg:hidden"
          >
            {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
          </div>
        )}
        <ul
          className={`absolute left-0 w-full py-10 text-orange backdrop-blur-xl transition-all duration-500 ease-in lg:static lg:z-auto lg:flex lg:w-auto lg:items-center lg:space-x-4 lg:py-0 lg:pb-0 lg:pl-0 ${open ? "top-14" : "top-[-490px]"}`}
        >
          {user !== null && (
            <>
              <img
                src={image ? image : avatar}
                alt="profile image"
                className="mr-6 hidden h-12 w-12 rounded-full border-2 border-orange object-cover lg:block"
              />
              {LoggedLinks.map((link) => (
                <li
                  key={link.name}
                  className="pb-4 pr-16 font-bold text-orange lg:pb-0 lg:pr-0 lg:text-lg lg:font-normal lg:text-black"
                >
                  <NavLink
                    to={link.to}
                    className="flex items-center justify-end gap-1 transition-all duration-500 ease-out hover:text-orange"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <div className="text-xl"> {link.icon}</div>
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <li className="pr-14 text-end lg:pr-0 lg:text-lg" title="logout">
                <button
                  className="btn rounded text-2xl font-extrabold text-orange duration-500 hover:text-orange lg:static lg:font-normal lg:text-black"
                  onClick={handleLogout}
                >
                  <SlLogout />
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
