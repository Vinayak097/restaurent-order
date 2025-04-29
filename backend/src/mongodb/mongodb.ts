import mongoose from 'mongoose'

export default async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_DB!);
    }catch(e)    {
        console.log('failed to connect mongodb ' ,e)        ;
    }   
}

