import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Home from "../pages/Home.jsx";
import LoginForm from "../pages/LoginForm.jsx";
import RecipeForm from "../pages/RecipeForm.jsx";
import SignUpForm from "../pages/SignUpForm.jsx";

const Index = () => {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: user ? <Home /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/about",
          element: user ? <About /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/contact",
          element: user ? <Contact /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/recipes/create",
          element: user ? <RecipeForm /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/recipes/edit/:id",
          element: user ? <RecipeForm /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/sign-up",
          element: !user ? <SignUpForm /> : <Navigate to={"/"} />,
        },
        {
          path: "/sign-in",
          element: !user ? <LoginForm /> : <Navigate to={"/"} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Index;
