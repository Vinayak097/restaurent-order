import express from 'express'
import dotenv from 'dotenv'
import connectDB from './mongodb/mongodb'
import menuRouter from './routes/menuRoutes'
import orderRouter from './routes/orderRouter'
import userRouter from './routes//userRoutes'
import cors from 'cors'
dotenv.config();

const  app=express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // if you're using cookies/auth headers
  }));
app.use(express.json())
app.use('/menu',menuRouter)
app.use('/order' , orderRouter)
app.use('/user',userRouter)
app.listen(3000, async()=>{
    await connectDB();       
    console.log('server is ruuning');
})


