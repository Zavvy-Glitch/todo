import React, { useState, useContext } from "react";
import { When } from "react-if";

import { LoginContext } from "./context.js";

function Login () {

  const { loggedIn, login, logout } = useContext(LoginContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleChange = (e) => {
    let {name, value} = e.target;
    if(name === 'username') setUsername(value);
    if(name === 'password') setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };
    return (
      <>
        <When condition={loggedIn}>
          <button onClick={logout}>Log Out</button>
        </When>

        <When condition={!loggedIn}>
          <form onSubmit={handleSubmit}>
            <input
              data-testid="username"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              data-testid="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button type ="submit">Login</button>
          </form>
        </When>
      </>
    );
  }

export default Login;
