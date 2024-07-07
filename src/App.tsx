import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "Аchievements", filter: "all"},
        {id: todolistId3, title: "AllTasks", filter: "all"},
    ])
    let [tasksObj, setTasks] = useState<TasksStateType>({
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

    function addTodolist(title: string) {
        let todolist: TodolistsType = {
            id: v1(), title: title, filter: "all"
        };

        setTodolists([todolist, ...todolists]);
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    function ChangeTodolistTitle(id: string, newTitle: string) {
        let todolist = todolists.find(tl => tl.id === id)

        if (todolist) {
            todolist.title = newTitle

            setTodolists([...todolists]);
        }
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        // новая таска - вот такой объека, с такими парамметрами: значениями
        let tasks = tasksObj[todolistId]; // достаем нужный массив
        let newTasks = [newTask, ...tasks] // добавляем новую таску, записываем распукоженую копию массива
        tasksObj[todolistId] = newTasks // новые таски записываем в этот объект
        setTasks({...tasksObj}); // сетаем измененный объект
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];// достать из таскОбж тот тудулистИд который придет в пропсах
        let filteredTasks = tasks.filter(t => t.id !== id)
        // пропусти таски id которых не равны пришедшим из колбэка для удаления
        tasksObj[todolistId] = filteredTasks; // в этом объекте заменить отфильтрованными тасками
        setTasks({...tasksObj}); // не копия массива, а копия объекта{} Сетаем объект для перерисовки реаком
    }

    function ChangeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        // пробегаемся по всем тудулистам и ищем тот у которого id === todolistId (пришедший в пропсах)
        if (todolist) { // если такой нашелся
            todolist.filter = value; // тудулист, тебе меняем фильтр на value (пришедший в пропсах)
            setTodolists([...todolists]); //засетать в стейт новый массив (копию массива)
        }
    }

    function ChangeCheckboxStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];// достать из таскОбж тот тудулистИд (массив) который придет в пропсах
        let task = tasks.find(t => t.id === taskId)
        // найти в массиве tasks(стейт) taskId(пришедший из колбэка) и присвоить  это значение task'e
        if (task) { //если есть таска
            task.isDone = isDone
            tasksObj[todolistId] = tasks;
            setTasks({...tasksObj});
        }
    }

    function ChangeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId];// достать из таскОбж тот тудулистИд (массив) который придет в пропсах
        let task = tasks.find(t => t.id === taskId)
        // найти в массиве tasks(стейт) taskId(пришедший из колбэка) и присвоить  это значение task'e
        if (task) { //если таска нашлась
            task.title = newTitle
            //tasksObj[todolistId] = tasks;
            setTasks({...tasksObj});
        }
    }

    function deleteTodoList(todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
        // пропусти все тудулисты кроме того который пришел в пропсах
        setTodolists(filteredTodolists); //эта строка перерисовывает UI. Сетаем отсортированые тудулисты в стейт
        //setTodolists([...filteredTodolists]); // ?????????????????????????????????????? и то и то работает
        delete tasksObj[todolistId]; // удалить тудулист с массивом тасок (id в пропсах пришло)
        // setTasks({...tasksObj}); // эта строка перерисовывает UI, она НЕобязательна.
        // Мы просто отчиститли стейт от тасок удаленного тудулиста

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
                        Photos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm placeholder={placeholderItemForm} addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={6} style={{padding: "10px"}}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasksObj[tl.id];
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                        }
                        let placeholderTodolistForm = "Enter name new task";
                        return <Grid item>
                            <Paper style={{padding: "10px" }}>
                            <Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                ChangeFilter={ChangeFilter}
                                addTask={addTask}
                                ChangeTaskStatus={ChangeCheckboxStatus}
                                filter={tl.filter}
                                deleteTodoList={deleteTodoList}
                                ChangeTaksTitle={ChangeTaskTitle}
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
;
}

export default App;

