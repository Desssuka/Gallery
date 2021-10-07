require('dotenv').config()
import express from 'express'
import userRouter from './routes/user.routes'
import postRouter from './routes/posts.routes'
import sequelize from './db'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware'
import path from 'path'
import {Post, User} from './models/models'

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use(ErrorHandlingMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()