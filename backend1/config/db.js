import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://tanvimandhan34:0hEYADRSBN6HDVJo@cluster3.fhc03.mongodb.net/Food_delivery').
    then(()=>console.log("DB connected"));
}