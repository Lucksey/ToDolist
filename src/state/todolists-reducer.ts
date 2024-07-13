import {FilterValuesType, TodolistType} from "../AppWithRedux";
import {v1} from "uuid";
import {ThunkAction} from 'redux-thunk'
import {AppRootState} from "./store";
import {UnknownAction} from "redux";
import {todoListsApi} from "../api/todo-lists-api";


/*export const thunkFetchTodoList =
    (): ThunkAction<void, AppRootState, unknown, UnknownAction> =>
        async dispatch => {
            const asyncResp = await todoListsApi.getTodoLists()
            dispatch(
                getTodolistsAC(asyncResp.data)
            )
        }*/

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistId: string
    title: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
type GetTodoListAT = {
    type: 'GET-TODOLISTS'
    payload: any
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | GetTodoListAT;

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'GET-TODOLISTS': {
            return action.payload
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id === action.id)

            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)

            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolistId: v1(), title}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const getTodolistsAC = (data: Array<TodolistType>): GetTodoListAT => {
    return { type: "GET-TODOLISTS", payload: data}
}
