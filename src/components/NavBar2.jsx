import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiCook } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const LoggedLinks = [
    { name: "Home", to: "/" },
    { name: "Create", to: "/recipes/create" },
  ];

  const handleLogout = () => {
    dispatch({ type: "logout" });
    setOpen((prev) => !prev);
    navigate("/sign-in");
    toast.success("logged out successfully!");
  };

  return (
    <nav className="sticky left-0 top-0 w-full">
      <div className="items-center justify-between bg-white px-3 py-4 md:flex md:px-10">
        {/* logo section */}
        <Link to={"/"} className="flex cursor-pointer items-center gap-1">
          <GiCook className="text-3xl text-orange md:text-4xl" />
          <h1 className="text-xl font-bold text-orange md:text-2xl">Recipes</h1>
        </Link>
        {user !== null && (
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="absolute right-3 top-4 cursor-pointer text-3xl text-orange md:hidden"
          >
            {open ? <AiOutlineClose /> : <HiMenuAlt3 />}
          </div>
        )}
        <ul
          className={`absolute left-0 w-full py-12 pl-9 text-orange backdrop-blur-lg transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:py-0 md:pb-0 md:pl-0 ${open ? "top-12" : "top-[-490px] md:space-x-10"}`}
        >
          {user !== null && (
            <>
              {LoggedLinks.map((link) => (
                <li key={link.name} className="pb-4 font-bold md:pb-0">
                  <NavLink
                    to={link.to}
                    className="hover:text-orange"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  className="btn rounded bg-orange px-3 py-1 font-semibold text-white duration-500 md:static md:ml-8"
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
