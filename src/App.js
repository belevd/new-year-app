import { useState } from "react";
import "./App.css";
import { ToDoList } from "./components/ToDoList";

function App() {
  const [listOfDo, setListOfDo] = useState([]);

  const addToDo = () => {
    const newDo = {
      text: 'Введите задачу',
      completed: false,
    };
    setListOfDo([...listOfDo, newDo]);
  };

  const complete = (id) => {
    let newList = listOfDo.slice(0);
    newList[id].completed = !newList[id].completed;
    setListOfDo(newList)
  }

  const change = (id, value) => {
    let newList = listOfDo.slice(0);
    newList[id].text = value
    setListOfDo(newList)
  }

  const removeToDo = (id) => {
    setListOfDo(listOfDo.filter((item, index) => index !== id));
  };

  return (
    <>
      <div className="content">
        <h1 className="mainTitle">Итоги 2020 года</h1>
        <ToDoList list={listOfDo} addNew={addToDo} remove={removeToDo} complete={complete} change={change} />
      </div>
    </>
  );
}

export default App;
