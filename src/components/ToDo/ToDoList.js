import React, { useState, useEffect } from "react";
import { ToDo } from "./ToDo";
import cn from "classnames";
import { DEFAULT_TASK, COMPLETED_TASKS } from "../../constants";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export function ToDoList() {
  const [listOfDo, setListOfDo] = useState(
    JSON.parse(localStorage.getItem("listOfDo"))
      ? JSON.parse(localStorage.getItem("listOfDo"))
      : {
          toDo: {},
          toDoList: {
            id: "toDoList",
            title: "To Do List",
            taskIds: [],
          },
        }
  );
  const [isChanging, setChanging] = useState(false);
  const tasks = listOfDo.toDoList.taskIds.map((item) => listOfDo.toDo[item]);

  const changingInput = () => {
    setChanging(!isChanging);
  };

  // Makes completed tasks from COMPLETED_TASKS list complete
  useEffect(() => {
    const tasks = Object.keys(listOfDo.toDo);
    if (!isChanging) {
      const newTasks = tasks.reduce((acc, cur) => {
        return COMPLETED_TASKS.includes(listOfDo.toDo[cur].text)
          ? { ...acc, [cur]: { ...listOfDo.toDo[cur], completed: true } }
          : { ...acc, [cur]: { ...listOfDo.toDo[cur] } };
      }, {});
      setListOfDo({ ...listOfDo, toDo: newTasks });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanging]);

  const save = (data) => {
    data
      ? localStorage.setItem("listOfDo", JSON.stringify(data))
      : localStorage.setItem("listOfDo", JSON.stringify(listOfDo));
  };

  const addToDo = () => {
    const index = new Date().getTime();
    const newDo = {
      id: `toDo-${index}`,
      text: DEFAULT_TASK,
      completed: false,
    };
    const newList = {
      ...listOfDo,
      toDo: { ...listOfDo.toDo, [`toDo-${index}`]: newDo },
      toDoList: {
        ...listOfDo.toDoList,
        taskIds: [...listOfDo.toDoList.taskIds, `toDo-${index}`],
      },
    };
    save(newList);
    setListOfDo(newList);
  };

  const complete = (id) => {
    let newList = { ...listOfDo.toDo };
    if (COMPLETED_TASKS.includes(newList[id].text)) {
      newList[id].completed = true;
    } else {
      newList[id].completed = !newList[id].completed;
    }
    setListOfDo({ ...listOfDo, toDo: newList });
    save();
  };

  const change = (id, value) => {
    let newList = { ...listOfDo.toDo };
    newList[id].text = value;
    setListOfDo({ ...listOfDo, toDo: newList });
  };

  const remove = (id) => {
    let newList = { ...listOfDo };
    delete newList.toDo[id];
    newList.toDoList.taskIds = newList.toDoList.taskIds.filter(
      (item) => item !== id
    );
    save(newList);
    setListOfDo(newList);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = listOfDo.toDoList;
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = { ...listOfDo, toDoList: newColumn };

    save(newState);
    setListOfDo(newState);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <h2 className="subTitle">{`Список задач`}</h2>
        <Droppable droppableId="toDoList">
          {(provided) => (
            <PerfectScrollbar
              options={{ suppressScrollX: true }}
              style={{width: '50%', marginBottom: '2em'}}
            >
              <ul
                className="listOfDo"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.length ? (
                  tasks.map((item, index) => {
                    return (
                      <ToDo
                        key={item.id}
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

                {provided.placeholder}
              </ul>
            </PerfectScrollbar>
          )}
        </Droppable>
        <button className={cn("button", "button-primary")} onClick={addToDo}>
          Добавить новую задачу
        </button>
      </DragDropContext>
    </>
  );
}
