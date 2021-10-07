import { makeAutoObservable } from "mobx";
import postsAPI from "../api/postsApi";
import auth from "./auth";

interface IPost {
    id: number,
    img: string,
    userId: number,
    description: string,
    author: string
}
type ResponsePosts = IPost[]

class Posts{
    posts = [] as IPost[]
    mainPosts = [] as IPost[]
    searchPosts = [] as IPost[]
    filteredPosts = [] as IPost[]

    constructor(){
        makeAutoObservable(this)
    }
    createPost = async(description:string, img: File) => {
        const response = await postsAPI.createPost(auth.id, description, img, auth.username)
        this.posts.push(response)
    }
    getUserPosts = async(userId:number) => {
        this.posts=[]
        const response = await postsAPI.getUserPosts(userId)
        response.forEach(v => this.posts.push({id:v.id, description:v.description,userId:v.userId,img:v.img, author:v.author})) 
    }
    deletePost = async(id:number) => {
        this.posts = this.posts.filter((v,i) => v.id !== id)
        postsAPI.deletePost(id)
    }
    getAllPosts = async(limit:number = 10, page:number=1) => {
        const response = await postsAPI.getAllPosts(limit, page)
        response.forEach((v) => this.mainPosts.push(v))
    }
    getSearchPosts = async() => {
        const response:ResponsePosts = await postsAPI.getSearchPosts()
        response.forEach(v => this.searchPosts.push({id:v.id, description:v.description,userId:v.userId,img:v.img, author:v.author}))
    }
    filterPosts = (description: string) => {
        this.filteredPosts = this.searchPosts.filter(v => v.description.toLowerCase().includes(description.toLowerCase()))
    }
    updateDescription = async(description: string, id:number) => {
        await postsAPI.updateDescription(description, id)
    }
}

export default new Posts()
