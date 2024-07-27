/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const user = {
    name: "david",
  };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside AuthContextProvider");
  }
  return context;
};

export { AuthContextProvider, useAuthContext };
