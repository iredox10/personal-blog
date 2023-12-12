import express from 'express'
import * as controller from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/sign-up', controller.signup)

userRouter.post('/login', controller.login)

userRouter.get('/get-users', controller.get_users)


export default userRouter