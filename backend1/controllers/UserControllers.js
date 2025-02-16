
import userModel from "../models/UserModels.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import 'dotenv/config'
// import dotenv from "dotenv"
// dotenv.config({
//     path:'./.env'
// })
//import axios from "axios"

//loginuser
const createToken=(id)=>{
    //console.log(process.env.JWT_SECRET); 
    return jwt.sign({id},process.env.JWT_SECRET)
}
const loginUser=async(req,res)=>{
   const {email,password}=req.body;
   try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not exist"})
        }
        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.json({success:false,message:"invalid credentials"})
        }
        const token=createToken(user._id);
        res.json({success:true,token})
   }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
   }
}

//registeruser
const registerUser=async(req,res)=>{
   const {name,email,password}=req.body;
   try{
    const exist=await userModel.findOne({email});
    if(exist){
        return res.json({success:false,message:"user already exist"})
    }
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"please enter valid email"})
    }
    if(password.length<8){
        return res.json({success:false,message:"please enter valid password"})
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    
    
   
    
    // try {
    //     const response = await axios.post(url, data);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error("Error response:", error.response);
    //   }
    console.log(7);
    const newUser=new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })
    
    const user=await newUser.save()
   
    const token=createToken(user._id)
    
    res.json({success:true,token});
   }catch(error){
    res.json({success:false,message:"error"})

   }
}
export {loginUser,registerUser}

// PORT=4000
// MONGODB_URI=mongodb+srv://tanvimandhan34:0hEYADRSBN6HDVJo@cluster3.fhc03.mongodb.net/