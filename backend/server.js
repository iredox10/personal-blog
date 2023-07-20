import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import connectMongoose from './config/connectMongoose.js'
import router from './routes/routes.js'
import blogRouter from './routes/blogRoutes.js'
import userRouter from './routes/userRoutes.js'
dotenv.config()

const app = express()

connectMongoose()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(router)
app.use('/blog', blogRouter)
app.use('/user', userRouter)

app.listen(8080, () => console.log('connected to the server'))
