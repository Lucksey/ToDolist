import AddItemForm from "../components/AddItemForm";
import {action} from '@storybook/addon-actions';
import React from "react";

export default  {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callback = action("Buttom 'add' was pressed inside the form");

export const AddItemFormBaseExample = (props: any) => {
    return<AddItemForm addItem={callback} placeholder={'placeholder'}/>
}