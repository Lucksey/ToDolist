import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC, /*thunkFetchTodoList*/
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    let dispatch = useDispatch();

//@ts-ignore
    /*useEffect(() => {dispatch(thunkFetchTodoList())}, [] )*/


    let todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch]);

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, [dispatch]);

    const ChangeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle));
    }, [dispatch]);

    const ChangeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }, [dispatch]);


    const addTask = useCallback((todolistId: string, title: string,) => {

        dispatch(addTaskAC(todolistId, title)); // dispatch(action(props))
    }, [])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    }, [])

    const ChangeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean,) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, isDone));
    }, [])

    const ChangeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle));
    }, [])




    let placeholderItemForm = "Enter name new todolist";
    let placeholderTodolistForm = "vplaceholderTodolistForm"
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm placeholder={placeholderItemForm} addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={6} style={{padding: "10px"}}>
                    {todolists.map((tl) => {

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    ChangeFilter={ChangeFilter}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    ChangeTodolistTitle={ChangeTodolistTitle}
                                    ChangeTaskTitle={ChangeTaskTitle}
                                    ChangeTaskStatus={ChangeTaskStatus}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    placeholder={placeholderTodolistForm}

                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;

