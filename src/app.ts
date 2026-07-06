import type { Application, Request, Response } from "express";
import express  from "express";
import status from "http-status";

const app : Application = express();


//? this is for middleware


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