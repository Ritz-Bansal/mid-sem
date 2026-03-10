import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import ENV from "../utils/config";
import { loginSchema, registerSchema } from "../utils/type";

export const register = async (req: Request, res: Response) => {
    console.log("inside");
    const { success, data, error } = registerSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: error.message });
    }
    const { email, password, name } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
    });

    return res.status(201).json({
        message: "Signup successful",
        user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },
    });
};

export const login = async (req: Request, res: Response) => {
    //write code in here
    try{
        const parsed = loginSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message: "Wrong inputs bro"
            });
        }

        const { email, password } = parsed.data;

        const isExisting = await prisma.user.findFirst({
            where: {email: email}
        });

        if(!isExisting){
            return res.status(404).json({
                message: "Please signup first"
            });
        }

        const isValid = bcrypt.compare(password, isExisting.password);
        if(!isValid){
            return res.status(400).json({
                message: "Wrong password"
            });
        }

        const userId = isExisting.id.toString();
        const token = jwt.sign(userId, ENV.JWT_SECRET);

        return res.status(200).json({
            token: token,
            message: "Login successful"
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
};