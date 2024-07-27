import { Router } from "express";
import  express  from "express";
import userRouter from "./users"

const mainRouter: Router = express.Router();

mainRouter.use("/user", userRouter)



export default mainRouter;