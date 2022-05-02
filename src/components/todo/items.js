import React, { useContext, useState } from "react";
import { SettingsContext } from "../../context/Settings.js";

function Items(props) {
  let settings = useContext(SettingsContext);
  let [current, setCurrent] = useState(1);

  function toggleComplete(id) {
    const items = props.list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });
    props.setList(items);
  }

  function newPage(e) {
    if (e.target.id === "next") {
      setCurrent(current + 1);
      return;
    }
    setCurrent(current - 1);
  }

  function getToDo() {
    const indOfLast = current * settings.itemPref;
    const indOfFirst = indOfLast - settings.itemPref;
    const currentToDo = props.list.slice(indOfFirst, indOfLast);

    if (!settings.dispComp) {
      return currentToDo.filter((item) => {
        if (item.complete) {
          return false;
        }
        return true;
      });
    }
    return currentToDo;
  }

  return (
    <div>
      <div>
        {getToDo().map((item) => (
          <div key={item.id}>
            <p>
              <small>Assigned to: {item.assignee}</small>
            </p>
            <p>{item.text}</p>
            <p>
              <small>Difficulty: {item.difficulty}</small>
            </p>

            <div onClick={() => toggleComplete(item.id)}>
              Complete:{" "}
              <button
                type="button"
                className={`w-10 rounded-md py-1 px-1 cursor-pointer ${
                  item.complete === true ? "bg-green-300" : "bg-red-300"
                }`}
              >
                {item.complete.toString()}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        {current > 1 && (
          <button id="prev" onClick={newPage} type="button">
            PREV
          </button>
        )}
        {props.list.length > settings.itemsPerPage ? (
          <button id="next" onClick={newPage} type="button">
            NEXT
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Items;
