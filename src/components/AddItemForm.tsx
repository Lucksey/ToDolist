import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
    addItem: (title: string) => void
    placeholder: string
}

export function AddItemForm( props: AddItemFormPropsType) {

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
            setError("Title is required") // передать в локальный стейт сообщение об ошибке
        }
    }
    const onButtonPressHandler = () => {
        if (newTaskTitle.trim() !== "") { // если содержимое без пробелов не равно пустой строке
            props.addItem(newTaskTitle.trim()); // передать value без пробелов
            setNewTaskTitle(""); // занулить строку ввода
        } else { // в ином случае
            setError("Title is required") // передать в локальный стейт сообщение об ошибке
        }
    }

    return <div>
        <input onChange={onNewTitleChangeHandler}
               value={newTaskTitle}
               onKeyPress={onKeyPressHandler} //атрибут помечен как устаревший
               className={error ? "error" : ""}
               placeholder={props.placeholder}
        />
        <button onClick={onButtonPressHandler}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>

}
export default AddItemForm;