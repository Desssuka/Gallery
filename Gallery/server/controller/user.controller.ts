import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import ApiError from '../apiError/apiError';
import { User } from '../models/models';
import { Model } from 'sequelize/types';

interface IUser extends Model<any, any> {
    username: string;
    password: string;
    email: string;
    id: number
}

interface IAuthRequest extends Request {
    data: IData
}

interface IData extends JwtPayload {
    id: number
    email: string
    username: string
}

const generateJwt = (id: number, email: string, username: string) => jwt.sign({ id, email, username }, "SO_SECRET_KEY", { expiresIn: '24h' })

class UserController {

    // /api/user/register | POST
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password, email } = req.body as IUser
            if (!email || !password || !username) {
                return next(ApiError.badRequest('Email, username or password is incorrect'))
            }
            const candidate = await User.findOne({ where: { email } }) || await User.findOne({ where: { username } })
            if (candidate) {
                return next(ApiError.badRequest('This email or username is already used'))
            }
            const hashedPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ email, username, password: hashedPassword })
            const token = generateJwt(user.id, user.email, user.username)
            res.json({ token })
        } catch (error: any) {
            return next(ApiError.badRequest(error.message))
        }
    }

    // /api/user/login | POST
    async login(req: Request, res: Response, next: any) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest("Bad credentials"))
        }
        let comparePass = bcrypt.compareSync(password, user.password)
        if (!comparePass) {
            return next(ApiError.badRequest("Bad credentials"))
        }
        const token = generateJwt(user.id, user.email, user.username)
        return res.json({ token })
    }

    // /api/user/auth | GET
    async auth(req: IAuthRequest, res: Response) {
        const {id, email, username} = req.body.decoded
        const token = generateJwt(id, email, username)
        return res.json({ token })
    }

    // /api/user/ | GET
    async getUsers(req: Request, res: Response) {
        const users = await User.findAll()
        res.json(users)
    }

    // /api/user/${id} | GET
    async getOneUser(req: Request, res: Response) {
        const { id } = req.params
        const user = await User.findOne({ where: { id } })
        res.json(user)
    }

    // /api/user/ | PUT
    async updateUser(req: Request, res: Response) {
        const { id, username, email, password } = req.body.data as IUser
        console.log(id, username, email, password)
        if (username) {
            const candidate = await User.findOne({where: {username}})
            if(!candidate){
                await User.update({username: username}, { where: { id } })
            }
        }
        if (email) {
            const candidate = await User.findOne({where: {email}})
            if(!candidate){
                await User.update({email: email}, { where: { id } })
            }
        }
        if (password) {
            await User.update({password: password}, { where: { id } })
        }
        const user = await User.findOne({where: {id}})
        if (user){
            const token = generateJwt(user.id, user.email, user.username)
            return res.json({token})
        }
    }
}

export default new UserController()