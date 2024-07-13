import {combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReduser = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
});

export type AppRootState = ReturnType<typeof rootReduser>
// @ts-ignore
export const store = createStore(rootReduser, applyMiddleware(thunk));

// @ts-ignore
window.store = store;