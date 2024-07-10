import {combineReducers,legacy_createStore } from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReduser = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
});

export type AppRootState = ReturnType<typeof rootReduser>

export const store = legacy_createStore(rootReduser);

// @ts-ignore
window.store = store;