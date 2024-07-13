import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '7d2653d0-212d-4071-ad57-0422288ffaca'
    }
})

type MeResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        id: number
        email: string
        login: string
    }
}

type ResponseType<D ={}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ResponseType<{userId: number}>>(`auth/login`, {email, password, rememberMe})

    },
    logout() {
        return instance.delete(`auth/login`)
    },
}