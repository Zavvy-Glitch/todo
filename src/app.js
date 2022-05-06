import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import ToDo from "./components/todo/todo.js";
import Items from "./components/items/items.js";
import UserSettings from "./components/todo/useSettings.js";
import Auth from "./components/auth/auth.js";
import Login from "./components/auth/login.js";
import LoginContext from "./components/auth/context.js";

export default function App() {
  const [incomplete, setIncomplete] = useState();
  const [list, setList] = useState([]);

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incompleteCount}`;
  }, [list]);

  return (
    <>
      <LoginContext>
        <Login />

        <Auth>
          <div>Any valid user can see this</div>
        </Auth>

        <Auth capability="create">
          <div>Users with create access can see this</div>
        </Auth>

        <Auth capability="update">
          <div>Users with update access can see this</div>
        </Auth>

        <Auth capability="delete">
          <div>Users with delete access can see this</div>
        </Auth>
      </LoginContext>

      <BrowserRouter>
        <Link to="/todo">Home Page</Link>
        <Link to="/settings">Settings</Link>
        <Routes>
          <Route path="/settings" element={<UserSettings />} />
          <Route
            path="/todo"
            element={
              <ToDo
                incomplete={incomplete} 
                setIncomplete={setIncomplete}
                setList={setList}
                list={list}
              />
            }
          />
        </Routes>
      </BrowserRouter>

      <Items list={list} setList={setList} />
    </>
  );
}
