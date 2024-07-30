"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const workflo_common_1 = require("@kethireddynithinreddy/workflo-common");
const express_1 = __importDefault(require("express"));
const get_user_1 = require("../helpers/get-user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const userRouter = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET;
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const validatedFields = workflo_common_1.RegisterSchema.safeParse(body);
    if (!validatedFields.success) {
        return res.status(400).json({
            error: "Invalid credentials"
        });
    }
    ;
    const { email, username, password } = validatedFields.data;
    const userExists = yield (0, get_user_1.getUserByEmail)(email);
    if (userExists) {
        return res.status(409).json({
            error: "Email already in use"
        });
    }
    ;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        const user = yield db_1.db.user.create({
            data: {
                email,
                name: username,
                password: hashedPassword,
            }
        });
        const token = yield jsonwebtoken_1.default.sign(user.id, JWT_SECRET);
        res.cookie("token", token, { sameSite: "none", httpOnly: false, secure: true, maxAge: 24 * 60 * 60 * 100 });
        return res.status(200).json({
            success: "Succesfully signed up"
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Something went wrong"
        });
    }
}));
userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const validatedFields = workflo_common_1.LoginSchema.safeParse(body);
    if (!validatedFields.success) {
        return res.status(400).json({
            error: "Invalid credentials"
        });
    }
    ;
    const { email, password } = validatedFields.data;
    const userExists = yield (0, get_user_1.getUserByEmail)(email);
    if (!userExists) {
        return res.status(404).json({
            error: "Email is not registered"
        });
    }
    ;
    const passwordMatches = yield bcryptjs_1.default.compare(password, userExists.password);
    if (!passwordMatches) {
        return res.status(400).json({
            error: "Password does not match"
        });
    }
    ;
    const token = yield jsonwebtoken_1.default.sign(userExists.id, JWT_SECRET);
    res.cookie("token", token, { sameSite: "none", httpOnly: false, secure: true, maxAge: 24 * 60 * 60 * 100 });
    return res.status(200).json({
        success: "Login successfull"
    });
}));
userRouter.get("/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    const token = JSON.parse(cookies.token);
    console.log(token.value);
    if (!token) {
        return res.status(409).json({
            error: "Token not found"
        });
    }
    const tokenVerified = yield jsonwebtoken_1.default.verify(token.value, JWT_SECRET);
    if (!tokenVerified) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    ;
    return res.status(200).json({
        success: "Loggedin"
    });
}));
exports.default = userRouter;
