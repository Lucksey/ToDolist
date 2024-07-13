import React, {useEffect, useState} from 'react'
import {authAPI} from "../api/auth-api";

export default {
    title: "API"
}

export const Me = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        authAPI.me()
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const Login = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let email = "";
        let password = "";
        let rememberMe = true;

        authAPI.login(email, password, rememberMe)
            .then((response) => {
                debugger;
                setState(response.data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}