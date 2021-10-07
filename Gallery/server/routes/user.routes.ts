const Router = require('express')
const router = new Router()
import userController from '../controller/user.controller'
import authMiddleware from '../middleware/authMiddleware'


// /api/user/
router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/auth', userController.auth)
router.get('', userController.getUsers)
router.get('/:id', userController.getOneUser)
router.put('', userController.updateUser)


export default router