import { UserRole, UserStatus } from "../../../generated/prisma/enums";

export interface IRegisterPayLoad {
    name : string;
    email : string;
    password : string;
    role ? : UserRole;
    status ? : UserStatus;
    phone ? : string;
    address ? : string;
}

export interface ILoginPayLoad{
    email : string;
    password : string;
}