import React, {ChangeEvent, useCallback} from "react";
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


export type TaskType = {
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
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    ChangeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    ChangeTaskTitle: (id: string, value: string, todolistId: string) => void
    placeholder: string
}

export const Todolist = React.memo((props: TodolistPropsType) => {
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.id]);
    const dispatch = useDispatch();

    const addTask = (title: string) => props.addTask(props.id, title)
    const onAllClickHandler = useCallback(() => props.ChangeFilter(props.id, "all"), [props.ChangeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.ChangeFilter(props.id, "active"), [props.ChangeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.ChangeFilter(props.id, "completed"), [props.ChangeFilter, props.id]);
    const deleteTodoList = useCallback(() => props.removeTodoList(props.id),[props.removeTodoList, props.id]);
    const ChangeTodolistTitle = useCallback((newTitle: string) => props.ChangeTodolistTitle(props.id, newTitle), [props.ChangeTodolistTitle, props.id]);


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
                         addItem={addTask}/>
            <ul>
                {
                    tasksForTodolist.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(props.id, t.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.ChangeTaskStatus(props.id, t.id, e.currentTarget.checked);
                        }
                        const onChangeTitleHandler = (value: string) => {
                            props.ChangeTaskTitle(props.id, t.id, value);
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
});

/*
type TaskPropsType = {
    changeTaskStatus: (todolist: string, id: string, isDone: boolean) => void
    changeTaskTitle: (todolist: string, id: string, newTitle: string) => void
    removeTask: (todolistId: string, id: string) => void
    task: TaskType
    todolistId: string
}


const Task = (props: TaskPropsType) => {

    const onRemoveHandler = () => {
        dispatch(removeTaskAC(props.todolistId, props.task.id));
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistId, props.task.id, e.currentTarget.checked));
    }
    const onChangeTitleHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, newTitle));
    }
    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton aria-label="delete" size="small" color={"info"}>
                <DeleteIcon fontSize="small" onClick={onRemoveHandler}/>
            </IconButton>
        </li>
    )
}
*/

export default Todolist;