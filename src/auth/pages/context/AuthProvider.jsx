import React, { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "./types";

const AuthProvider = ({ children }) => {
  const initialState = {
    logged: false,
  };

  const init = () => {
    return { logged: true, user: null };
  };

  const [authState, dispatch] = useReducer(authReducer, initialState, init);

  const login = () => {
    const action = {
      type: types.login,
      payload: {
        id: "1",
        name: "Aika",
      },
    };

    localStorage.setItem("user", JSON.stringify(action.payload));
    // dispatch(action);
  };

  const logout = () => {
    const action = {
      type: types.logout,
    };

    localStorage.removeItem("user");
    // dispatch(action);
  };

  return (
    <AuthContext.Provider value={{ authState, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
