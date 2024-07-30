import { LoginSchema, RegisterSchema } from "@kethireddynithinreddy/workflo-common";
import { Router } from "express";
import  express  from "express";
import { getUserByEmail } from "../helpers/get-user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db";

const userRouter: Router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


userRouter.post("/signup", async (req, res) => {
    const body = req.body;

    const validatedFields = RegisterSchema.safeParse(body);
    if(!validatedFields.success) {
        return res.status(400).json({
            error: "Invalid credentials"
        })
    };

    const { email, username, password } = validatedFields.data;

    const userExists = await getUserByEmail(email);
    if(userExists) {
        return res.status(409).json({
            error: "Email already in use"
        })
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await db.user.create({
            data: {
                email,
                name: username,
                password: hashedPassword,
            }
        });

        const token = await jwt.sign(user.id, JWT_SECRET as string);

        res.cookie("token", token, {sameSite: "none", httpOnly: false, secure: true, maxAge: 24*60*60*100})

        return res.status(200).json({
            success: "Succesfully signed up"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Something went wrong"
        });
    }
});


userRouter.post("/login" , async (req, res) => {
    const body = req.body;

    const validatedFields = LoginSchema.safeParse(body);
    if(!validatedFields.success) {
        return res.status(400).json({
            error: "Invalid credentials"
        })
    };

    const { email, password } = validatedFields.data;

    const userExists = await getUserByEmail(email);
    if(!userExists) {
        return res.status(404).json({
            error: "Email is not registered"
        })
    };

    const passwordMatches = await bcrypt.compare(password, userExists.password);
    if(!passwordMatches) {
        return res.status(400).json({
            error: "Password does not match"
        })
    };


    const token = await jwt.sign(userExists.id, JWT_SECRET as string);
    
    res.cookie("token", token, {sameSite: "none", httpOnly: false, secure: true, maxAge: 24*60*60*100})

    return res.status(200).json({
        success: "Login successfull"
    });

})


userRouter.get("/verify", async (req, res) => {
    const cookies = req.cookies;
    const token = JSON.parse(cookies.token)
    console.log(token.value)

    if(!token) {
        return res.status(409).json({
            error: "Token not found"
        });
    }
    
    const tokenVerified = await jwt.verify(token.value as string, JWT_SECRET as string);

    if(!tokenVerified) {
        return res.status(401).json({
            error: "Unauthorized"
        })
    };

    return res.status(200).json({
        success: "Loggedin"
    });
})

export default userRouter;