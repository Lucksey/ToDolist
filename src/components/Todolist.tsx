import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export type TasksType = {
    id: string, title: string, isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    // tasks: TasksType[] - вариант записи
    removeTask: (id: string, todolistId: string) => void
    ChangeFilter: (value: FilterValuesType, todolist: string) => void
    addTask: (title: string, todolistId: string) => void
    ChangeStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    deleteTodoList: (todolistId: string) => void

}

export function Todolist(props: TodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value);

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13 && newTaskTitle.trim() !== "") {
            // если нажата Ctrl + Enter(код13) + после обрезания пробелов строка не равна пустой строке
            props.addTask(newTaskTitle.trim(), props.id) // вызвать addTask и передать парамметром newTaskTitle без пробелов
            setNewTaskTitle(""); // занулить строку (очистить поле ввода)
        } else {
            setError("Title is required") // передать в локальный стейт сообщение об ошибке
        }
    }
    const onButtonPressHandler = () => {
        if (newTaskTitle.trim() !== "") { // если содержимое без пробелов не равно пустой строке
            props.addTask(newTaskTitle.trim(), props.id); // передать value без пробелов
            setNewTaskTitle(""); // занулить строку ввода
        } else { // в ином случае
            setError("Title is required") // передать в локальный стейт сообщение об ошибке
        }
    }
    const onAllClickHandler = () => props.ChangeFilter("all", props.id);
    const onActiveClickHandler = () => props.ChangeFilter("active", props.id);
    const onCompletedClickHandler = () => props.ChangeFilter("completed", props.id);
    const deleteTodoList = () => {
        props.deleteTodoList(props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={deleteTodoList}>x</button>
            </h3>
            <div>
                <input onChange={onNewTitleChangeHandler}
                       value={newTaskTitle}
                       onKeyPress={onKeyPressHandler} //атрибут помечен как устаревший
                       className={error ? "error" : ""}/>
                <button onClick={onButtonPressHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeStatus(t.id, e.currentTarget.checked, props.id);
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={onChangeHandler}/>
                                <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                                {/*   применили стили для текста с условием что чекбокс тру*/}
                                <button onClick={onRemoveHandler}>x</button>
                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;