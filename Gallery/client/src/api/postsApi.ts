import axios from "axios";

interface IPosts {
    id: number
    userId:number
    img: string
    description: string
    author: string
}
interface IResponsePost{
    data:IPosts
}
interface IResponsePosts {
    data: IPosts[]
}
interface IData {
    count: number
    rows: IPosts[]
}
interface IResponseMainPosts {
    data: IData 
}

const instance = axios.create({
    baseURL:'http://localhost:8080/api/post'
})

export default class postsAPI {
    static createPost = async(userId:number, description:string='', img: File, username: string) => {
        const formData = new FormData();
        formData.append('userId',`${userId}`);
        formData.append('description',description);
        formData.append('img',img);
        formData.append('username',username)
        const response:IResponsePost = await instance.post('/',formData);
        return response.data
    }
    static getUserPosts = async(userId:number) => {
        const response:IResponsePosts = await instance.post('/getuserposts', {userId})
        return response.data
    }
    static deletePost = async(id:number) => {
        const response = await instance.delete(`/${id}`)
        return response
    }
    static getAllPosts = async(limit:number, page:number) => {
        const response:IResponseMainPosts = await instance.get(`/pages?limit=${limit}&page=${page}`)
        return response.data.rows
    }
    static getSearchPosts = async() => {
        const response = await instance.get('/pages')
        return response.data
    }
    static updateDescription = async(description:string, id:number) => {
        await instance.put(`/${id}`, {description})
    }
}