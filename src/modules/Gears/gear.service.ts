import { prisma } from "../../lib/prisma"

const getAllGear = async()=>{
    const result = await prisma.gearItems.findMany();
    return result;
}

const getGearDetails = async(gearId : string)=>{

    const gear = await prisma.gearItems.findUnique({
        where : {
            id : gearId
        },
        include : {
            reviews : true
        }
    })

    if(!gear){
        throw new Error("The requested gear was not found.");
    }

    return gear;
}

const getGearCategories = ()=>{

}


export const gearServices = {
    getAllGear,
    getGearDetails,
    getGearCategories
}