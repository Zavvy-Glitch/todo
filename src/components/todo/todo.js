import React from "react";
import useForm from "../../hooks/form.js";

import { v4 as uuid } from "uuid";

const ToDo = (props) => {
  const { handleChange, handleSubmit } = useForm(addItem);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    const dup = props.list.filter((todo) => {
      if (todo.text.toLowerCase() === item.text.toLowerCase()) {
        if (todo.assignee.toLowerCase() === item.assignee.toLowerCase()) {
          return true;
        }
      }
      return false;
    });
    if (dup.length > 0) {
      return;
    }
    props.setList([...props.list, item]);
  }

  function deleteItem(id) {
    const items = props.list.filter((item) => item.id !== id);
    props.setList(items);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input
            onChange={handleChange}
            name="text"
            type="text"
            placeholder="Item Details"
          />
        </label>

        <label>
          <span>Assigned To</span>
          <input
            onChange={handleChange}
            name="assignee"
            type="text"
            placeholder="Assignee Name"
          />
        </label>

        <label>
          <span>Difficulty</span>
          <input
            onChange={handleChange}
            defaultValue={3}
            type="range"
            min={1}
            max={5}
            name="difficulty"
          />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>
    </>
  );
};

export default ToDo;
