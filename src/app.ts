import cookieParser from "cookie-parser";
import type { Application, Request, Response } from "express";
import express  from "express";
import status from "http-status";
import cors from "cors"
import { config } from "./config/config";
import { notFound } from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHanldler";
import { authRouter } from "./modules/Authentication/auth.route";
import { gearRouter } from "./modules/Gears/gear.route";
import { providerRouter } from "./modules/provider/provider.route";
import { categoryRouter } from "./modules/category/category.route";

const app : Application = express();

//? this is for middleware
app.use(cors({
    origin : config.backEndOrigin,
    credentials : true
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());




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


//? authentication route
app.use('/api/auth', authRouter);

//? gear route
app.use('/api/gear', gearRouter);

//? provider route
app.use('/api/provider', providerRouter);

//? category route
app.use('/api/categories', categoryRouter);




//? if any of the above route is not found
app.use(notFound);

//? global error handler
app.use(globalErrorHandler);

export default app;