import { makeAutoObservable } from 'mobx'
import authAPI from '../api/authApi'
import decode from 'jwt-decode'

interface IAuth {
    isAuth: boolean
    id?: number
    username: string
    password: string
    email: string
}
interface IDecoded {
    id: number,
    email: string,
    username: string
}

class Auth implements IAuth {
    isAuth = false
    username = ''
    password = ''
    email = ''
    id = 0

    constructor() {
        makeAutoObservable(this)
    }

    login = async(email: string, password: string) => {
        try {
            const response = await authAPI.login(email, password)
            const decoded: IDecoded = decode(response)
            localStorage.setItem('token', response)
            this.id = decoded.id
            this.email = decoded.email
            this.isAuth = true

        } catch (error) {
            console.error(error)
        }
        
    }
    logout = (): void => {
        localStorage.removeItem('token')
        this.isAuth = false
    }
    auth = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded: IDecoded = decode(token)
            console.log(decoded)
            const response = await authAPI.auth(decoded)
            localStorage.setItem('token', response)
            this.isAuth = true
            this.username = decoded.username
            this.email = decoded.email
            this.id = decoded.id
        }
    }

    register = async (username: string, email: string, password: string) => {
        try {
            const response = await authAPI.register(username, email, password)
            const decoded: IDecoded = decode(response)
            this.id = decoded.id
            this.email = decoded.email
            this.isAuth = true
            localStorage.setItem('token', response)
        } catch (error) {
            console.error(error)
        }
    }
    updateUser = async (username?:string | null, email?:string | null, password?:string | null) => {
        const response = await authAPI.updateUser(this.id, username, email, password)
        const decoded: IDecoded = decode(response)
        this.id = decoded.id
        this.username = decoded.username
        this.email = decoded.email
        this.isAuth = true
        localStorage.setItem('token', response)
    }
}

export default new Auth()