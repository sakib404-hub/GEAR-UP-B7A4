import cookieParser from "cookie-parser";
import type { Application, Request, Response } from "express";
import express  from "express";
import status from "http-status";
import cors from "cors"
import { config } from "./config/config";

const app : Application = express();

//? this is for middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({
    origin : config.backEndOrigin,
    credentials : true
}))




//? this is the root route
app.get('/', (req : Request, res : Response)=>{
    return res.status(status.OK).json({
        success : true,
        statusCode : status.OK,
        message : "This is the Root Route!",
        author: {
            name: "Md. Shakib Hossen",
            role: "Backend Developer",
            github: "https://github.com/sakib404-hub",
            email: "akibhossainsakib7011gamil.com",
        },
        server : {
            name : "My API",
            version : "1.0.0",
            uptime : `${Math.floor(process.uptime())} seconds`
        }
    });
})

export default app;