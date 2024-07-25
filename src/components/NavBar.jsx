import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-5">
      <div>
        <Link to={"/"}>
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
      </ul>
    </nav>
  );
};

export default Navbar;
