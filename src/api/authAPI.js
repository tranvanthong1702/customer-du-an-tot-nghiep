import Instance from "./instance";


export const login = (data) =>{
    return Instance.post('/auth/login', data)
}
export const registerAPI = (data) =>{
    return Instance.post('/auth/register', data)
}
