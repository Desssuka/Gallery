const Router = require('express')
const router = new Router()
import postsController from '../controller/posts.controller'


// /api/post
router.post('', postsController.createPost)
router.get('/pages', postsController.getPostsPages)
router.get('/:id?', postsController.getOnePost)
router.post('/getuserposts', postsController.getUserPosts)
router.delete('/:id?', postsController.deletePost)

export default router