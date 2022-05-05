import React, { useState } from "react";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";

export const LoginContext = React.createContext();

const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
  Writer: {
    password: "writer",
    name: "Writer",
    token: "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IndyaXRlciIsIm5hbWUiOiJXcml0ZXIifQ.q9egPAo_gMcXnoikO-DP5Z_9f9vh4bwbvQLTM_t8mdM",
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

  const logout = () => {
    setUser({});
    setLoggedIn(false);
    setError(null);
    cookie.remove("auth");
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
