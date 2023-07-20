import express from 'express'
import * as controller from '../controllers/BlogControllers.js'

const blogRouter = express.Router()

blogRouter.post('/create-blog/:slug', controller.create_blog)

blogRouter.patch('/update-blog/:slug', controller.update_blog)

blogRouter.delete('/delete-blog/:slug/:cSlug', controller.delete_blog)

blogRouter.get('/get-blog/:slug', controller.get_blog)

blogRouter.get('/get-blogs', controller.get_blogs)

blogRouter.get('/get-blogs-by-category/:slug', controller.get_blogs_by_category)

blogRouter.get('/get-categories-with-blogs', controller.get_categories_with_blogs)

export default blogRouter