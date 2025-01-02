import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app= express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit:"20kb"}))//when url data cames
app.use(express.urlencoded({encodeURI:true, limit:"18kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//     res.send('Hey this is app page'
//Routes import 
import userRouter from './routes/user.routes.js'

//routes declaration 
app.use("/api/v1/user",userRouter)


export{ app }