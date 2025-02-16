import jwt from "jsonwebtoken"

const authMiddleware=async(req,res,next)=>{
  console.log(10);
   const {token}=req.headers;
   console.log(7);
   if(!token){
    return res.json({success:false,message:"not authorised login again"})
   }
   try{
    console.log(2);
     const token_decode=jwt.verify(token,process.env.JWT_SECRET);
     console.log(3);
     req.body.userId=token_decode.id;
     console.log(4);
     next();
   }catch(error){
     console.log(error);
     res.json({success:false,message:"error"});
   }
}
export default authMiddleware;