import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../AppWithRedux";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";


export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}
type TodolistPropsType = {
    id: string
    title: string
    ChangeFilter: (todolist: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    removeTodoList: (todolistId: string) => void
    ChangeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: TodolistPropsType) {
    let tasks = useSelector<AppRootState, Array<TasksType>>(state => state.tasks[props.id]);
    const dispatch = useDispatch();

    const onAllClickHandler = () => props.ChangeFilter(props.id, "all");
    const onActiveClickHandler = () => props.ChangeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.ChangeFilter(props.id, "completed");
    const deleteTodoList = () => props.removeTodoList(props.id)
    const ChangeTodolistTitle = (newTitle: string) => {
        props.ChangeTodolistTitle(props.id, newTitle);
    }

    let placeholderTodolistForm = "Enter name new task";
    let allTodolistTask = tasks;
    let tasksForTodolist = allTodolistTask;
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTask.filter(t => t.isDone === true);
    }
    if (props.filter === "active") {
        tasksForTodolist = allTodolistTask.filter(t => t.isDone === false);
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={ChangeTodolistTitle}/>
                <IconButton aria-label="delete" size="small" color={'info'}>
                    <DeleteIcon fontSize="small" onClick={deleteTodoList}/>
                </IconButton>
            </h3>
            <AddItemForm placeholder={placeholderTodolistForm}
                         addItem={title => {
                             dispatch(addTaskAC(props.id, title))
                         }}/>
            <ul>
                {
                    tasksForTodolist.map(t => {
                        const onRemoveHandler = () => {
                            dispatch(removeTaskAC(props.id, t.id));
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(props.id, t.id, e.currentTarget.checked));
                        }
                        const onChangeTitleHandler = (newTitle: string) => {
                            dispatch(changeTaskTitleAC(props.id, t.id, newTitle));
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeStatusHandler}/>
                                <EditableSpan title={t.title}
                                              onChange={onChangeTitleHandler}/>
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
            </div>
        </div>
    )
}


export default Todolist;