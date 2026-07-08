import { prisma } from "../../lib/prisma"
import { ICategory } from "./category.interface";

const createCategory = async(payLoad : ICategory)=>{
    const result = await prisma.category.create({
        data : {
            ...payLoad,
        }
    })

    return result;
}

const getAllCategory = async() =>{
    const result = await prisma.category.findMany({})

    return result;
}

export const categoryServices = {
    createCategory,
    getAllCategory
}