import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path : path.join(process.cwd(), ".env")
});

export const config = {
    port_number  : process.env.PORT_NUMBER || 5001
}