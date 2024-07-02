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
    console.log(tasks);

    let [filter, setFilter] = useState<FilterValuesType>("all");

    /*   let tasks2: Array<TasksType> = [
           { id: 1, title: "Gentlemens", isDone: true},
           { id: 2, title: "Martix", isDone: true},
           { id: 3, title: "XXX", isDone: false},
       ]
   */

    /*    function removeTask(id: number) {

            let resultTasks = tasks.filter((t) => {
                if (t.id != id) {
                    return true; // если id из t (пришедший из колбэка) не равен id из tasks (state) верни тру/фолс
                } else {
                    return false;
                }
            })
            console.log(resultTasks) // выведи в консоль результат
        }*/

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
                      addTask={addTask}/>
            {/*<Todolist title="movies" tasks={tasks2}/>
            <Todolist title="songs" tasks={tasks3}/>*/}

        </div>
    );
}

export default App;

