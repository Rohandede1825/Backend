import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app= express()


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))


app.use(express.json({limit:"16kb"}))//when url data cames
app.use(express.urlencoded({encodeURI:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//     res.send('Hey this is app page'
//Routes import 
// import userRouter from './routes/user.routes.js'
import userRouter from './routes/user.routes.js'

//routes declaration 
app.use("/api/v1/users",userRouter)

app.get("/",(req,res)=>{
    res.send("Hey this is app page")
})


export{ app }