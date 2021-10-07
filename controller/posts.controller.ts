import path from 'path'
import type { Request, Response, NextFunction } from 'express'
import { Post } from '../models/models';
import {v4} from "uuid"
import ApiError from './../apiError/apiError'

interface MulterRequest extends Request {
    files: any;
    body: Body
}

interface Body {
    description: string
    userId: number,
    username: string
}

class PostController {

    // api/post/ | POST
    async createPost(req: MulterRequest, res: Response, next: NextFunction) {
        try {
            const { description, userId, username } = req.body
            console.log(description, userId)
            const { img } = req.files
            let fileName = v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const post = await Post.create({ description, img: fileName, userId, author:username })
            return res.json(post)
        } catch (e: any) {
            next(ApiError.badRequest(e.message))
        }
    }

    // api/post | DELETE
    async deletePost(req: Request, res: Response) {
        const {id} = req.params
        const post = await Post.destroy({where: {id}})
        res.json(post)
    }

    // api/post/pages?limit=${limit}&page=${page} | GET
    async getPostsPages(req: Request, res: Response, next:NextFunction) {
        try {
            let {limit, page} = req.query as any
        if (limit && page) {
            let offset = page * limit - limit
            const posts = await Post.findAndCountAll({limit, offset})
            return res.json(posts)
        }
        const posts = await Post.findAll()
        res.json(posts)
        } catch (e: any) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    // api/post/${id} | GET
    async getOnePost(req: Request, res: Response) {
        const {id} = req.params
        const post = await Post.findOne({
            where: {id}
        })
        return res.json(post)
    }

    // api/post/getuserposts | POST
    async getUserPosts(req: Request, res: Response) {
        const {userId} = req.body
        const posts = await Post.findAll({
            where: {userId}
        })
        return res.json(posts)
    }
}

export default new PostController()