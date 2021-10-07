import { makeAutoObservable } from "mobx";
import usersAPI from "../api/usersApi";
import auth from "./auth";

interface IUser {
    id: number
    username: string
}
type ResponseUsers = IUser[]

class Users{
    users = [] as IUser[]
    filteredUsers = [] as IUser[]
    currentUser = [] as IUser[]
    constructor() {
        makeAutoObservable(this)
    }
    getUsers = async() => {
        const users:ResponseUsers = await usersAPI.getUsers()
        this.users = []
        users.filter(v => v.id !== auth.id).forEach(v => this.users.push({id: v.id, username: v.username}))
    }
    searchUsers = (text:string) => {
        this.filteredUsers = this.users.filter(v => v.username.toLowerCase().includes(text.toLowerCase()))
    }
    getOneUser = async(id:number) => {
        const user:IUser = await usersAPI.getOneUser(id)
        this.currentUser.push(user)
    }
}

export default new Users()