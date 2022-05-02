import React from "react";

export default function Header(props) {
  return (
    <header>
      <h1>To Do List</h1>
      <h2> {props.incomplete} items pending</h2>
    </header>
  );
}
