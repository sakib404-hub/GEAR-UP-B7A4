import { prisma } from "../../lib/prisma"
import { ICategory } from "./category.interface"

const createCategory = async(payLoad : ICategory, userId : string)=>{
    const result = await prisma.category.create({
        data : {
            ...payLoad,
            userId
        }
    })

    return result;
}

const getAllCategory = async() =>{
    const result = await prisma.category.findMany({
        include : {
            user : {
               select : {
                name : true,
                email : true
               }
            },
        },
    })

    return result;
}

export const categoryServices = {
    createCategory,
    getAllCategory
}