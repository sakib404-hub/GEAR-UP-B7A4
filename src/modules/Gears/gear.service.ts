import { prisma } from "../../lib/prisma"

const getAllGear = async()=>{
    const result = await prisma.gearItems.findMany();
    return result;
}

const getGearDetails = async(gearId : string)=>{

    const gear = prisma.gearItems.findUnique({
        where : {
            id : gearId
        },
        include : {
            reviews : true
        }
    })

    return gear;

}

const getGearCategories = ()=>{

}


export const gearServices = {
    getAllGear,
    getGearDetails,
    getGearCategories
}