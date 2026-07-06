import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path : path.join(process.cwd(), ".env")
});

export const config = {
    port_number  : process.env.PORT_NUMBER || 5001,
    backEndOrigin  : process.env.BACKEND_ORIGIN,
    database_url :  process.env.DATABASE_URL
}