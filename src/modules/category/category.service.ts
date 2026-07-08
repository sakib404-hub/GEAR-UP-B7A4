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

const getAllCategory = () =>{

}

export const categoryServices = {
    createCategory,
    getAllCategory
}