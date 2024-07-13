import React, {ChangeEvent, useCallback, useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = React.memo( (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }
    const activateViewMode = () => {
        props.onChange(title);
        setEditMode(false);
    }
    const onChangeTitleHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value), [])

    return editMode
        ? <TextField
            multiline
            autoFocus
            variant="standard"
            value={title}
            onBlur={activateViewMode}
            onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

});



/*type TaskPropsType = {
    changeTaskStatus: (todolist: string, id: string, isDone: boolean) => void
    changeTaskTitle: (todolist: string, id: string, newTitle: string) => void
    removeTask: (todolistId: string, id: string) => void
    task: TaskType
    todolistId: string
}

const Task = (props: TaskPropsType) => {
    //dispatch = useDispatch();

    const onRemoveHandler = () => {
        dispatch(removeTaskAC(props.todolistId, props.task.id));
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistId, props.task.id, e.currentTarget.checked));
    }
    const onChangeTitleHandler = (newTitle: string) => {
        dispatch(changeTaskTitleAC(props.todolistId, props.task.id, newTitle));
    }
    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={props.task.isDone}
                onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.task.title}
                          onChange={onChangeTitleHandler}/>
            <IconButton aria-label="delete" size="small" color={"info"}>
                <DeleteIcon fontSize="small" onClick={onRemoveHandler}/>
            </IconButton>
        </li>
    )
}*/