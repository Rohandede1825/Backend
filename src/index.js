// // require ('dotenv').config({path:'./env'})
import { app } from "./app.js";
import dotenv from "dotenv";
// import multer from "./middleware/multer.middleware.js";
import connectDB from "./db/db.js";
// import userData from "./routes/userData.routes.js";




    dotenv.config({
    path: "./.env",
    });
            
    connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!", err);
  });


/*
//ifes
(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGO_URI}/
        ${DB_NAME}`)
        app.on("Error",(error)=>{
            console.log("error",error);   
            throw error
        })


        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on por ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("ERROR",error)
    }
})()
*/
