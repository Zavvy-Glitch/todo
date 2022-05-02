import React, { useEffect, useState } from "react";

import ToDo from "./components/todo/todo.js";
import Header from "./components/todo/header.js";
import Items from "./components/todo/items.js";
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
        <Header incomplete={incomplete} />
        <UserSettings />
        <ToDo setIncomplete={setIncomplete} setList={setList} list={list} />
        <Items list={list} setList={setList} />
    </>
  );
}
