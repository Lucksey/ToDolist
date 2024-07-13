import React, {useEffect, useState} from 'react'
import {todoListsApi} from "../api/todo-lists-api";

export default {
    title: "API"
}

/*export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.getTodoLists()
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}*/

/*export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "IT's working - CREATE"
        todoListsApi.createTodoLists(title)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}*/

/*export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let id = "2409c0dd-69fc-494d-aeae-3ca9644e79b2"
        todoListsApi.deleteTodoLists(id)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}*/

/*export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = "IT's working - UPDATE121"
        let id = "113216be-5d34-4c0e-94b2-d8689a546847"
        todoListsApi.updateTodoLists(id, title)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}*/

/*export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = '113216be-5d34-4c0e-94b2-d8689a546847';
        todoListsApi.getTasks(todoListId)
            .then((response) => {
                debugger;
                setState(response.data.items);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}*/

/*export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = '113216be-5d34-4c0e-94b2-d8689a546847';
        let taskId = '';
        todoListsApi.deleteTask(todoListId, taskId)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}*/

/*export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = '113216be-5d34-4c0e-94b2-d8689a546847';
        let title = 'Create new Task - WorkTask';
        todoListsApi.createTask(todoListId, title)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}*/

/*export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = '113216be-5d34-4c0e-94b2-d8689a546847';
        let taskId = '9615d604-fd8c-4dd3-804f-410276082d90';
        let title = 'какая-то караказябра';
        todoListsApi.updateTask(todoListId, taskId, title)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}*/

/////////////////////////////////////
export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    const getTodoLists = () => {
        todoListsApi.getTodoLists()
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }
    return <div> {JSON.stringify(state)}
    <div>
        <button onClick={getTodoLists}>getTodoLists</button>
    </div>
    </div>

}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>("")

    const createTodoList = () => {
        todoListsApi.createTodoLists(title)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }
    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={"title"} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={createTodoList}>create TodoList</button>
    </div>
    </div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>("")

    const deleteTodoList = () => {
        todoListsApi.deleteTodoLists(todoListId)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }
    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={"TodoListId"} value={todoListId} onChange={(e) => {
            setTodoListId(e.currentTarget.value)
        }}/>
        <button onClick={deleteTodoList}>delete TodoList</button>
    </div>
    </div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>("")
    const [title, setTitle] = useState<any>("")

    const updateTodoList = () => {
        todoListsApi.updateTodoLists(todoListId, title)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={"TodoListId"} value={todoListId} onChange={(e) => {
            setTodoListId(e.currentTarget.value)
        }}/>
        <input placeholder={"title"} value={title} onChange={(e) => {
            setTitle(e.currentTarget.value)
        }}/>
        <button onClick={updateTodoList}>update TodoList</button>
    </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>("")

    const getTasks = () => {
        todoListsApi.getTasks(todoListId)
            .then((response) => {
                debugger;
                setState(response.data.items);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TodoListId"} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
            <button onClick={getTasks}>get task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>("")
    const [todoListId, setTodoListId] = useState<any>("")

    const deleteTask = () => {
        todoListsApi.deleteTask(todoListId, taskId)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TodoListId"} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>("")
    const [title, setTitle] = useState<any>("")

    const createTask = () => {
        todoListsApi.createTask(todoListId, title)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"TodoListId"} value={todoListId} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
            <input placeholder={"title"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>("")
    const [taskId, setTaskId] = useState<any>("")
    const [title, setTitle] = useState<any>("")

    const updateTask = () => {
        todoListsApi.updateTask(todoListId, taskId, title)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }
        return <div> {JSON.stringify(state)}
            <div>
                <input placeholder={"TodoListId"} value={todoListId} onChange={(e) => {
                    setTodoListId(e.currentTarget.value)
                }}/>
                <input placeholder={"TaskId"} value={taskId} onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}/>
                <input placeholder={"title"} value={title} onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}/>
                <button onClick={updateTask}>update task</button>
            </div>
        </div>

    }
