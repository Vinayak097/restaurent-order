import express from 'express'
import dotenv from 'dotenv'
import connectDB from './mongodb/mongodb'


dotenv.config()
const  app=express()
app.use(express.json())
app.listen(3000, async()=>{
    await connectDB()   
    
    console.log('server is ruuning');
})


