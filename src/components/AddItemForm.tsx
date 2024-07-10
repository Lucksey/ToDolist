import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import {ControlPoint} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    placeholder: string
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTaskTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.charCode === 13 && newTaskTitle.trim() !== "") {
            // если нажата Ctrl + Enter(код13) + после обрезания пробелов строка не равна пустой строке
            props.addItem(newTaskTitle.trim()) // вызвать addTask и передать парамметром newTaskTitle без пробелов
            setNewTaskTitle(""); // занулить строку (очистить поле ввода)
        } else {
            setError("ERROR") // передать в локальный стейт сообщение об ошибке
        }
    }
    const onButtonPressHandler = () => {
        if (newTaskTitle.trim() !== "") { // если содержимое без пробелов не равно пустой строке
            props.addItem(newTaskTitle.trim()); // передать value без пробелов
            setNewTaskTitle(""); // занулить строку ввода
        } else { // в ином случае
            setError("ERROR") // передать в локальный стейт сообщение об ошибке
        }
    }

    return <div>

        <TextField
            error={!!error}
            variant="standard"
            id="outlined-basic"
            onChange={onNewTitleChangeHandler}
            value={newTaskTitle}
            onKeyPress={onKeyPressHandler} //атрибут помечен как устаревший
            //className={error ? "error" : ""}
            label={error ? "Error" : props.placeholder}
            helperText={error ? "Title is required" : ""}
        />
        <IconButton aria-label="delete" size="small" color={'info'}>
            <ControlPoint onClick={onButtonPressHandler}
                          color={'primary'}
                          fontSize={"large"}
            />
        </IconButton>

        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>

}

export default AddItemForm;