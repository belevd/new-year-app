import { useState } from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";

function App() {
  const [listOfDo, setListOfDo] = useState([]);

  const addToDo = (value) => {
    const newDo = {
      text: value,
      completed: false,
    };
    setListOfDo([...listOfDo, newDo]);
  };

  const removeToDo = (value) => {
    setListOfDo(listOfDo.filter((item) => item.text !== value));
  };

  return (
    <>
      <div className="content">
        <h1 className="mainTitle">Итоги 2020 года</h1>
        <ToDoList list={listOfDo} />
      </div>
    </>
  );
}

export default App;
