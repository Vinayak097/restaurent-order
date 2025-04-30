import { crateSchema } from "../validators/validator";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import prisma from "../db";

export const saveUser=async (req:Request,res:Response)=>{
    const body=req.body;
    const payload=crateSchema.safeParse(body)
    if (!payload.success) {
         res.status(400).json({ error: payload.error.errors });
         return;
      }
    try{
        const user=await prisma.user.create({
            data: {
                name: payload.data?.name,
                phoneNumber: payload.data?.phone_number
            }
        })
        const token = jwt.sign(
            { userId: user.id, name: user.name },
            process.env.JWT_SECRET!,
            { expiresIn: '72h' }
        );
        res.json({ message: "User created",token });
        return;

    }catch(e){
        console.log( "failed to craete user ",e)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

