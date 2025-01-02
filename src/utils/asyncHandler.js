//using promises
const asyncHandler= (requestHandler)=>{
    return (req,res,next)=>{
       return Promise.resolve(requestHandler(req,res,next)).
       catch((Error)=>next()) 
    }
}

export { asyncHandler}




    // try catch method
// const asyncHandler= (fn)=>(req, res,next)=>{
//     try {
//         await fn(req,res,next){}

//     } catch (error){
//         res.status(error || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// export { asyncHandler }

// const asyncHandler = (fn)=>()=>{}
// const asyncHandler = (func)=>()=>{}
// const asyncHandler = (fn)=>async()=>{}


