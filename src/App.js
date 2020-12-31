import React, { useState, useEffect } from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";

const COMPLETED_TASKS = [
  "Отметить день рождения",
  "Купить мебель в квартиру",
  "Открыть дачный сезон",
  "Пройти через самоизоляцию",
  "Организовать хоум офис",
  "Купить настолки",
  "Классно провести лето",
  "Выгулять кошку",
  "Начать инвестировать и откладывать",
  "Съездить в отпуск",
  "Погулять по Икее",
  "Сменить работу",
  "Научиться программировать",
  "Написать приложение для подведения итогов года",
];

const DEFAULT_VALUE = "Что вы хотели сделать?";

export const TaskDefaultValue = React.createContext(DEFAULT_VALUE);

function App() {
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

  const saveList = (list) => {
    list
      ? localStorage.setItem("listOfDo", JSON.stringify(list))
      : localStorage.setItem("listOfDo", JSON.stringify(listOfDo));
  };

  const addToDo = () => {
    const newDo = {
      text: DEFAULT_VALUE,
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
    saveList();
  };

  const change = (id, value) => {
    let newList = listOfDo.slice(0);
    newList[id].text = value;
    setListOfDo(newList);
  };

  const removeToDo = (id) => {
    saveList(listOfDo.filter((item, index) => index !== id));
    setListOfDo(listOfDo.filter((item, index) => index !== id));
  };

  return (
    <div className="content">
      <h1 className="mainTitle">Итоги 2020 года</h1>
      <TaskDefaultValue.Provider value={DEFAULT_VALUE}>
        <ToDoList
          list={listOfDo}
          addNew={addToDo}
          remove={removeToDo}
          complete={complete}
          change={change}
          save={saveList}
          changingInput={changingInput}
        />
      </TaskDefaultValue.Provider>
    </div>
  );
}

export default App;
