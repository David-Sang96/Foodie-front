import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";

import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import RecipeForm from "./pages/RecipeForm.jsx";
import SignUpForm from "./pages/SignUpForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/recipes/create",
        element: <RecipeForm />,
      },
      {
        path: "/recipes/edit/:id",
        element: <RecipeForm />,
      },
      {
        path: "/sign-up",
        element: <SignUpForm />,
      },
      {
        path: "/sign-in",
        element: <LoginForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
);
