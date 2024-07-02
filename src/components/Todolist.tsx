import React from "react";
import {FilterValuesType} from "../App";

export type TasksType = {
    id: number, title: string, isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    // tasks: TasksType[] - вариант записи
    removeTask: (id: number) => void
    ChangeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: TodolistPropsType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.removeTask(t.id)
                        }}>x
                        </button>
                    </li>)
                }

            </ul>
            <div>
                <button onClick={() => { props.ChangeFilter("all")}}>All</button>
                <button onClick={() => { props.ChangeFilter("active")}}>Active</button>
                <button onClick={() => { props.ChangeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;