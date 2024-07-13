import React, {useCallback} from 'react';
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
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

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

    let todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);
    let dispatch = useDispatch();

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

    let placeholderItemForm = "Enter name new todolist";
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

