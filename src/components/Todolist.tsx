import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    // tasks: TasksType[] - вариант записи
    removeTask: (id: string, todolistId: string) => void
    ChangeFilter: (value: FilterValuesType, todolist: string) => void
    addTask: (title: string, todolistId: string) => void
    ChangeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    deleteTodoList: (todolistId: string) => void
    ChangeTaksTitle: (id: string, value: string, todolistId: string) => void
    ChangeTodolistTitle: (id: string, newTitle: string) => void
    placeholder: string


}

export function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => props.addTask(title, props.id)
    const onAllClickHandler = () => props.ChangeFilter("all", props.id);
    const onActiveClickHandler = () => props.ChangeFilter("active", props.id);
    const onCompletedClickHandler = () => props.ChangeFilter("completed", props.id);
    const deleteTodoList = () => props.deleteTodoList(props.id)
    const ChangeTodolistTitle = (newTitle: string) => {
        props.ChangeTodolistTitle(props.id, newTitle);
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={ChangeTodolistTitle}/>
                {/*<button onClick={deleteTodoList}>x</button>*/}
                <IconButton aria-label="delete" size="small" color={'info'}>
                    <DeleteIcon fontSize="small" onClick={deleteTodoList}/>
                </IconButton>

            </h3>
            <AddItemForm addItem={addTask}
                         placeholder={props.placeholder}
            />
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }
                        const onChangeTitleHandler = (value: string) => {
                            props.ChangeTaksTitle(t.id, value, props.id);
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                {/*   применили стили для всей ЛИшки с условием что чекбокс тру*/}
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeStatusHandler}/>
                                <EditableSpan title={t.title}
                                              onChange={onChangeTitleHandler}/>

                                {/*<button onClick={onRemoveHandler}>x</button>*/}
                                {/*<DeleteForeverIcon onClick={onRemoveHandler}/>*/}
                                <IconButton aria-label="delete" size="small" color={"info"}>
                                    <DeleteIcon fontSize="small" onClick={onRemoveHandler}/>
                                </IconButton>

                            </li>
                        )
                    })
                }

            </ul>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "outlined"}
                        size="small"
                        onClick={onAllClickHandler}>
                    All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "outlined"}
                        size="small"
                        onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                        size="small"
                        onClick={onCompletedClickHandler}>
                    Completed
                </Button>
                {/*<button className={props.filter === "all" ? "active-filter" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>*/}

            </div>
        </div>
    )
}


export default Todolist;