import React, {useReducer} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "Аchievements", filter: "all"},
        {id: todolistId3, title: "AllTasks", filter: "all"},
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "GQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "book", isDone: false},
            {id: v1(), title: "bread", isDone: true},
        ],
        [todolistId3]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "book", isDone: false},
            {id: v1(), title: "bread", isDone: true},
        ]
    })

    function addTask(todolistId: string, title: string,) {

        dispatchToTasksReducer(addTaskAC(todolistId, title)); // dispatch(action(props))
    }

    function removeTask(todolistId: string, taskId: string) {
        dispatchToTasksReducer(removeTaskAC(todolistId, taskId));
    }

    function ChangeTaskStatus(todolistId: string, taskId: string, isDone: boolean,) {
        dispatchToTasksReducer(changeTaskStatusAC(todolistId, taskId, isDone));
    }

    function ChangeTaskTitle(todolistId: string, taskId: string, newTitle: string) {
        dispatchToTasksReducer(changeTaskTitleAC(todolistId, taskId, newTitle));
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);

    }

    function removeTodoList(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    }

    function ChangeTodolistTitle(id: string, newTitle: string) {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id, newTitle));
    }

    function ChangeFilter(todolistId: string, filter: FilterValuesType) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, filter));
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
                        let placeholderTodolistForm = "Enter name new task";
                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    //tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    ChangeFilter={ChangeFilter}
                                    addTask={addTask}
                                    ChangeTaskStatus={ChangeTaskStatus}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    ChangeTaskTitle={ChangeTaskTitle}
                                    ChangeTodolistTitle={ChangeTodolistTitle}
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

export default AppWithReducers;

