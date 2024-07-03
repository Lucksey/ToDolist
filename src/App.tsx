import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "GQL", isDone: false},

    ]);
    let [filter, setFilter] = useState<FilterValuesType>("all");

    function addTask(title: string) {
        let newTask = { id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks);
    }
    function removeTask(id: string) {// аналогичная запись 27-37 строк
        let filteredTasks = tasks.filter(t => t.id !== id) // пропусти таски id которых не равны пришедшим из колбэка для удаления
        setTasks(filteredTasks);
    }
    function ChangeFilter (value: FilterValuesType) {
        setFilter(value)
    }
    function ChangeCheckboxStatus(taskId: string, isDone: boolean) {
        let task = tasks.find (t => t.id === taskId) // найти в массиве tasks(стейт) taskId(пришедший из колбэка) и присвоить  это значение task'e
        if (task) { //если есть таска
            task.isDone = isDone
        }
        setTasks([...tasks])

    }

    let tasksForTodolist = tasks;
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    } if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }

    return (
        <div className="App">
            <Todolist title="what to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      ChangeFilter={ChangeFilter}
                      addTask={addTask}
                      ChangeStatus={ChangeCheckboxStatus}
                      filter={filter}/>
        </div>
    );
}

export default App;

