import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mainRouter from "./routes/index";


const app = express()
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))



app.use("/api/v1", mainRouter);



app.listen(8080, () => {
    console.log("Listening on port 8080:")
})