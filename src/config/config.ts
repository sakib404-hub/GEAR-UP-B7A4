import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path : path.join(process.cwd(), ".env")
});

export const config = {
    port_number  : process.env.PORT_NUMBER || 5001,
    backEndOrigin  : process.env.BACKEND_ORIGIN,
    database_url :  process.env.DATABASE_URL,
    bcrypt_salt_round : process.env.BCRYPT_SALT_ROUND!,
    jwt_access_secret : process.env.JWT_ACCESS_SECRET!,
    jwt_access_expires_in : process.env.JWT_ACCESS_EXPIRES_IN!,
    jwt_refresh_secret : process.env.JWT_REFRESH_SECRET!,
    jwt_refresh_expires_in : process.env.JWT_REFRESH_EXPIRES_IN!,
    stripe_secret_api_ley : process.env.STRIPE_SECRET_API_KEY!
}