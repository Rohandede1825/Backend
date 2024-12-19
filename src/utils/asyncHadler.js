//using promises
const asyncHandler= (requestHandler)=>{
    (req,res,next)=>{
       return Promise.resolve(requestHandler(req,res,next)).
       catch((Error)=>next(error)) 
    }
}


export{asyncHandler}


    // try catch method 
// const asyncHandler= (fn)=>(req, res,next)=>{
//     try {
//         await fn(req,res,next){}
        
//     } catch (error) {
//         res.status(error || 500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }

// const asyncHandler= (fn)=>()=>{}
// const asyncHandler= (func)=>()=>{}
// const asyncHandler= (fn)=>async()=>{}


