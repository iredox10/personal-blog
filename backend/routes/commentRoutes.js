import express from 'express'
import * as controller from '../controllers/commentControllers.js'

const commentRoute = express.Router()

commentRoute.post('/post-comment/:slug', controller.post_comment)

commentRoute.get('/get-comments/:slug', controller.get_comments)

export default commentRoute