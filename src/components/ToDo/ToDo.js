import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import { DEFAULT_TASK } from "../../constants";
import { Draggable } from "react-beautiful-dnd";

export function ToDo(props) {
  const [changing, setChanging] = useState(false);
  const input = useRef(null);
  const { complete, change, save, changingInput, remove, item, index } = props;

  useEffect(() => {
    if (changing) {
      input.current.focus();
    }
  }, [changing]);

  const changeInput = (e) => {
    change(item.id, e.currentTarget.value);
  };

  const textToInput = () => {
    changingInput();
    setChanging(true);
  };

  const inputToText = () => {
    save();
    changingInput();
    setChanging(false);
  };

  const completeTask = () => {
    complete(item.id);
  };

  const deletePlaceholder = (e) => {
    if (e.currentTarget.value === DEFAULT_TASK) {
      e.currentTarget.value = "";
    }
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <li
          className="list-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
            onClick={() => remove(item.id)}
          ></button>
        </li>
      )}
    </Draggable>
  );
}
