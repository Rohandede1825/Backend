import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


  //step to register user
    //1 get user details form frontend
    //2 validation  -not empty 
    //3 check if user already exist :note: we are using email as unique or username
    //4 check for images and check for avatar 
    //5 upload them to cloudinary -avatar check
    //6 create user in object- creat entry in DB
    //7 remove passwprd and refresh token field from response
    //8 return response

const registerUser= asyncHandler(async (req, res)=>{
    //1 get user details form frontend -- done 
    const {fullName, email, username, password}= req.body
    console.log("email",email);
    console.log("username",username);
    console.log("fullName",fullName);
    console.log("password",password);
    

    if(fullName==""){
        throw new ApiError(400,"Fullname is required")
    }

    //2.validation -- done 
    if([fullName,email,username, password].some(()=>field?.trim())){
        throw new ApiError(400,"All fields are required")
    }

    //3.check if user already exist -- done
   const existedUser = await User.findOne({
        $or:[{ email },{ username } ]
    })
    
    if(existedUser){
        throw new ApiError(409,"User already exist")
    }

    //4  check for images and check for avatar 
   const avatarLocalPath = req.files?.avatar[0]?.path;
//    const coverImageLocalPath = req.files?.coverImage[0]?.path;
   


    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }


   if(!avatarLocalPath){
       throw new ApiError(400,"Avatar is required")
   } 
//    if(!coverImageLocalPath){
//     throw new ApiError(400,"Cover Image is required")
//    }

    //5 upload them to cloudinary 
    const avatar= await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)


    //6 create user in object- creat entry in DB
    //recheck avatar is upload or not 
    if(!avatar){
        throw new ApiError(400,"Avatar file  required")
    }
    

    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    // console.log(user)

    // check userr is created succesffully
    const createUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createUser){
        throw new ApiError(500,"Error User not created")
    }

    return res.status(201).json(
        new ApiResponse(201,createUser,"User created successfully")
    )

    res.status(200).json({
        message:"The method is fetch successfully"
    })



})


export {registerUser}