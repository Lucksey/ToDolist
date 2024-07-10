import React from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";
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
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    let todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);
    let dispatch = useDispatch();

    function addTodolist(title: string) {
        dispatch(addTodolistAC(title));

    }

    function removeTodoList(todolistId: string) {
        dispatch(removeTodolistAC(todolistId));
    }

    function ChangeTodolistTitle(id: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(id, newTitle));
    }

    function ChangeFilter(todolistId: string, filter: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }

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

