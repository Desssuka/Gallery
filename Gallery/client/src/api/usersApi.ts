import axios from "axios"

const instance = axios.create({
    baseURL:'http://localhost:8080/api/user'
})

export default class usersAPI {
    static getUsers = async() => {
        const response = await instance.get('/')
        return response.data
    }
    static getOneUser = async(id:number) => {
        const response = await instance.get(`/${id}`)
        return response.data
    }
}