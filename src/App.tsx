import React, {useState} from 'react';
import './App.css';
import Todolist, {TasksType} from "./components/Todolist";
import {v1} from "uuid";
import todolist from "./components/Todolist";

export type FilterValuesType = "all" | "completed" | "active";
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();
    let todolistId3 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "Аchievements", filter: "completed"},
        {id: todolistId3, title: "AllTasks", filter: "all"},
    ])

    let [tasksObj, setTasks] = useState({
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

    function deleteTodoList(todolistId: string) {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
        // пропусти все тудулисты кроме того который пришел в пропсах
        setTodolists(filteredTodolists); //эта строка перерисовывает UI. Сетаем отсортированые тудулисты в стейт
        //setTodolists([...filteredTodolists]); // ?????????????????????????????????????? и то и то работает
        delete tasksObj[todolistId]; // удалить тудулист с массивом тасок (id в пропсах пришло)
       // setTasks({...tasksObj}); // эта строка перерисовывает UI, она НЕобязательна.
        // Мы просто отчиститли стейт от тасок удаленного тудулиста

    }

    /* let tasksForTodolist = tasks;
     if (filter === "completed") {
         tasksForTodolist = tasks.filter(t => t.isDone === true);
     } if (filter === "active") {
         tasksForTodolist = tasks.filter(t => t.isDone === false);
     }*/

    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodolist = tasksObj[tl.id];
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }
                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                return <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    ChangeFilter={ChangeFilter}
                    addTask={addTask}
                    ChangeStatus={ChangeCheckboxStatus}
                    filter={tl.filter}
                    deleteTodoList={deleteTodoList}
                />
            })}

        </div>
    );
}

export default App;

