import React, { useState } from "react";
import "./styles.css";
import cn from "classnames";

export const ToDo = ({ item, index, remove, complete, change }) => {
  const [changing, setChanging] = useState(false);

  const changeInput = (e) => {
    change(index, e.currentTarget.value);
  };

  return (
    <li className="list-item">
      <div className='task__text_container'>
        {changing ? (
          <input
            value={item.text}
            className={cn("task__input")}
            placeholder="Введите текст задачи"
            onBlur={() => setChanging(false)}
            onChange={changeInput}
          />
        ) : (
          <span
            className={cn("task__text", {
              "task__text-completed": item.completed,
            })}
            onClick={() => setChanging(true)}
          >
            {item.text}
          </span>
        )}
      </div>
      <button
        className={cn("button", "button-remove")}
        onClick={() => remove(index)}
      >
        x
      </button>
      <button
        className={cn("button", "button-completed")}
        onClick={() => complete(index)}
      >
        Выполнено
      </button>
    </li>
  );
};
