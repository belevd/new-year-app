import React from "react";
import { ToDo } from "./ToDo";

export const ToDoList = (list) => {
  return (
    <ul className="listOfDo">
      {list.lenght && list.map((item, index) => (
        <ToDo item={item} index={index} />
      ))}
    </ul>
  );
};
