import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";


const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`Mongo DB connection !! Db host :${connection.connection.host}`);
    } catch (error) {
        console.log("MONGO connection error",error);
        process.exit(1)
    }
}


export default connectDB