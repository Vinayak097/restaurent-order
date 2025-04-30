import  {Request,Response, NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
dotenv.config();
export const middleware=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers['authorization'];
    if(!token){
        res.status(403).json({message:"user not authanticated"})
        return;
    }
    try{
        
        const decode=jwt.verify(token,process.env.JWT_SECRET!) as JwtPayload
        
        (req as any).user = decode;
        next()

    }catch(e){
        console.log('middlewware ' ,e)
        res.status(400).json({message:'error decodeing token'})
        return

    }
}