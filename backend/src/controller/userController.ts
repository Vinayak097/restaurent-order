import { PrismaClient } from "@prisma/client";
import { crateSchema } from "../validators/validator";
import { Request,Response } from "express";
const client=new PrismaClient();
export const saveUser=async (req:Request,res:Response)=>{
    const body=req.body;
    const payload=crateSchema.safeParse(body)
    if (!payload.success) {
         res.status(400).json({ error: payload.error.errors });
         return;
      }
    try{
        const user=await client.User({
            name:payload.data?.name,
            phoneNumber:payload.data?.phone_number
        })
        res.json({ message: "User created", user });
        return;

    }catch(e){
        console.log( "failed to craete user ",e)
        res.status(500).json({ error: "Internal Server Error" });
    }
} 