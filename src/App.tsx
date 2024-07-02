import React from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";

function App() {

    let tasks1 = [
        { id: 1, title: "CSS", isDone: true},
        { id: 2, title: "JS", isDone: true},
        { id: 3, title: "React", isDone: true},
    ]

    let tasks2: Array<TasksType> = [
        { id: 1, title: "Jentlmens", isDone: true},
        { id: 2, title: "Martix", isDone: true},
        { id: 3, title: "XXX", isDone: false},
    ]



    return (
        <div className="App">
            <Todolist title="what to learn" tasks={tasks1}/>
            <Todolist title="movies" tasks={tasks2}/>

        </div>
    );
}

export default App;

