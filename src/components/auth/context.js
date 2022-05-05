import React, { useState } from "react";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";

export const LoginContext = React.createContext();

const testUsers = {
  admin: {
    password: "password",
    name: "Administrator",
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6eyJwYXNzd29yZCI6InBhc3N3b3JkIiwibmFtZSI6IkFkbWluaXN0cmF0b3IifX0.qysVCmSrwjijUhr-EJZFPPuuG2HhDvavKbaQk7by-qo",
    role: "admin",
    capabilities: ["create", "read", "update", "delete"],
  },
  editor: {
    password: "password",
    name: "Editor",
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlZGl0b3IiOnsicGFzc3dvcmQiOiJwYXNzd29yZCIsIm5hbWUiOiJFZGl0b3IifX0.HopkUTvokxGn_GpNY-e9sfOTYslKIbjBWNDTD6lCVqI",
    role: "editor",
    capabilities: ["read", "update"],
  },
  writer: {
    password: "password",
    name: "Writer",
    token: "yJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ3cml0ZXIiOnsicGFzc3dvcmQiOiJwYXNzd29yZCIsIm5hbWUiOiJXcml0ZXIifX0.g_hayyIxz717Nt-B71nPdzUGMCuVw03jkciFXcYWXm0",
    role: "writer",
    capabilities: ["create"],
  },
};

function LoginProvider({ children }) {
  let [loggedIn, setLoggedIn] = useState(false);
  let [user, setUser] = useState({});
  let [error, setError] = useState(null);

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  const login = async (username, password) => {
    let authCredentials = testUsers[username];

    if (authCredentials && authCredentials.password === password) {
      try {
        _validateToken(authCredentials.token);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const logout = () => {
    setUser({});
    setLoggedIn(false);
    setError(null);
    cookie.remove("auth");
  };

  const _validateToken = (token) => {
    try {
      let user = jwt_decode(token);
      if (user) {
        setUser(user);
        setLoggedIn(true);
        cookie.save("auth", token);
      }
    } catch (e) {
      setLoggedIn(false, null, {});
      setError(e);
    }
  };


  const values = {
    user,
    can,
    loggedIn,
    login,
    logout,
    error,
  };

  return (
    <LoginContext.Provider value={values}>{children}</LoginContext.Provider>
  );
}

export default LoginProvider;
