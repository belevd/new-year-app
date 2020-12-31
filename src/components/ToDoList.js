import React from "react";
import { ToDo } from "./ToDo";
import "./styles.css";
import cn from "classnames";

export function ToDoList(props) {
  const { list, addNew } = props;
  return (
    <>
        <ul className="listOfDo">
          {list.length ? (
            list.map((item, index) => {
              return (
                <ToDo
                  key={index}
                  item={item}
                  index={index}
                />
              );
            })
          ) : (
            <span>У вас нет задач</span>
          )}
        </ul>
        <button
          className={cn("button", "button-addNewTask")}
          onClick={() => addNew()}
        >
          Добавить новую задачу
        </button>
    </>
  );
}
