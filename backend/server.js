import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'

import connectMongoose from './config/connectMongoose.js'
import router from './routes/routes.js'
import blogRouter from './routes/blogRoutes.js'
import userRouter from './routes/userRoutes.js'
dotenv.config()

const app = express()

connectMongoose()

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  }));
  

app.use(router)
app.use('/blog', blogRouter)
app.use('/user', userRouter)

app.listen(8080, () => console.log('connected to the server'))
