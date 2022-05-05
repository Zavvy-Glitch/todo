import React, { useContext } from "react";
import { When } from "react-if";

import { LoginContext } from "./context.js";

function Auth({ capability, children }) {
  const { loggedIn, can } = useContext(LoginContext);

  return <When condition={loggedIn && can(capability)}>{children}</When>;
}

export default Auth;
