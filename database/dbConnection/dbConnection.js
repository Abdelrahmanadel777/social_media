import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/SocialMedia').then(() =>
        console.log("database is connected successfully")
        ).catch(()=>console.log('database is not connected successfully')
        )
    
}