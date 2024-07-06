import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (value: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
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
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <input autoFocus
                 placeholder='Enter your message'
                 value={title}
                 onBlur={activateViewMode}
                 onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

}