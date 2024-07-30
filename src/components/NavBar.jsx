import { GiCook } from "react-icons/gi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useAuthContext();

  const LoggedLinks = [
    { name: "Home", to: "/" },
    { name: "Create", to: "/recipes/create" },
  ];

  const unLoggedLinks = [
    { name: "Register", to: "/sign-up" },
    { name: "Login", to: "/sign-in" },
  ];

  const handleLogout = () => {
    dispatch({ type: "logout" });
    navigate("/sign-in");
    toast.success("logged out successfully!");
  };

  return (
    <nav className="sticky top-0 flex items-center justify-between p-3 backdrop-blur-md md:p-5">
      <div>
        <Link to={"/"} className="flex items-center justify-center gap-1">
          <GiCook className="text-3xl text-orange md:text-4xl" />
          <h1 className="hidden text-xl font-bold text-orange md:block md:text-2xl">
            Recipes
          </h1>
        </Link>
      </div>

      <ul className="flex items-center justify-center md:space-x-10">
        {user === null && (
          <>
            {unLoggedLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.to} className="hover:text-orange">
                  {link.name}
                </NavLink>
              </li>
            ))}
          </>
        )}

        {user !== null && (
          <>
            {LoggedLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.to} className="hover:text-orange">
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li>
              <button className="hover:text-orange" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
