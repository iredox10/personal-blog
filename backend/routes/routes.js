import express from 'express'
import * as controller from '../controllers/controllers.js'

const router = express.Router()

router.post('/create-category', controller.create_category)

router.patch('/update-category/:slug', controller.update_category)

router.delete('/delete-category/:slug', controller.delete_category)

router.get('/get-category/:slug', controller.get_category)

router.get('/get-categories', controller.get_categories)

export default router