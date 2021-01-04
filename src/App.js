import React from "react";
import { ToDoList } from "./components/ToDo/ToDoList";
import { Income } from "./components/Income/Income";

const today = new Date();
const currentYear = today.getFullYear();

function App() {
  return (
    <div className="content">
      <h1 className="mainTitle">{`Обзор ${currentYear} года`}</h1>
      <hr />
      <section className="section">
        <ToDoList />
      </section>
      <hr />
      <section className="section">
        <Income />
      </section>
    </div>
  );
}

export default App;
