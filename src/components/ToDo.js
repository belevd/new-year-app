import React, { useState, useRef, useEffect, useContext } from "react";
import "./styles.css";
import cn from "classnames";
import {TaskDefaultValue} from '../App'

export function ToDo ({ item, index }) {
  const [changing, setChanging] = useState(false);
  const input = useRef(null);
  const {defaultTask, complete, change, save, changingInput, remove} = useContext(TaskDefaultValue)

  useEffect(() => {
    if (changing) {
      input.current.focus();
    }
  }, [changing])

  const changeInput = (e) => {
    change(index, e.currentTarget.value);
  };

  const textToInput = () => {
    changingInput();
    setChanging(true);
  }

  const inputToText = () => {
    save();
    changingInput();
    setChanging(false);
  };

  const completeTask = () => {
    complete(index);
  }

  const deletePlaceholder = (e) => {
    if (e.currentTarget.value === defaultTask) {
      e.currentTarget.value = ''
    }
  }

  return (
    <li className="list-item">
      <button
        className={cn("button", "button-uncompleted", {
          "button-completed": item.completed,
        })}
        onClick={completeTask}
      ></button>
      <div className="task__text_container">
        {changing ? (
          <input
            ref={input}
            value={item.text}
            className={cn("task__input")}
            placeholder="Введите текст задачи"
            onBlur={inputToText}
            onChange={changeInput}
            onFocus={deletePlaceholder}
          />
        ) : (
          <span
            className={cn("task__text", {
              "task__text-completed": item.completed,
            })}
            onClick={textToInput}
          >
            {item.text}
          </span>
        )}
      </div>
      <button
        className={cn("button", "button-remove")}
        onClick={() => remove(index)}
      ></button>
    </li>
  );
};
