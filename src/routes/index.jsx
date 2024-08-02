import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import Detail from "../pages/Detail.jsx";
import ForgotPasswordForm from "../pages/ForgotPasswordForm.jsx";
import Home from "../pages/Home.jsx";
import LoginForm from "../pages/LoginForm.jsx";
import PasswordResetForm from "../pages/PasswordResetForm.jsx";
import Profile from "../pages/Profile.jsx";
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
          element: user ? <Home /> : <LoginForm />,
        },
        {
          path: "/recipes/create",
          element: user ? <RecipeForm /> : <LoginForm />,
        },
        {
          path: "/recipes/edit/:id",
          element: user ? <RecipeForm /> : <LoginForm />,
        },
        {
          path: "/recipes/:id",
          element: user ? <Detail /> : <LoginForm />,
        },
        {
          path: "/user/profile",
          element: user ? <Profile /> : <LoginForm />,
        },
        {
          path: "/sign-up",
          element: !user ? <SignUpForm /> : <Home />,
        },
        {
          path: "/sign-in",
          element: !user ? <LoginForm /> : <Home />,
        },
        {
          path: "/forgot-password",
          element: !user ? <ForgotPasswordForm /> : <Home />,
        },
        {
          path: "/reset-password/:resetToken",
          element: !user ? <PasswordResetForm /> : <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Index;
