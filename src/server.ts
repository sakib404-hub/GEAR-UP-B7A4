import app from "./app";
import { config } from "./config/config";

const main = async()=>{
    try{

        const server = app.listen(config.port_number, ()=>{
            console.log(`This application is running on port number : ${config.port_number}`);
        })

        server.on("error", (err)=>{
            console.log("Server Failed With : ", err);
            process.exit(1);
        })

    }catch(error){
        console.log(error);
        console.log("Unknown Error Occured during starting the server!");
        process.exit(1);
    }
}

main();