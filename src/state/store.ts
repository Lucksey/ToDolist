import {combineReducers,legacy_createStore } from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";

const rootReduser = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
});

/*type AppRootState = {
    todolists: Array<TodolistType>
    tasks: TasksStateType
}*/

export type AppRootState = ReturnType<typeof rootReduser>

export const store = legacy_createStore(rootReduser);

// @ts-ignore
window.store = store;