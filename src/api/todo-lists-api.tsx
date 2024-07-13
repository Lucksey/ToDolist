import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '7d2653d0-212d-4071-ad57-0422288ffaca'
    }
})

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
// дженерик тип
type ResponseType<D = {}> = {
    resultCode: number
    title: Array<string>
    data: D
} // дженерик тип
/*
type CreateTodoListResponseType = {
    resultCode: number
    title: Array<string>
    data:{
        item: TodoListType
    }
}
type UpdateDeleteTodoListResponseType = {
    resultCode: number
    messages: Array<string>
    data: {}
}
*/

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TaskType2 = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string
    deadline: string
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTasksResponseType = {
    items: Array<TaskType>
    totalCount: number
    error: string | null
}

export const todoListsApi = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>("todo-lists")
    },

    createTodoLists(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {title})
    },

    deleteTodoLists(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },

    updateTodoLists(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },

    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`)
    },

    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },

    createTask(todoListId: string, title: string ) {
        return instance.post<GetTasksResponseType>(`todo-lists/${todoListId}/tasks/`, {title})
    },

    updateTask(todoListId: string, taskId: string, title: string ) {
        return instance.put<UpdateTaskType>(`todo-lists/${todoListId}/tasks/${taskId}`, {title})
    },

}
