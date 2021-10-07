import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/user'
})

interface IData {
    token: string
}

interface IResponse {
    data: IData
}

interface IDecoded {
    id: number
    email: string
    username: string
}

export default class authAPI {
    static register = async( username:string, email:string, password:string) => {
        const response:IResponse = await instance.post('/register', {email, username, password})
        return response.data.token
    }
    static login = async(email: string, password:string) => {
        const response:IResponse = await instance.post('/login',{email, password})
        return response.data.token
    }
    static auth = async(decoded:IDecoded) => {
        const response:IResponse = await instance.post('/auth',  {decoded})
        return response.data.token
    }
    static updateUser = async(id:number, username?:string | null, email?:string | null, password?:string | null) => {
        const data = {username, email, password, id}
        const response:IResponse = await instance.put('/', {data})
        return response.data.token
    }
} 