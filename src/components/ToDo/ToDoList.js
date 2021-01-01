import React, { useState, useEffect } from "react";
import { ToDo } from "./ToDo";
import cn from "classnames";
import { DEFAULT_TASK, COMPLETED_TASKS } from "../../constants";

export function ToDoList(props) {
  const [listOfDo, setListOfDo] = useState(
    JSON.parse(localStorage.getItem("listOfDo"))
      ? JSON.parse(localStorage.getItem("listOfDo"))
      : []
  );
  const [isChanging, setChanging] = useState(false);

  const changingInput = () => {
    setChanging(!isChanging);
  };

  useEffect(() => {
    if (!isChanging) {
      setListOfDo(
        listOfDo.map((item) =>
          COMPLETED_TASKS.includes(item.text)
            ? { ...item, completed: true }
            : { ...item }
        )
      );
    }
  }, [isChanging]);

  const save = (list) => {
    list
      ? localStorage.setItem("listOfDo", JSON.stringify(list))
      : localStorage.setItem("listOfDo", JSON.stringify(listOfDo));
  };

  const addToDo = () => {
    const newDo = {
      text: DEFAULT_TASK,
      completed: false,
    };
    setListOfDo([...listOfDo, newDo]);
  };

  const complete = (id) => {
    let newList = listOfDo.slice(0);
    if (COMPLETED_TASKS.includes(newList[id].text)) {
      newList[id].completed = true;
    } else {
      newList[id].completed = !newList[id].completed;
    }
    setListOfDo(newList);
    save();
  };

  const change = (id, value) => {
    let newList = listOfDo.slice(0);
    newList[id].text = value;
    setListOfDo(newList);
  };

  const remove = (id) => {
    save(listOfDo.filter((item, index) => index !== id));
    setListOfDo(listOfDo.filter((item, index) => index !== id));
  };

  return (
    <>
      <h2 className="subTitle">{`Список задач`}</h2>
      <ul className="listOfDo">
        {listOfDo.length ? (
          listOfDo.map((item, index) => {
            return (
              <ToDo
                key={index}
                item={item}
                index={index}
                complete={complete}
                change={change}
                save={save}
                changingInput={changingInput}
                remove={remove}
              />
            );
          })
        ) : (
          <span>У вас нет задач</span>
        )}
      </ul>
      <button className={cn("button", "button-addNewTask")} onClick={addToDo}>
        Добавить новую задачу
      </button>
    </>
  );
}
