import { GiCook } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
    navigate("/sign-in");
    toast.success("logged out successfully!");
  };

  return (
    <nav className="sticky top-0 flex items-center justify-between p-5 backdrop-blur-md">
      <div>
        <Link to={"/"} className="flex items-center justify-center gap-1">
          <GiCook className="text-xl text-orange md:text-4xl" />
          <h1 className="text-xl font-bold text-orange md:text-3xl">Recipes</h1>
        </Link>
      </div>
      <ul className="flex space-x-10">
        {user !== null && (
          <>
            <li>
              <NavLink to={"/"} className="hover:text-orange">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/about"} className="hover:text-orange">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to={"/contact"} className="hover:text-orange">
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to={"/recipes/create"} className="hover:text-orange">
                Create Recipe
              </NavLink>
            </li>
          </>
        )}
        {user === null && (
          <>
            <li>
              <NavLink to={"/sign-up"} className="hover:text-orange">
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to={"/sign-in"} className="hover:text-orange">
                Login
              </NavLink>
            </li>
          </>
        )}

        {user !== null && (
          <li>
            <button className="hover:text-orange" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
