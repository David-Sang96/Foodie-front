import { GiCook } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
    toast.success("logged out successfully!");
  };

  return (
    <nav className="flex items-center justify-between bg-white p-5">
      <div>
        <Link to={"/"} className="flex items-center justify-center gap-1">
          <GiCook className="text-4xl text-orange" />
          <h1 className="text-3xl font-bold text-orange">Recipes</h1>
        </Link>
      </div>
      <ul className="flex space-x-10">
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
        <li>
          <button className="hover:text-orange" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
