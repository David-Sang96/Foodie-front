import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Loader from "../components/Loader.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import Detail from "../pages/Detail.jsx";
import Favorite from "../pages/Favorite.jsx";
import ForgotPasswordForm from "../pages/ForgotPasswordForm.jsx";
import Home from "../pages/Home.jsx";
import LoginForm from "../pages/LoginForm.jsx";
import MyRecipes from "../pages/MyRecipes.jsx";
import PasswordResetForm from "../pages/PasswordResetForm.jsx";
import PasswordUpdateForm from "../pages/PasswordUpdateForm.jsx";
import Profile from "../pages/Profile.jsx";
import RecipeForm from "../pages/RecipeForm.jsx";
import SignUpForm from "../pages/SignUpForm.jsx";

const App = lazy(() => import("../App.jsx"));

const Index = () => {
  const { user } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: user ? <Home /> : <Navigate to={"/sign-in"} />,
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
          path: "/recipes/:id",
          element: user ? <Detail /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/user/profile",
          element: user ? <Profile /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/user/profile/update",
          element: user ? <PasswordUpdateForm /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/recipes/favorite",
          element: user ? <Favorite /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/recipes/my-recipes",
          element: user ? <MyRecipes /> : <Navigate to={"/sign-in"} />,
        },
        {
          path: "/sign-up",
          element: !user ? <SignUpForm /> : <Navigate to={"/"} />,
        },
        {
          path: "/sign-in",
          element: !user ? <LoginForm /> : <Navigate to={"/"} />,
        },
        {
          path: "/forgot-password",
          element: !user ? <ForgotPasswordForm /> : <Navigate to={"/"} />,
        },
        {
          path: "/reset-password/:resetToken",
          element: !user ? <PasswordResetForm /> : <Navigate to={"/"} />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Index;
