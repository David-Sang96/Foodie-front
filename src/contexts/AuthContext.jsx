/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "../helpers/axios";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  image: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "logout":
      localStorage.removeItem("user");
      return initialState;
    case "setImage":
      return { ...state, image: action.payload };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [{ user, image }, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/v1/users/is-auth");
        const localUser = JSON.parse(localStorage.getItem("user"));
        if (res.data && localUser) {
          dispatch({ type: "login", payload: res.data });
        } else {
          dispatch({ type: "logout" });
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        dispatch({ type: "logout" });
      }
    };

    checkAuth();
  }, [image]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthContextProvider");
  }
  return context;
};

export { AuthContextProvider, useAuthContext };
