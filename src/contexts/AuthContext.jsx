/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "../helpers/axios";

const AuthContext = createContext();

const initialState = {
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { user: action.payload };
    case "logout":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return initialState;
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [{ user }, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    try {
      axios.get("/api/v1/users/is-auth").then((res) => {
        const user = res.data;
        if (user) {
          dispatch({
            type: "login",
            payload: user,
          });
        } else {
          dispatch({ type: "logout" });
        }
      });
    } catch (error) {
      dispatch({ type: "logout" });
    }
  }, []);

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
